import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "./LoginForm.scss";
import { useAuth } from "../../../hooks";
import { loginApi } from "../../../api/user";
export function LoginForm() {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try {
        const response = await loginApi(formValue);
        const { access } = response;
        login(access);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
  });
  return (
    <Form className="login-form-admin" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="username"
        placeholder="Nombre de usuario"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        placeholder="Contraseña"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <Button type="submit" content="Iniciar Sesión" primary fluid />
    </Form>
  );
}
function initialValues() {
  return {
    username: "",
    password: "",
  };
}
function validationSchema() {
  return {
    username: Yup.string().required(true),
    password: Yup.string().required(true),
  };
}
