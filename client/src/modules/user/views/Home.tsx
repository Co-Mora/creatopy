import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { GET_USERS } from "../../services/gql";
import { FETCH_USERS } from "../../types";
import { Table, Container, Button } from "react-bootstrap";
interface Props {
  user: any;
  auth: any;
}

const Home: React.FC<Props> = ({ user, auth }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [queryLoading, setQueryLoading] = useState(false);
  const { loading, error, data } = useQuery(GET_USERS);

  const logout = () => {
    dispatch({ type: "CLEAR_AUTH" });
    navigate('/signin')
  };

  useEffect(() => {
    setQueryLoading(loading);
    if (queryLoading) {
      dispatch({
        type: FETCH_USERS,
        payload: data?.getUsers,
      });
      setQueryLoading(false);
    }
    if (!auth.hasOwnProperty("email")) navigate(`/signin`);

  }, [loading, user]);

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {user.map((item: any) => (
            <tr key={item}>
              {Object.values(item).map((val: any) => (
                <td key={val}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={logout} variant="success">Logout</Button>
    </Container>
  );
};

const mapStateToProps = ({ user, auth }: any) => {
  return { user, auth };
};

export default connect(mapStateToProps, {})(Home);
