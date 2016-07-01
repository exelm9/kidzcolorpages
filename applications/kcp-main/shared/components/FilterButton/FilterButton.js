import React from 'react';

const FilterButton = (props) => {
  const {filterType, onClick, activeFilter, image } = props;
  const classNames = activeFilter === filterType ? 'selected' : '';
  const divStyle = {
    backgroundImage: 'url(' + image + ')'
  };
  return (
    <button
      className={`filterButtons btn btn-primary ${classNames}`}
      onClick={onClick}
      style={divStyle}
    >
    <i className="filterLable"> {filterType}</i>
    </button>
  );
};

export default FilterButton;