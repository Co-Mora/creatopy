import { gql, useQuery } from "@apollo/client";

export const GET_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      title
      email
      createdAt
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      title
      email
      createdAt
    }
  }
`;

export const ADD_USER = gql`
  mutation Signup($title: String!, $email: String!, $password: String!) {
    signup(title: $title, email: $email, password: $password) {
      title
      email
      password
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      email
      password
    }
  }
`;

export const RESET_PASSWORD_USER = gql`
  mutation ResetPassword($email: String!, $password: String!) {
    resetPassword(email: $email, password: $password) {
      email
      password
    }
  }
`;
