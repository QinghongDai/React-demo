import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../header";

const useStyles = makeStyles(_ => ({
  main: {
    "margin-top": "60px"
  }
}));

const Layout = props => {
  const classes = useStyles();
  const { children, icon, header } = props;
  return (
    <div className={classes.main}>
      <Header icon={icon} header={header}>
        {children}
      </Header>
    </div>
  );
};

export default Layout;
