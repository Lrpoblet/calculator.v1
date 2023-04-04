import React from 'react';
import '../styles/Button.css';

function CalculatorButtons({
  handleReset,
  changeSign,
  handlePercent,
  handleButtonPress,
  calc,
}) {
  return (
    <div className="buttons">
      <button className="Button function" onClick={handleReset}>
        AC
      </button>
      <button className="Button function" onClick={changeSign}>
        +/-
      </button>
      <button className="Button function" onClick={handlePercent}>
        %
      </button>
      <button className="Button operator" onClick={handleButtonPress} value="/">
        ÷
      </button>
      <button className="Button" onClick={handleButtonPress} value="7">
        7
      </button>
      <button className="Button" onClick={handleButtonPress} value="8">
        8
      </button>
      <button className="Button" onClick={handleButtonPress} value="9">
        9
      </button>
      <button className="Button operator" onClick={handleButtonPress} value="*">
        x
      </button>
      <button className="Button" onClick={handleButtonPress} value="4">
        4
      </button>
      <button className="Button" onClick={handleButtonPress} value="5">
        5
      </button>
      <button className="Button" onClick={handleButtonPress} value="6">
        6
      </button>
      <button className="Button operator" onClick={handleButtonPress} value="-">
        -
      </button>
      <button className="Button" onClick={handleButtonPress} value="1">
        1
      </button>
      <button className="Button" onClick={handleButtonPress} value="2">
        2
      </button>
      <button className="Button" onClick={handleButtonPress} value="3">
        3
      </button>
      <button className="Button operator" onClick={handleButtonPress} value="+">
        +
      </button>
      <button className="Button zero" onClick={handleButtonPress} value="0">
        0
      </button>
      <button className="Button" onClick={handleButtonPress} value=".">
        ,
      </button>
      <button className="Button operator" onClick={calc}>
        =
      </button>
    </div>
  );
}

export default CalculatorButtons;
