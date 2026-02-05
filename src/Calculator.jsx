import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [memory, setMemory] = useState(0);
  const [isMemory, setIsMemory] = useState(false);

  const handleNumber = (num) => {
    if (display === '0' || display === 'Error' || isMemory) {
      setDisplay(num);
      setIsMemory(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op) => {
    if (display === 'Error') return;
    
    const ops = ['+', '-', '×', '÷'];
    const lastChar = expression.slice(-1);
    
    if (ops.includes(lastChar)) {
      setExpression(expression.slice(0, -1) + op);
    } else {
      setExpression(expression + display + op);
    }
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setIsMemory(false);
  };

  const handleEquals = () => {
    if (display === 'Error' || expression === '') return;
    
    try {
      // Replace × and ÷ with * and / for eval
      let expr = expression.replace(/×/g, '*').replace(/÷/g, '/');
      expr += display;
      
      // Safe eval using Function constructor
      const result = new Function('return ' + expr)();
      
      if (!isFinite(result)) {
        throw new Error('Invalid');
      }
      
      setDisplay(result.toString());
      setExpression('');
      setIsMemory(true);
    } catch (error) {
      setDisplay('Error');
      setExpression('');
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.') && display !== 'Error') {
      setDisplay(display + '.');
    }
  };

  const handlePercent = () => {
    try {
      const val = parseFloat(display);
      if (!isNaN(val)) {
        setDisplay((val / 100).toString());
      }
    } catch {
      setDisplay('Error');
    }
  };

  const handlePlusMinus = () => {
    if (display !== '0' && display !== 'Error') {
      if (display.startsWith('-')) {
        setDisplay(display.substring(1));
      } else {
        setDisplay('-' + display);
      }
    }
  };

  const handleMemory = (action) => {
    const current = parseFloat(display);
    if (isNaN(current)) return;

    switch (action) {
      case 'MC': // Memory Clear
        setMemory(0);
        break;
      case 'MR': // Memory Recall
        setDisplay(memory.toString());
        setIsMemory(true);
        break;
      case 'M+': // Memory Add
        setMemory(memory + current);
        setIsMemory(true);
        break;
      case 'M-': // Memory Subtract
        setMemory(memory - current);
        setIsMemory(true);
        break;
      default:
        break;
    }
  };

  const handleBackspace = () => {
    if (display.length > 1 && display !== 'Error') {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  return (
    <div className="calculator-container">
      <h1>My Calculator</h1>
      
      <div className="calculator">
        {/* Memory Display */}
        <div className="memory-display">
          <span>M: {memory}</span>
          <div className="memory-buttons">
            <button className="btn memory" onClick={() => handleMemory('MC')}>MC</button>
            <button className="btn memory" onClick={() => handleMemory('MR')}>MR</button>
            <button className="btn memory" onClick={() => handleMemory('M+')}>M+</button>
            <button className="btn memory" onClick={() => handleMemory('M-')}>M-</button>
          </div>
        </div>

        {/* Main Display */}
        <div className="display">
          <div className="expression">{expression}</div>
          <div className="result">{display}</div>
        </div>

        {/* Keypad */}
        <div className="keypad">
          {/* Row 1 */}
          <button className="btn clear" onClick={handleClear}>AC</button>
          <button className="btn operator" onClick={handleBackspace}>⌫</button>
          <button className="btn operator" onClick={handlePercent}>%</button>
          <button className="btn operator" onClick={() => handleOperator('÷')}>÷</button>

          {/* Row 2 */}
          <button className="btn number" onClick={() => handleNumber('7')}>7</button>
          <button className="btn number" onClick={() => handleNumber('8')}>8</button>
          <button className="btn number" onClick={() => handleNumber('9')}>9</button>
          <button className="btn operator" onClick={() => handleOperator('×')}>×</button>

          {/* Row 3 */}
          <button className="btn number" onClick={() => handleNumber('4')}>4</button>
          <button className="btn number" onClick={() => handleNumber('5')}>5</button>
          <button className="btn number" onClick={() => handleNumber('6')}>6</button>
          <button className="btn operator" onClick={() => handleOperator('-')}>-</button>

          {/* Row 4 */}
          <button className="btn number" onClick={() => handleNumber('1')}>1</button>
          <button className="btn number" onClick={() => handleNumber('2')}>2</button>
          <button className="btn number" onClick={() => handleNumber('3')}>3</button>
          <button className="btn operator" onClick={() => handleOperator('+')}>+</button>

          {/* Row 5 */}
          <button className="btn number zero" onClick={() => handleNumber('0')}>0</button>
          <button className="btn number" onClick={handleDecimal}>.</button>
          <button className="btn operator" onClick={handlePlusMinus}>±</button>
          <button className="btn equals" onClick={handleEquals}>=</button>
        </div>

        <div className="footer">
          <p>hey visitor</p>
          <p>Press h for help</p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
