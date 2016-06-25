import React from 'react';

const FilterButton = (props) => {
  const {filterType, onClick, activeFilter } = props;
  return (
    <button 
      className="filterButtons btn btn-primary"
      onClick={onClick}
      // refactor to set class
      style={{
        display: activeFilter === filterType ? 'none' : 'block'
      }}
    >
    {filterType}
    </button>
  );
};

export default FilterButton;