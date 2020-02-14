import React from "react";
import _ from "lodash";
import propTypes from "prop-types";

const Pagination = props => {
  const { pageSize, onClick, pageLength, currentPage } = props;

  const pages = Math.ceil(pageLength / pageSize);

  if (pages === 1) return null;
  const pageCount = _.range(1, pages + 1);

  return (
    <nav>
      <ul className="pagination">
        {pageCount.map(p => (
          <li
            key={p}
            className={p === currentPage ? "page-item active" : "page-item"}
          >
            <p className="page-link" onClick={() => onClick(p)}>
              {p}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  pageSize: propTypes.number.isRequired,
  pageLength: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired
};

export default Pagination;
