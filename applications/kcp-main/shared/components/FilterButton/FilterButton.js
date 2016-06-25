import React from 'react';

const FilterButton = (props) => {
  const {filterType, onClick, activeFilter } = props;
  const classNames = activeFilter === filterType ? 'active' : ''
  return (
    <button
      className={`filterButtons btn btn-primary ${classNames}`}
      onClick={onClick}
    >
    {filterType}
    </button>
  );
};

export default FilterButton;