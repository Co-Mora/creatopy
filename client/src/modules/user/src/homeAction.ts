import { useQuery } from "@apollo/client";
import { GET_USER, GET_USERS } from "../../services/gql";
import {
  FetchUser,
  FETCH_USER,
  FETCH_USERS,
  FETCH_USER_ERR,
} from "../../types";

const useFetchUserQuery = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  return { loading, error, data };
};

export const getUser =
  ({ id }: FetchUser) =>
  async (dispatch: any) => {
    try {
      // const { loading, error, data } = useQuery(GET_USER, {
      //   variables: { id },
      // });

      // if (error)
      //   dispatch({
      //     type: FETCH_USER_ERR,
      //     payload: { error },
      //   });
      dispatch({
        type: FETCH_USER,
        payload: [{ data: "d" }],
      });
      // dispatch({
      //   type: FETCH_USER,
      //   payload: { data },
      // });
    } catch (e) {
      console.error(e);
    }
  };

export const getUsers = () => async (dispatch: any) => {
  try {
    const { loading, error, data } = useFetchUserQuery();

    if (!loading && error)
      dispatch({
        type: FETCH_USER_ERR,
        payload: { error },
      });

    dispatch({
      type: FETCH_USERS,
      payload: data?.getUsers,
    });
  } catch (e) {
    console.error(e);
  }
};
