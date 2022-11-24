import { createStyled } from "../../utils/createStyled";

const drawerWidth = 240;
export default createStyled(
  theme => ({
    root: {
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      "background-color": "#ffffff",
      color: theme.fonts.color,
      "box-shadow":
        "0px 1px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 2px 0px rgba(0,0,0,0.1)"
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      "max-width": `calc( 100% - ${theme.spacing(7) + 1}px)`
    },
    contentShift: {
      "max-width": `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    appBarUnshift: {
      width: `calc(100% - 73px)`
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
      "background-color": "#006280 !important",
      color: "#ffffff"
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      "background-color": "#006280 !important",
      color: "#ffffff"
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1
      },
      "background-color": "#006280 !important",
      color: "#ffffff"
    },
    drawerIcon: {
      color: "#fff",
      width: "1.2em",
      height: "1.2em"
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      height: "70px",
      ...theme.mixins.toolbar,
      margin: "20px 0"
    },
    root2: {
      width: "100%"
    },
    grow: {
      flexGrow: 0.45
    },
    menuButton2: {
      marginLeft: -12,
      marginRight: 20
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    heading: {
      flexGrow: 0.55,
      "& h3": {
        fontSize: "30px"
      },
      "& svg": {
        marginRight: theme.spacing(2.5)
      }
    },
    searchIcon: {
      width: theme.spacing(9),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit",
      width: "100%",
      "background-color": "#f3f3f3"
    },
    inputInput: {
      paddingTop: theme.spacing(),
      paddingRight: theme.spacing(),
      paddingBottom: theme.spacing(),
      paddingLeft: theme.spacing(10),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200
      }
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    logo: {
      width: "50%",
      height: "auto",
      position: "relative",
      margin: "0 auto",
      padding: "13px"
    },
    sidebarList: {
      width: "100%",
      maxWidth: 360
    },
    sidebarListCollapsed: {
      "padding-left": "10%"
    },
    sidebarParentLink: {
      padding: 0,
      position: "relative",
      top: "-5px"
    },
    sidebarLink: {
      width: "100%",
      "text-decoration": "none",
      color: theme.palette.background.paper
    },
    sidebarLinkText: {
      display: "inline-block",
      "font-size": "1.1rem",
      "padding-left": "20px"
    },
    collapsedParentLink: {
      position: "relative",
      left: "-13px"
    },
    nested: {
      "padding-left": "10%",
      height: "45px",
      "& svg": {
        "font-size": "15px",
        position: "relative",
        top: "5px"
      }
    },
    sidebarLinkIcon: {
      "font-size": "20px",
      color: theme.palette.background.paper,
      position: "relative",
      top: "5px"
    },
    arrowIcon: {
      position: "relative",
      left: "45%",
      top: "6px",
      color: theme.palette.background.paper
    },
    linkContainer: {
      height: "50px"
    },
    activeLink: {
      "background-color": "#03536C"
    }
  }),
  { withTheme: true }
);
