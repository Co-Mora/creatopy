import {
  FETCH_USER,
  FETCH_USERS,
  CLEAR_USERS,
  FETCH_USER_ERR,
  Action,
} from "../../types";
export default (state = [], action : Action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    case FETCH_USERS:
      return action.payload;
    case FETCH_USER_ERR:
      return action.payload;
    case CLEAR_USERS:
      return [];
    default:
      return state;
  }
};
