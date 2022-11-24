import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Grid, Paper, Typography, Box, Link } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import _sortBy from "lodash.sortby";

import Table from "../../components/table";
import {
  normaliseInterfaces,
  getGrafanaUrl,
  normaliseIssues,
  compareBasedOnTime
} from "./utils";
import { generateMainTable, generateIssuesTable } from "./tableUtils";

import Styled from "./styles";

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTableHeadCell: {
        fixedHeader: {
          backgroundColor: "#f3f3f3",
          fontWeight: 1000,
          color: "#000000"
        },
        root: {
          backgroundColor: "#f3f3f3"
        }
      },
      MUIDataTable: {
        root: {
          backgroundColor: "#AAF"
        },
        paper: {
          boxShadow: "none",
          border: "solid 1px"
        }
      },
      MUIDataTableBodyCell: {
        root: {
          fontSize: "0.875rem !important"
        }
      }
    }
  });

const DisplayLinks = ({ data, classes }) => {
  return _sortBy(data, "link_type").map(link => {
    const interfaces = normaliseInterfaces(link);
    const hops = link.odus ? link.odus.length : "";
    const tableData = generateMainTable(interfaces, hops, link.from, link.to);

    return (
      <Fragment>
        <div className={classes.linkHeaderWrapper}>
          <Link
            href={getGrafanaUrl(link.to, link.from)}
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <Typography
              variant="h5"
              className={`${classes.linkHeader} ${classes.subHeader}`}
            >
              {link.from}
            </Typography>
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              className={classes.linkIcon}
            />
            <Typography
              variant="h5"
              className={`${classes.linkHeader} ${classes.subHeader}`}
            >
              {link.to}
            </Typography>
          </Link>
        </div>
        <Box mb={5} />
        <div className={classes.tableWrapper}>
          <Table tableData={tableData} removeShadows />
        </div>
        <div className={classes.issuesWrapper}>
          <DisplayIssues link={link} classes={classes} />
        </div>
        <Box mb={12} />
      </Fragment>
    );
  });
};

const DisplayIssues = ({ link, classes }) => {
  const issues = normaliseIssues(link);

  return issues.map(issueType => {
    const linkIssues =
      issueType === "actual" || issueType === "simulated"
        ? link.issues
            .filter(issue => issue.issue_type === issueType)
            .sort(compareBasedOnTime)
        : [];
    const tableData =
      linkIssues && linkIssues.length ? generateIssuesTable(linkIssues) : [];

    return (
      <Fragment>
        <Box mt={4} />
        <Typography className={classes.capitalize}>{issueType}</Typography>
        <Box mb={3} />
        {linkIssues && linkIssues.length ? (
          <Fragment>
            <MuiThemeProvider theme={getMuiTheme()}>
              <MUIDataTable
                data={tableData.rows}
                columns={tableData.columns}
                options={tableData.options}
              />
            </MuiThemeProvider>
          </Fragment>
        ) : (
          ""
        )}
      </Fragment>
    );
  });
};

const SolutionsWrapper = props => {
  const { data, siteCode } = props;
  return (
    <Styled>
      {({ classes }) => (
        <Grid container spacing={2} direction="row" justify="center">
          <Grid item xs={12} sm={12} md={12} lg={10}>
            <Paper className={classes.paperWrapper}>
              <Box mb={5} />
              <Typography
                variant="h5"
                align="center"
                className={classes.header}
              >
                <strong>Solutions for {siteCode}</strong>
              </Typography>
              <Box mb={5} />
              <DisplayLinks data={data} classes={classes} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Styled>
  );
};

const mapStateToProps = (state, ownProps) => ({
  data: state.root.solutions,
  siteCode: ownProps.match.params.id
});

const mapDispatchToProps = () => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SolutionsWrapper)
);
