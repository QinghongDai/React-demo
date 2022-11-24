const initialState = {
  error: null,
  data: [],
  meta: [],
  loading: {}
};

export default function root(state = initialState, action) {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.key]: true
        }
      };
    case "FINISH_LOADING":
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.key]: false
        }
      };
    case "FETCH_CVC_DATA":
      return {
        ...state,
        meta: action.meta,
        data: action.data
      };
    case "FETCH_SOLUTIONS_DATA":
      return {
        ...state,
        solutions: action.data
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
