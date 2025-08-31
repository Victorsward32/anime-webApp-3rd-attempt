import React from "react";
import "../../scss/components/pagination.scss";
import {getPages} from '../../utils/utils.jsx'

const Pagination = ({
  totalCount = 600,
  currentPage = 1,
  pageSize = 20,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const pages = getPages(currentPage, totalPages);

  return (
    <div data-component="pagination">
      {/* Prev */}
      <button
        className="pagination-Btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹ Back
      </button>

      {/* Page Numbers */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="ellipsis">…</span>
        ) : (
          <button
            key={idx}
            className={`page ${currentPage === page ? "active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        className="pagination-Btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next ›
      </button>
    </div>
  );
};

export default Pagination;
