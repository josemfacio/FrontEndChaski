import React from "react";
import { useUser } from "../../../../hooks";
import { Button } from "semantic-ui-react";
import { toast } from "react-toastify";

export function DeleteUser(props) {
  const { onClose, onRefetch, user } = props;
  const { deleteUser } = useUser();
  return (
    <>
      <h2>{`Estas seguro de eliminar a ${user.email}`}</h2>
      <Button
        negative
        onClick={async () => {
          try {
            await deleteUser(user.id);
            onRefetch();
            onClose();
            toast.success("USUARIO ELIMINADO CORRECTAMENTE");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Si
      </Button>
      <Button onClick={() => onClose()}>No</Button>
    </>
  );
}
