import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { Container, Typography, CircularProgress } from "@material-ui/core";

import { startLoading, finishLoading } from "../../store/actions";
import { fetchSolutionsData } from "../../store/middleware";
import Layout from "../../components/layout";
import Solutions from "./solutions";
import Styled from "./styles";

const Homepage = props => {
  const {
    fetchSolutions,
    startLoading,
    finishLoading,
    siteCode,
    loading,
    solutionsData,
    error
  } = props;

  useEffect(() => {
    startLoading("home");
    fetchSolutions(siteCode).then(() =>
      setTimeout(() => {
        finishLoading("home");
      }, 100)
    );
  }, [startLoading, finishLoading, fetchSolutions, siteCode]);

  return (
    <Styled>
      {({ classes }) => (
        <Layout header="Solutions" icon={faDatabase}>
          <Container
            component="main"
            maxWidth="xl"
            direction="Grid"
            justify="justify"
          >
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Typography>Error fetching solutions</Typography>
            ) : solutionsData && solutionsData.length ? (
              <Solutions />
            ) : (
              ""
            )}
          </Container>
        </Layout>
      )}
    </Styled>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchSolutions: siteCode => dispatch(fetchSolutionsData(siteCode)),
  startLoading: key => dispatch(startLoading(key)),
  finishLoading: key => dispatch(finishLoading(key))
});
const mapStateToProps = (state, ownProps) => ({
  loading: state.root.loading.home,
  meta: state.root.meta,
  error: state.root.error,
  siteCode: ownProps.match.params.id,
  solutionsData: state.root.solutions
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Homepage)
);
