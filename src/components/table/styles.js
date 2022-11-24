import { createStyled } from "../../utils/createStyled";

export default createStyled(
  theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3)
    },
    table: {
      minWidth: 500,
      "& tr:nth-child(even)": {
        background: "#F5F5F5"
      }
    },
    simpleTable: {
      "& tr:nth-child(even)": {
        background: "#fff"
      }
    },
    noShadows: {
      border: "solid 1px",
      boxShadow: "none !important",
      borderRadius: "1px"
    },
    tableWrapper: {
      overflowX: "auto"
    },
    cell: {
      textAlign: "center",
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`
    },
    alignLeft: {
      textAlign: "left !important"
    },
    tableHeader: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
        3}px !important`,
      "& th": {
        fontSize: "1rem"
      }
    }
  }),
  { withTheme: true }
);
