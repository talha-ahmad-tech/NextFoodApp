import * as React from 'react';

const RectangleButton = ({ label, onClick, selected = false }: any) => {
  return (
    <>
      <button
        className={`custom-btn-wrapper-terms`}
        style={selected ? { background: '#0B77E3', color: '#fff' } : {}}
        onClick={onClick}
        type="button"
      >
        {label}
      </button>
    </>
  );
};

export default RectangleButton;
