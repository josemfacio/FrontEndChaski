import React from "react";
import "./HeaderPage.scss";
import { Button, Dropdown } from "semantic-ui-react";
export function HeaderPage(props) {
  const {
    title,
    btnTitle,
    btnClick,
    btnTitleTwo,
    btnClickTwo,
    talle,
    setSerch,
  } = props;
  let options = [];
  if (talle) {
    options = talle.map((item, index) => ({
      key: index,
      text: item.nombre,
      value: item.id,
    }));
  }
  return (
    <div className="header-page-admin">
      <h2>{title}</h2>
      <div>
        {talle && (
          <Dropdown
            placeholder="TALLER"
            search
            selection
            options={options}
            onChange={(event, data) => setSerch(data.value)}
          />
        )}
        {btnTitle && (
          <Button positive onClick={btnClick}>
            {btnTitle}
          </Button>
        )}

        {btnTitleTwo && (
          <Button color="orange" onClick={btnClickTwo}>
            {btnTitleTwo}
          </Button>
        )}
      </div>
    </div>
  );
}
