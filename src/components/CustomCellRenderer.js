/* eslint-disable react/prop-types */
import React from 'react';
import '../styles/CustomCellRenderer.css';

const CustomCellRenderer = ({value}) => {
  return (
    <div className="custom-cell">
      {value}
    </div>
  );
};

export default CustomCellRenderer;
