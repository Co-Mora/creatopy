import "../../styles/index.css";
import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../services/gql";
import { CREATE_USER } from "../../types";
import { useNavigate } from "react-router-dom";
type FormValues = {
  title: string;
  email: string;
  password: string;
};

interface Props {
  auth: Object;
}

const Signup: React.FC<Props> = ({ auth }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [queryLoading, setQueryLoading] = useState(false);
  const [createUser, { loading, error, data }] = useMutation(ADD_USER);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const { title, email, password } = data;
    createUser({ variables: { title, email, password } });
  };

  useEffect(() => {
    setQueryLoading(loading);
    if (queryLoading) {
      dispatch({
        type: CREATE_USER,
        payload: data?.signup,
      });
      setQueryLoading(false);
    }
    if (auth.hasOwnProperty("email")) navigate(`/`);
  }, [loading, auth]);

  return (
    <Container>
      <div className="auth-inner">
        <Form onSubmit={handleSubmit(onSubmit)} className="auth-wrapper">
          <Form.Group className="mb-3" controlId="formGroupTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              {...register("title", { required: true })}
              type="title"
              placeholder="Enter Title"
            />
            {errors.title && <span>Title field is required</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              {...register("email", { required: true })}
              className="form-control"
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
          <Button variant="primary" type="submit">
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

export default connect(mapStateToProps, {})(Signup);
