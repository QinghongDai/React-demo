export function startLoading(key) {
  return {
    type: "START_LOADING",
    key
  };
}
export function finishLoading(key) {
  return {
    type: "FINISH_LOADING",
    key
  };
}
export function fetchSolutions(data) {
  return {
    type: "FETCH_SOLUTIONS_DATA",
    data
  };
}
export function fetchError(error) {
  return {
    type: "FETCH_ERROR",
    error
  };
}
