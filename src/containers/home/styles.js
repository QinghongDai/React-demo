import { createStyled } from "../../utils/createStyled";

export default createStyled(
  theme => ({
    loadingContainer: {
      minHeight: "150px",
      textAlign: "center"
    },
    paperWrapper: {
      minHeight: "500px",
      boxShadow: "none",
      border: "solid 1px",
      padding: theme.spacing(0, 5)
    },
    header: {
      color: "rgb(3, 83, 108)",
      "& strong": {
        fontWeight: "1000"
      }
    },
    linkHeaderWrapper: {
      textAlign: "center",
      "& svg": {
        fontSize: "29px",
        color: "#186280",
        position: "relative",
        top: "4px"
      },
      "& :hover": {
        "& h5": {
          fontWeight: "500 !important"
        },
        "& svg": {
          color: "rgba(0, 0, 0, 0.9)"
        }
      }
    },
    linkHeader: {
      display: "inline-block",
      padding: theme.spacing(0, 3),
      width: "250px",
      fontWeight: "1000"
    },
    subHeader: {
      fontSize: "1.2rem"
    },
    tableWrapper: {
      "& thead": {
        "& th": {
          backgroundColor: "#186280",
          color: "#fff",
          fontWeight: "bold"
        }
      }
    },
    capitalize: {
      textTransform: "capitalize",
      fontWeight: 1000
    }
  }),
  { withTheme: true }
);
