import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div>
      <button
        onClick={() => handlePageChange('prev')}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange('next')}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
