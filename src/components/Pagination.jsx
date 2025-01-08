// src/components/Pagination.jsx
import React from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 5;
  const pages = [];

  // Always include the first page
  if (currentPage > Math.ceil(maxVisiblePages / 2)) {
    pages.push(
      <li key="first" className="page-item">
        <button className="page-link" onClick={() => setCurrentPage(1)}>
          1
        </button>
      </li>
    );
    // Ellipsis after the first page if needed
    if (currentPage > Math.ceil(maxVisiblePages / 2) + 1) {
      pages.push(
        <li key="ellipsis-start" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }
  }

  // Calculate the visible range of pages
  const startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  // Add pages in the visible range
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
        <button className="page-link" onClick={() => setCurrentPage(i)}>
          {i}
        </button>
      </li>
    );
  }

  // Ellipsis before the last page if needed
  if (endPage < totalPages - 1) {
    pages.push(
      <li key="ellipsis-end" className="page-item disabled">
        <span className="page-link">...</span>
      </li>
    );
  }

  // Always include the last page
  if (endPage < totalPages) {
    pages.push(
      <li key="last" className="page-item">
        <button
          className="page-link"
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
      </li>
    );
  }

  return (
    <nav className="mt-4">
      <ul className="pagination justify-content-center m-0 p-2">{pages}</ul>
    </nav>
  );
};

export default Pagination;
