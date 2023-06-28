import React from "react";
import { Button } from "semantic-ui-react";

export function HeaderPageUser(props) {
  const { title, btnTitle, btnClick } = props;
  return (
    <>
      <div className="header-page-admin">
        <h2>{title}</h2>
        {btnTitle && (
          <Button positive onClick={btnClick}>
            {btnTitle}
          </Button>
        )}
      </div>
    </>
  );
}
