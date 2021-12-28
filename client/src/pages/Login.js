import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useNavigate } from "react-router-dom";

import { useForm } from "../util/hooks";

function Login() {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const { handleChange, handleSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <Box
      component="form"
      className="form-container"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h1>Login</h1>
      <TextField
        error={errors.username ? true : false}
        style={{ width: "100%" }}
        label="Username"
        name="username"
        size="small"
        type="text"
        helperText={errors.username}
        value={values.username}
        onChange={handleChange}
      />
      <TextField
        error={errors.password ? true : false}
        style={{ width: "100%" }}
        label="Password"
        name="password"
        size="small"
        type="password"
        helperText={errors.password}
        value={values.password}
        onChange={handleChange}
      />
      <LoadingButton loading={loading} type="submit" variant="contained">
        Login
      </LoadingButton>
    </Box>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
