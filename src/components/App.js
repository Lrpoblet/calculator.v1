import { useState } from 'react';
import { roundAndStripZeros } from './utils';
import '../styles/App.css';
import '../styles/Button.css';

const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [previousNumber, setPreviousNumber] = useState('0');
  const [operator, setOperator] = useState(null);

  function handleReset() {
    setCurrentNumber('0');
    setOperator(null);
    setPreviousNumber('0');
  }

  function handlePercent() {
    let isNegative = currentNumber < 0;
    let result = Math.abs(currentNumber) / 100;
    const strippedResult = roundAndStripZeros(result);
    if (isNegative) {
      setCurrentNumber(-1 * strippedResult);
    } else {
      setCurrentNumber(strippedResult);
    }
  }

  function changeSign() {
    setCurrentNumber((prevNumber) => prevNumber * -1);
  }

  const handleButtonPress = (ev) => {
    //destructuring para coger el value de event.target
    const { value } = ev.target;

    //compruebo si el valor es un numero o punto decimal
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      if (currentNumber === '0' && value !== '.') {
        setCurrentNumber(value);
      } else if (currentNumber.length < 8) {
        setCurrentNumber((prevNumber) => prevNumber + value);
      }
    } else if (
      value === '+' ||
      value === '-' ||
      value === '*' ||
      value === '/'
    ) {
      if (operator) {
        //si ya hay un operador, evaluo la expresion y lo pong como numero previo
        const expression = `${previousNumber} ${operator} ${currentNumber}`;
        const result = eval(expression);
        const strippedResult = roundAndStripZeros(result);
        setPreviousNumber(strippedResult);
        setCurrentNumber('0');
      } else {
        //si no hay otro operador lo pongo como numero previo y reinicio el numero actual para esperar la operacion
        setPreviousNumber(currentNumber);
        setCurrentNumber('0');
      }
      setOperator(value);
    }
  };

  function calc() {
    let result;
    if (operator === '+') {
      result = parseFloat(previousNumber) + parseFloat(currentNumber);
    } else if (operator === '-') {
      result = parseFloat(previousNumber) - parseFloat(currentNumber);
    } else if (operator === '*') {
      result = parseFloat(previousNumber) * parseFloat(currentNumber);
    } else {
      result = parseFloat(previousNumber) / parseFloat(currentNumber);
    }
    //para redondear a 4 decimales
    let roundedResult = Math.abs(result).toFixed(4);
    //para eliminar los ceros no significativos en el decimal
    let strippedResult = roundedResult.replace(/\.?0+$/, '');

    if (result < 0) {
      strippedResult = '-' + strippedResult;
    }

    setCurrentNumber(strippedResult);
    setOperator(null);
  }

  return (
    <div className="App">
      <div className="oldNumber">{previousNumber}</div>
      <div className={currentNumber.length < 6 ? 'display' : 'display-small'}>
        {currentNumber}
      </div>
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
        <button
          className="Button operator"
          onClick={handleButtonPress}
          value="/"
        >
          ÷
        </button>
        <button className="Button " onClick={handleButtonPress} value="7">
          7
        </button>
        <button className="Button" onClick={handleButtonPress} value="8">
          8
        </button>
        <button className="Button" onClick={handleButtonPress} value="9">
          9
        </button>
        <button
          className="Button operator"
          onClick={handleButtonPress}
          value="*"
        >
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
        <button
          className="Button operator"
          onClick={handleButtonPress}
          value="-"
        >
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
        <button
          className="Button operator"
          onClick={handleButtonPress}
          value="+"
        >
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
    </div>
  );
};

export default App;
