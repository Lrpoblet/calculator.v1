import React from 'react';

const Display = ({ previousNumber, currentNumber }) => {
  return (
    <>
      <div className="oldNumber">{previousNumber}</div>
      <div className={currentNumber.length < 6 ? 'display' : 'display-small'}>
        {currentNumber}
      </div>
    </>
  );
};

export default Display;
