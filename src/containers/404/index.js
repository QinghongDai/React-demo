import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Avatar, Button, Box, Typography, Container } from "@material-ui/core";

import Layout from "../../components/layout";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  main: {
    padding: theme.padding
  }
}));

const ErrorPage = () => {
  const classes = useStyles();

  const goBack = e => {
    if (e) e.preventDefault();
    window.history.back();
  };

  return (
    <Layout>
      <Container component="main" maxWidth="xl">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h2">
            {`404 Page not found :(`}
          </Typography>
          <Box mt={5}>
            <Button onClick={goBack}>Go Back</Button>
          </Box>
        </div>
      </Container>
    </Layout>
  );
};

export default ErrorPage;
