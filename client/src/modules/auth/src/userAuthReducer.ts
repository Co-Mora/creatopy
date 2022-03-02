import {
  USER_LOGIN,
  USER_LOGIN_ERROR,
  CREATE_USER,
  CLEAR_AUTH,
  FORGOT_PASSWORD,
  Action,
} from "../../types";
export default (state = [], action: Action) => {
  switch (action.type) {
    case CREATE_USER:
      return action.payload;
    case USER_LOGIN:
      return action.payload;
    case USER_LOGIN_ERROR:
      return action.payload;
    case FORGOT_PASSWORD:
      return action.payload;
    case CLEAR_AUTH:
      return [];
    default:
      return state;
  }
};
