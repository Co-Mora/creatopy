import "../../styles/index.css";
import React, { useEffect, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SIGNIN_USER } from "../../services/gql";
import { useMutation } from "@apollo/client";
import { USER_LOGIN, USER_LOGIN_ERROR } from "../../types";

type FormValues = {
  email: string;
  password: string;
};

interface Props {
  auth: Object;
}

const Signin: React.FC<Props> = ({ auth }) => {
  const navigate = useNavigate();
  const [queryLoading, setQueryLoading] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [authUser, { loading, error, data }] = useMutation(SIGNIN_USER);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const { email, password } = data;
    authUser({ variables: { email, password } });
  };

  useEffect(() => {
    setQueryLoading(loading);
    if (queryLoading) {
      if (!error)
        dispatch({
          type: USER_LOGIN,
          payload: data?.signin,
        });
      else {
        dispatch({
          type: USER_LOGIN_ERROR,
          payload: error?.message,
        });
        setShow(true);
      }
      setQueryLoading(false);
    }
    if (auth.hasOwnProperty("email")) navigate(`/`);
  }, [loading, auth]);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{auth}</p>
      </Alert>
    );
  }

  return (
    <Container>
      <div className="auth-inner">
        <Form onSubmit={handleSubmit(onSubmit)} className="auth-wrapper">
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter email"
            />
            {errors.email && <span>Email field is required</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
            />
            {errors.password && <span>Password field is required</span>}
          </Form.Group>
          <Link to="/reset-password" className="forgot-password">
            Forgot Password
          </Link>
          <Button variant="primary" type="submit">
            Sign In
          </Button>
          <Button style={{ marginTop: 20 }} variant="success" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </Form>
      </div>
    </Container>
  );
};

const mapStateToProps = ({ auth }: any) => {
  return { auth };
};

export default connect(mapStateToProps, {})(Signin);
