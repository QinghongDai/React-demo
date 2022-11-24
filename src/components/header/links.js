import { faHome, faFileCsv } from "@fortawesome/free-solid-svg-icons";

import {
  faDatabase,
  faProjectDiagram,
  faSatelliteDish
} from "@fortawesome/free-solid-svg-icons";

const links = [
  {
    id: "home",
    title: "Home",
    icon: faHome,
    url: "/"
  },
  {
    id: "upload",
    title: "Upload CSV",
    icon: faFileCsv,
    url: "/upload"
  },
  {
    id: "networkSites",
    title: "Network Sites",
    icon: faDatabase,
    children: [
      {
        id: "fibre",
        title: "Fibre",
        icon: faProjectDiagram,
        link: "#",
        url: "/fibre"
      },
      {
        id: "microwave",
        title: "Microwave",
        icon: faSatelliteDish,
        link: "#",
        url: "/microwave"
      }
    ]
  }
];

export default links;
