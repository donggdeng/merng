import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    addUser();
  };

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
      <h1>Register</h1>
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
        error={errors.email ? true : false}
        style={{ width: "100%" }}
        label="Email"
        name="email"
        size="small"
        type="email"
        helperText={errors.email}
        value={values.email}
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
      <TextField
        error={errors.confirmPassword ? true : false}
        style={{ width: "100%" }}
        label="Confirm Password"
        name="confirmPassword"
        size="small"
        type="password"
        helperText={errors.confirmPassword}
        value={values.confirmPassword}
        onChange={handleChange}
      />
      <LoadingButton loading={loading} type="submit" variant="contained">
        Sign Up
      </LoadingButton>
    </Box>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
