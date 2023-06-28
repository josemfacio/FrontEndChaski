import React from "react";
import { Pagination } from "semantic-ui-react";
import "./Pagination.scss";

export function Paginations(props) {
  const { cant, cant2, activePage, setActivePage } = props;
  return (
    <div>
      <Pagination
        totalPages={Math.ceil(cant / cant2)}
        activePage={activePage}
        onPageChange={(e, { activePage }) => setActivePage(activePage)}
      />
    </div>
  );
}
