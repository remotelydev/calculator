import React, { useState } from 'react';
import './App.css';

function App() {
  const [ next, setNext ] = useState(0);
  const [ answer, setAnswer ] = useState(0);
  const [ operator, setOperator ] = useState(null);
  const [ previous, setPrevious ] = useState(null);
  const [ equalUsed, setEqualUsed ] = useState(false);

  const handleDot = (e) => {
    if(next === 0 || !next.includes('.')) {
      setNext(next + '.');
    }
  }
  const handleNumber = (e) => {
    let num = e.target.innerHTML;
    if(next === 0 || next === '0') {
      setNext(num);
    } else {
      setNext(next + num);
    }
    setEqualUsed(false);
  }
  const handleOperator = (e) => {
    if(equalUsed) {
      setOperator(e.target.innerHTML);
      return;
    }
    if(operator) {
      if(next === 0 && e.target.innerHTML === '-') {
        setNext('-');
        return;
      }
      if(next === '-') {
        setNext(0);
        setOperator(e.target.innerHTML);
        return;
      }
      setOperator(e.target.innerHTML);

      if(typeof previous === 'string' && typeof next === 'string') {
        calculate();
        setOperator(e.target.innerHTML);
      }
    } else {
      setOperator(e.target.innerHTML);
      setPrevious(next);
      setNext(0);
    }
  }
  const handleClear = (e) => {
    setNext(0);
    setAnswer(0);
    setOperator(undefined);
    setPrevious(undefined);
  }
  const handleEquals = (e) => {
    calculate();
  }
  const calculate = () => {
    let ans;
    switch(operator){
      case '+':
        ans = parseFloat(previous) + parseFloat(next);
        break;
      case '-':
        ans = parseFloat(previous) - parseFloat(next);
        break;
      case '*':
        ans = parseFloat(previous) * parseFloat(next);
        break;
      case '/':
        ans = Math.floor((parseFloat(previous) / parseFloat(next)) * 10000) / 10000;
        break;
        default:
          break;
        }
    setAnswer(ans);
    setNext(0);
    setPrevious(ans.toString());
    setOperator(null);
    setEqualUsed(true);
  }
  return (
    <div className="app">
      <input type="text" id="display" value={next === 0 ? answer : next} disabled/>
      <div className="buttons">
        <button id="equals" type="button" onClick={handleEquals}>=</button>
        <button id="zero" type="button" onClick={handleNumber}>0</button>
        <button id="one" type="button" onClick={handleNumber}>1</button>
        <button id="two" type="button" onClick={handleNumber}>2</button>
        <button id="three" type="button" onClick={handleNumber}>3</button>
        <button id="four" type="button" onClick={handleNumber}>4</button>
        <button id="five" type="button" onClick={handleNumber}>5</button>
        <button id="six" type="button" onClick={handleNumber}>6</button>
        <button id="seven" type="button" onClick={handleNumber}>7</button>
        <button id="eight" type="button" onClick={handleNumber}>8</button>
        <button id="nine" type="button" onClick={handleNumber}>9</button>
        <button id="add"type="button" onClick={handleOperator}>+</button>
        <button id="subtract" type="button" onClick={handleOperator}>-</button>
        <button id="multiply" type="button" onClick={handleOperator}>*</button>
        <button id="divide" type="button" onClick={handleOperator}>/</button>
        <button id="decimal" type="button" onClick={handleDot}>.</button>
        <button id="clear" type="button" onClick={handleClear}>C</button>
      </div>
      <div>
        answer: {answer} |
        next: {next} |
        operator: {operator} |
        previous: {previous}
      </div>
    </div>
  );
}

export default App;
