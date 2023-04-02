import { useState } from 'react';
import '../styles/App.css';
import '../styles/Button.css';

const App = () => {
  const [number, setNumber] = useState(0);
  const [oldNumber, setOldNumber] = useState(0);
  const [op, setOp] = useState(0);

  function handlePercent() {
    setNumber(number / 100);
  }

  function handleReset() {
    setNumber(0);
  }

  function handlebuttonPress(ev) {
    setNumber(ev.target.value);
  }

  return (
    <div className="App">
      <div className="display">{number}</div>
      <div className="buttons">
        <button className="Button function" onClick={handleReset}>
          AC
        </button>
        <button className="Button function">+/-</button>
        <button className="Button function" onClick={handlePercent}>
          %
        </button>
        <button
          className="Button operator"
          onClick={handlebuttonPress}
          value="/"
        >
          ÷
        </button>
        <button className="Button " onClick={handlebuttonPress} value="7">
          7
        </button>
        <button className="Button" onClick={handlebuttonPress} value="8">
          8
        </button>
        <button className="Button" onClick={handlebuttonPress} value="9">
          9
        </button>
        <button
          className="Button operator"
          onClick={handlebuttonPress}
          value="x"
        >
          x
        </button>
        <button className="Button" onClick={handlebuttonPress} value="4">
          4
        </button>
        <button className="Button" onClick={handlebuttonPress} value="5">
          5
        </button>
        <button className="Button" onClick={handlebuttonPress} value="6">
          6
        </button>
        <button
          className="Button operator"
          onClick={handlebuttonPress}
          value="-"
        >
          -
        </button>
        <button className="Button" onClick={handlebuttonPress} value="1">
          1
        </button>
        <button className="Button" onClick={handlebuttonPress} value="2">
          2
        </button>
        <button className="Button" onClick={handlebuttonPress} value="3">
          3
        </button>
        <button
          className="Button operator"
          onClick={handlebuttonPress}
          value="+"
        >
          +
        </button>
        <button className="Button zero" onClick={handlebuttonPress} value="0">
          0
        </button>
        <button className="Button" onClick={handlebuttonPress} value=",">
          ,
        </button>
        <button className="Button operator" onClick={handlebuttonPress}>
          =
        </button>
      </div>
    </div>
  );
};

export default App;
