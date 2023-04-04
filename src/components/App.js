import { useState } from 'react';
import { roundAndStripZeros } from './utils';
import '../styles/App.css';
import '../styles/Button.css';
import Display from './Display';
import Button from './Button';

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
    setCurrentNumber((prevNumber) => {
      const newNumber = prevNumber * -1;
      return newNumber;
    });
  }

  const handleButtonPress = (ev) => {
    //destructuring para coger el value de event.target
    const { value } = ev.target;

    //compruebo si el valor es un numero o punto decimal
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      if (currentNumber === '0' && value !== '.') {
        setCurrentNumber(value);
      } else if (
        //compruebo si ya hay algun decimal
        (currentNumber.indexOf('.') === -1 || value !== '.') &&
        currentNumber.length < 8
      ) {
        setCurrentNumber((prevNumber) => prevNumber + value);
      }
    } else if (
      value === '+' ||
      value === '-' ||
      value === '*' ||
      value === '/'
    ) {
      if (operator) {
        try {
          //si ya hay un operador, evaluo la expresion y lo pong como numero previo
          const expression = `${previousNumber} ${operator} ${currentNumber}`;
          const result = eval(expression);
          const strippedResult = roundAndStripZeros(result);
          setPreviousNumber(strippedResult);
          setCurrentNumber('0');
        } catch (err) {
          //para manejar error y en caso de que se produzca un error en eval la calculadora se resetee
          handleReset();
          setCurrentNumber('Error');
        }
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
    } else if (operator === '/') {
      //incluido error si se intenta dividir entre 0
      if (parseFloat(currentNumber) === 0) {
        setCurrentNumber('Error');
        setOperator(null);
        setPreviousNumber('0');
        return;
      } else {
        result = parseFloat(previousNumber) / parseFloat(currentNumber);
      }
    }

    let strippedResult = roundAndStripZeros(result);

    if (result < 0) {
      strippedResult = '-' + strippedResult;
    }

    //para evitar que al darle igual salga NaN
    if (result === undefined) {
      strippedResult = currentNumber;
    }

    setCurrentNumber(strippedResult);
    setOperator(null);
  }

  return (
    <div className="App">
      <Display previousNumber={previousNumber} currentNumber={currentNumber} />
      <Button
        handleReset={handleReset}
        changeSign={changeSign}
        handlePercent={handlePercent}
        handleButtonPress={handleButtonPress}
        calc={calc}
      />
    </div>
  );
};

export default App;
