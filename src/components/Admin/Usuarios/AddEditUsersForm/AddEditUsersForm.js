import React, { useEffect } from "react";
import { Form, Button, Checkbox, Dropdown } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useUser, useUserTalle, useTaller } from "../../../../hooks";
import "./AddEditUserForm.scss";

export function AddEditUserForm(props) {
  const { onClose, onRefetch, user } = props;
  const { addUser, updateUser } = useUser();
  const { getTaller, taller } = useTaller();
  const { AddUserTaller, updateUserTaller } = useUserTalle();
  useEffect(() => {
    getTaller();
  }, []);
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(
      user ? updateValidationSchema() : newValidationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (user) {
          await updateUser(user.user_data.id, formValue);
          await updateUserTaller(user.id, formValue);
          console.log(formValue);
          toast.success("USUARIO ACTUALIZADO CORRECTAMENTE");
        } else {
          const res = await addUser(formValue);
          formValue.idUser = res.id;
          await AddUserTaller(formValue);
          toast.success("USUARIO CREADO CORRECTAMENTE");
        }
        onRefetch();
        onClose();
      } catch (error) {
        console.log(error);
        toast.error("Error al procesar la solicitud");
      }
    },
  });
  let options = [];
  if (taller) {
    options = taller.map((item, index) => ({
      key: index,
      text: item.nombre,
      value: item.id,
    }));
  }

  return (
    <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="username"
        placeholder="Codigo de usuario"
        value={formik.values.username}
        error={formik.errors.username}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="first_name"
        placeholder="Nombres"
        value={formik.values.first_name}
        error={formik.errors.first_name}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="last_name"
        placeholder="Apellidos"
        value={formik.values.last_name}
        error={formik.errors.last_name}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formik.values.password}
        error={formik.errors.password}
        onChange={formik.handleChange}
      />
      <div className="add-edit-user-form__active">
        <Checkbox
          toggle
          checked={formik.values.is_active}
          onChange={(_, data) =>
            formik.setFieldValue("is_active", data.checked)
          }
        />
        Usuario Activo
      </div>
      <div className="add-edit-user-form__staff">
        <Checkbox
          toggle
          checked={formik.values.is_staff}
          onChange={(_, data) => formik.setFieldValue("is_staff", data.checked)}
        />
        Usuario Administrador
      </div>
      {!formik.values.is_staff && (
        <div>
          <Dropdown
            placeholder="TALLER"
            search
            selection
            value={formik.values.idTaller}
            options={options}
            onChange={(event, data) =>
              formik.setFieldValue("idTaller", data.value)
            }
          />
        </div>
      )}

      <Button
        type="submit"
        primary
        fluid
        content={user ? "Actualizar " : "Crear"}
      />
    </Form>
  );
}
function initialValues(user) {
  return {
    username: user?.user_data?.username || "",
    first_name: user?.user_data?.first_name || "",
    last_name: user?.user_data?.last_name || "",
    password: "",
    is_active: user?.user_data?.is_active ? true : false,
    is_staff: user?.user_data?.is_staff ? true : false,
    idTaller: user?.idTaller,
    idUser: user?.user_data?.id,
  };
}

// function initialValues(user) {
//   return {
//     username: user?.user_data?.username || "",
//     first_name: user?.user_data?.first_name || "",
//     last_name: user?.user_data?.last_name || "",
//     password: undefined,
//     is_active:
//       user?.user_data?.is_active !== undefined
//         ? user.user_data.is_active
//         : false,
//     is_staff:
//       user?.user_data?.is_staff !== undefined ? user.user_data.is_staff : false,
//     idTaller: user?.idTaller || null,
//     idUser: user?.user_data?.id || null,
//   };
// }
function newValidationSchema() {
  return {
    username: Yup.number().required(true),
    first_name: Yup.string().required(true),
    last_name: Yup.string().required(true),
    password: Yup.string().required(true),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
  };
}

function updateValidationSchema() {
  return {
    username: Yup.number().required(true),
    first_name: Yup.string().required(true),
    last_name: Yup.string().required(true),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
  };
}
