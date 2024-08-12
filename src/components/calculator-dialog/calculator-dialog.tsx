import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './calculator-dialog.css';

interface CalculatorDialogProps {
    isCalculatorDialogVisible: boolean;
    setIsCalculatorDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalculatorDialog: React.FC<CalculatorDialogProps> = ({ isCalculatorDialogVisible, setIsCalculatorDialogVisible }) => {
    const [input, setInput] = useState<string>('');
    const [result, setResult] = useState<string>('');

    const handleButtonClick = (value: string) => {
        if (value === '=') {
            try {
                // Use eval function to evaluate the result
                setResult(eval(input).toString());
            } catch (error) {
                setResult('Error');
            }
        } else if (value === 'C') {
            setInput('');
            setResult('');
        } else {
            setInput(input + value);
        }
    };

    const setDialogVisible = () => {
        setIsCalculatorDialogVisible(!isCalculatorDialogVisible);
    }

    return (
        <Draggable handle=".calculator-dialog-header">
            <div className="calculator-dialog-container">
                <div className="calculator-dialog">
                    <div className="calculator-dialog-content">
                        <div className="calculator-dialog-header">
                            <div className="calculator-dialog-title">Calculator</div>
                            <div className="calculator-dialog-close pointer" onClick={setDialogVisible}>
                                <span className="pi pi-times">&times;</span>
                            </div>
                        </div>
                        <div className="calculator-dialog-body">
                            <div className="calculator-display">
                                <input type="text" value={input} readOnly className="calculator-input" />
                                <div className="calculator-result">{result}</div>
                            </div>
                            <div className="calculator-buttons">
                                <button onClick={() => handleButtonClick('1')}>1</button>
                                <button onClick={() => handleButtonClick('2')}>2</button>
                                <button onClick={() => handleButtonClick('3')}>3</button>
                                <button onClick={() => handleButtonClick('+')}>+</button>
                                <button onClick={() => handleButtonClick('4')}>4</button>
                                <button onClick={() => handleButtonClick('5')}>5</button>
                                <button onClick={() => handleButtonClick('6')}>6</button>
                                <button onClick={() => handleButtonClick('-')}>-</button>
                                <button onClick={() => handleButtonClick('7')}>7</button>
                                <button onClick={() => handleButtonClick('8')}>8</button>
                                <button onClick={() => handleButtonClick('9')}>9</button>
                                <button onClick={() => handleButtonClick('*')}>*</button>
                                <button onClick={() => handleButtonClick('0')}>0</button>
                                <button onClick={() => handleButtonClick('.')}>.</button>
                                <button onClick={() => handleButtonClick('=')}>=</button>
                                <button onClick={() => handleButtonClick('/')}>/</button>
                                <button onClick={() => handleButtonClick('C')}>C</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    );
}

export default CalculatorDialog;
