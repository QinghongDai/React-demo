import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import _get from "lodash.get";

import ViewDetails from "./viewDetails";

import {
  toPercent,
  aggregateSiteIds,
  getFutureUtilisation,
  hideSlotsAndSubslots
} from "./utils";

const BoldText = withStyles({
  root: {
    fontWeight: "1000",
    color: "#186280"
  }
})(Typography);

const MissingText = withStyles({
  root: {
    fontStyle: "italic",
    color: "#ff0000",
    fontSize: "0.9rem"
  }
})(Typography);

const RowText = withStyles({
  root: {
    fontSize: "0.875rem"
  }
})(Typography);

export const generateMainTable = (interfaces, hops, from, to) => ({
  columns: [
    "Interface",
    "Speed",
    "Throughput",
    "Utilisation",
    "Interface",
    "Hops",
    "From Interface details",
    "Optical Node TID"
  ],
  rows: interfaces.map(interfaze => [
    {
      property: interfaze.from_i
    },
    {
      property: interfaze.speed || (
        <MissingText>information missing</MissingText>
      )
    },
    {
      property: interfaze.speed ? (
        (interfaze.speed * interfaze.load).toFixed(2) + "Gbps"
      ) : (
        <MissingText>information missing</MissingText>
      )
    },
    {
      property: <BoldText>{toPercent(interfaze.load)}</BoldText>
    },
    {
      property: interfaze.to_i
    },
    {
      property: interfaze.odus ? interfaze.odus.length : ""
    },
    {
      property: interfaze.odus ? (
        <ViewDetails
          data={interfaze}
          from={interfaze.from_i}
          to={interfaze.to_i}
          linkFrom={from}
          linkTo={to}
        />
      ) : (
        ""
      )
    },
    {
      property: interfaze.odus ? (
        <BoldText>{aggregateSiteIds(interfaze.odus).join(", ")}</BoldText>
      ) : (
        ""
      )
    }
  ])
});

const getFreeInterfaceList = interfaces =>
  interfaces && typeof interfaces === "object" ? interfaces.join(",") : "None";

const getFreeSlotsList = slots => {
  if (!slots || typeof slots !== "object" || slots.length === 0) {
    return "None";
  }

  return slots.map(slot => slot.slot_name).join(",");
};

export const generateIssuesTable = issues => {
  const renderCustomBody = (value, tableMeta, updateValue) => {
    return value && value.length ? (
      <RowText noWrap={true}>
        {value.split(",").map(item => (
          <span>
            {item} <br />
          </span>
        ))}
      </RowText>
    ) : (
      value
    );
  };
  const rows = issues.map(issue => {
    const proposedSolution = _get(issue, "proposed_solution", null);
    return [
      issue.time_period,
      proposedSolution
        ? (
            proposedSolution.interface_size * proposedSolution.current_load
          ).toFixed(2) + " Gbps"
        : "",
      proposedSolution ? toPercent(proposedSolution.current_load) : "",
      _get(proposedSolution, "interface_size", ""),
      _get(proposedSolution, "interfaces_required"),
      proposedSolution ? toPercent(getFutureUtilisation(proposedSolution)) : "",
      proposedSolution
        ? getFreeInterfaceList(proposedSolution.proposed_a_ports)
        : "",
      proposedSolution
        ? getFreeInterfaceList(proposedSolution.proposed_z_ports)
        : "",
      proposedSolution && !hideSlotsAndSubslots(proposedSolution)
        ? getFreeSlotsList(proposedSolution.free_a_slots)
        : null,
      proposedSolution && !hideSlotsAndSubslots(proposedSolution)
        ? getFreeSlotsList(proposedSolution.free_z_slots)
        : null,
      proposedSolution && !hideSlotsAndSubslots(proposedSolution)
        ? getFreeSlotsList(proposedSolution.free_a_subslots)
        : null,
      proposedSolution && !hideSlotsAndSubslots(proposedSolution)
        ? getFreeSlotsList(proposedSolution.free_z_subslots)
        : null
    ];
  });
  return {
    columns: [
      "Time Period",
      "Throughput",
      "Current Utilisation",
      "Size of Required Port",
      "No. of Required Port",
      "Future Utilisation",
      {
        name: "Proposed A Interface(s)",
        label: "Proposed A Interface(s)",
        options: {
          customBodyRender: renderCustomBody
        }
      },
      {
        name: "Proposed Z Interface(s)",
        label: "Proposed Z Interface(s)",
        options: {
          customBodyRender: renderCustomBody
        }
      },
      {
        name: "Free A Slots",
        label: "Free A Slots",
        options: {
          customBodyRender: renderCustomBody
        }
      },
      {
        name: "Free Z Slots",
        label: "Free Z Slots",
        options: {
          customBodyRender: renderCustomBody
        }
      },
      {
        name: "Free A Subslots",
        label: "Free A Subslots",
        options: {
          customBodyRender: renderCustomBody
        }
      },
      {
        name: "Free Z Subslots",
        label: "Free Z Subslots",
        options: {
          customBodyRender: renderCustomBody
        }
      }
    ],
    rows: [...rows],
    options: {
      filter: false,
      search: false,
      print: false,
      download: false,
      viewColumns: false,
      customToolbar: null,
      responsive: "scrollMaxHeight",
      elevation: 1,
      pagination: false,
      selectableRows: false,
      rowHover: false
    }
  };
};
