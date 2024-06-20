/* eslint-disable react/prop-types */
import React from 'react';
import './CustomCellRenderer.css';

const CustomCellRenderer = ({value}) => {
  return (
    <div className="custom-cell">
      {value}
    </div>
  );
};

export default CustomCellRenderer;
