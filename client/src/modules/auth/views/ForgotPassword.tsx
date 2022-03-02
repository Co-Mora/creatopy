import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD_USER } from "../../services/gql";
import { FORGOT_PASSWORD, USER_LOGIN_ERROR } from "../../types";

type FormValues = {
  email: string;
  password: string;
};

interface Props {
  auth: any;
}

const ForgotPassword: React.FC<Props> = ({ auth }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [resetPassword, { loading, error, data }] =
    useMutation(RESET_PASSWORD_USER);
  const [queryLoading, setQueryLoading] = useState(false);
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
    resetPassword({ variables: { email, password } });
  };

  useEffect(() => {
    setQueryLoading(loading);
    if (queryLoading) {
      if (!error)
        dispatch({
          type: FORGOT_PASSWORD,
          payload: data?.resetPassword,
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

    if (auth.hasOwnProperty("email")) {
      dispatch({ type: "CLEAR_AUTH" });
      navigate(`/signin`);
    }
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
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              {...register("password", { required: true })}
              type="password"
              placeholder="Enter Password"
            />
            {errors.password && <span>Password field is required</span>}
          </Form.Group>
          <Button variant="primary" type="submit">
            Reset
          </Button>
        </Form>
      </div>
    </Container>
  );
};

const mapStateToProps = ({ auth }: any) => {
  return { auth };
};

export default connect(mapStateToProps, {})(ForgotPassword);
