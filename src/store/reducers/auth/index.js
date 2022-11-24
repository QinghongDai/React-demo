const initialState = {};

export default function user(state = initialState, action) {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        user: {
          email: action.user.email,
          token: action.user.token
        }
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        user: {}
      };
    default:
      return state;
  }
}
