import _get from "lodash.get";
import _uniq from "lodash.uniq";
import _map from "lodash.map";

export const normaliseInterfaces = link =>
  link.from_interface.map((intf, index) => ({
    to_i: link.to_interface[index],
    from_i: intf,
    load: link.from_interface_load[intf],
    speed: getSpeedForInterface(intf, link.from_interface_details),
    odus: (
      link.from_interface_details.find(
        i =>
          i.name &&
          (i.name.toLowerCase().replace("port ", "") === intf ||
            grabPort(i.name))
      ) || {}
    ).odus,
    name: intf
  }));

const getSpeedForInterface = (intf, from_interface_details) => {
  const matchingInterface = from_interface_details.find(i => i.name === intf);
  return matchingInterface && matchingInterface.status_details
    ? matchingInterface.status_details.Speed
    : undefined;
};

const grabPort = port => {
  // grabs the port and removes any other string characters
  const regex = RegExp("^[^/]+/([^/]+)/([^/]+ )");
  if (regex.test(port)) {
    return regex.exec(port)[0].trim();
  }
  return undefined;
};

export const aggregateSiteIds = odus => {
  if (odus && odus.length) {
    const uniqueOdus = [];
    // eslint-disable-next-line array-callback-return
    odus.map(odu => {
      const aNode = _get(odu, `a["Optical Node TID"]`).replace("TID:", "");
      const zNode = _get(odu, `z["Optical Node TID"]`).replace("TID:", "");
      if (aNode && zNode) {
        uniqueOdus.push(aNode);
        uniqueOdus.push(zNode);
      }
    });
    return [...new Set(uniqueOdus)];
  }

  return [];
};

export const toPercent = value => {
  if (typeof value !== "number") {
    return null;
  }
  return `${Math.ceil(value.toFixed(4) * 100)}%`;
};

export const getGrafanaUrl = (node_a, node_b) =>
  `${GRAFANA_HOST}?node_a=${node_a}&node_b=${node_b}`;

const GRAFANA_HOST = `https://grafana-ipne.optusnet.com.au/dashboard/script/link_dashboard.js`;

export const normaliseIssues = link =>
  _uniq(_map(link.issues, "issue_type")).sort();

export const compareBasedOnTime = (a, b) => {
  let A = a.time_period;
  let B = b.time_period;
  if (A.search("forecast_") !== -1 && B.search("forecast_") !== -1) {
    A = parseFloat(A.replace("forecast_", ""));
    B = parseFloat(B.replace("forecast_", ""));
  }

  if (A < B) return -1;
  if (A > B) return 1;
  return 0;
};

export const getFutureUtilisation = p =>
  (p.current_load * p.current_speed) / p.bw_required;

export const hideSlotsAndSubslots = proposed_solution =>
  proposed_solution.interfaces_required &&
  proposed_solution.interfaces_required === 1 &&
  Array.isArray(proposed_solution.proposed_a_ports) &&
  proposed_solution.proposed_a_ports.length === 1 &&
  Array.isArray(proposed_solution.proposed_z_ports) &&
  proposed_solution.proposed_z_ports.length === 1;
