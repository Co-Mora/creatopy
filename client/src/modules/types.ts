export interface Action {
  type: string;
  payload: Object;
}

export interface User {
  id: string;
  title: string;
  email: string;
  password: string;
}

export interface CreateUser {
  title: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface FetchUser {
  id: string;
}

// LOCAL STORAGE
export const STORAGE_TOKEN_KEY = "@save_token";

// User Authentication
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";
export const CREATE_USER = "CREATE_USER";
export const CREATE_USER_ERROR = "CREATE_USER_ERROR";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const CLEAR_AUTH = "CLEAR_AUTH";

export const FETCH_USER = "FETCH_USER";
export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USER_ERR = "FETCH_USER_ERR";
export const CLEAR_USERS = "CLEAR_USERS";
