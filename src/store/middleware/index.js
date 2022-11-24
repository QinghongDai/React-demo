// import fetch from 'node-fetch';
import { fetchError, fetchSolutions } from "../actions";
import { extractSolutions } from "../../utils/data";
import solutionsData from "../../mocks/mockData.json";

export const fetchSolutionsData = siteCode => async dispatch => {
  try {
    // const response = await fetch(`${process.env.REACT_APP_SOLUTION_API_URL}/solution/${siteCode}`);
    // const data = await response.json();
    // const extractedData = extractSolutions(data);

    const extractedData = extractSolutions(solutionsData);
    return dispatch(fetchSolutions(extractedData));
  } catch (err) {
    return dispatch(fetchError(err));
  }
};
