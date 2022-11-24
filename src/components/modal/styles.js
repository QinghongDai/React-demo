import { createStyled } from "../../utils/createStyled";

export default createStyled(
  theme => ({
    root: {
      margin: `-100px 0 0 0`,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: "5px",
      color: theme.palette.grey[500]
    },
    dialogContent: {
      padding: "20px 30px"
    },
    dialogActions: {
      margin: 0,
      padding: "10px 20px",
      "& h6": {
        fontSize: "1.5rem"
      }
    },
    icon: {
      fontSize: "50px",
      color: theme.palette.primary.main,
      marginBottom: theme.spacing(2)
    },
    button: {}
  }),
  { withTheme: true }
);
