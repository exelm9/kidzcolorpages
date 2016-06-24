import React from 'react';

const FilterButton = (props) => {
  const {filterType, onClick} = props;
  return (
    <button 
      className="filterButtons btn btn-primary"
      onClick={onClick}
    >
    {filterType}
    </button>
  );
};

export default FilterButton;