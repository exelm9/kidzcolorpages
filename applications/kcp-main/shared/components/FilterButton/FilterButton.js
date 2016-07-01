import React from 'react';

const FilterButton = (props) => {
  const {filterType, onClick, activeFilter } = props;
  const classNames = activeFilter === filterType ? 'selected' : ''
  return (
    <button
      className={`filterButtons btn btn-primary ${classNames}`}
      onClick={onClick}
    >
    <i className="filterLable"> {filterType}</i>
    </button>
  );
};

export default FilterButton;