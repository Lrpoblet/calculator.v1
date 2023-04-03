import { useState } from 'react';
import '../styles/App.css';
import '../styles/Button.css';

const App = () => {
  const [number, setNumber] = useState('0');
  const [oldNumber, setOldNumber] = useState('0');
  const [op, setOp] = useState(0);

  function handleReset() {
    setNumber('0');
    setOp('0');
    setOldNumber('0');
  }

  function handlePercent() {
    let result = number / 100;
    setNumber(result.toFixed(4));
  }

  function changeSign() {
    setNumber(number * -1);
  }

  function handleButtonPress(ev) {
    // uso destructuring para extraer la propiedad value del objeto ev.target
    const { value } = ev.target;
    const operators = ['+', '-', 'x', '/'];

    if (operators.includes(value)) {
      setOp(value);
      setOldNumber(number);
      //pendiente mantener el numero antiguo en pantalla hasta introducir uno nuevo
      setNumber('0');
    } else if (number.length < 5 && /^[0-9]*\.?[0-9]*$/.test(value)) {
      //limitado a 5 digitos para no deformar la calculadora, en futuras versiones hacer que se vayan haciendo más pequeños los núemros
      //también está pendiente añadir el punto del mil

      if (number === '0' && value !== '.') {
        setNumber(value);
      } else if (!number.includes('.') || value !== '.') {
        setNumber(number + value);
      } else {
        setNumber(number);
      }
    } else {
      setNumber(number);
    }
  }

  function calc() {
    let result;
    if (op === '+') {
      result = oldNumber + number;
    } else if (op === '-') {
      result = oldNumber - number;
    } else if (op === 'x') {
      result = oldNumber * number;
    } else {
      result = oldNumber / number;
    }

    // obtener el valor absoluto del resultado
    let absResult = Math.abs(result);
    //  para asegurarse de que el resultado solo se redondee a 4 decimales si tiene decimales, y no se redondee si es un número entero.
    if (Math.floor(absResult) !== absResult && absResult % 0.0001 !== 0) {
      result = absResult.toFixed(4);
      if (result < 0) {
        // si el resultado original era negativo, multiplicar por -1 para obtener el resultado negativo redondeado correctamente
        result = -1 * result;
      }
    }

    setNumber(result);
    setOp('0');
  }

  return (
    <div className="App">
      <div className="oldNumber">{oldNumber}</div>
      <div className="display">{number}</div>
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
          value="x"
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
