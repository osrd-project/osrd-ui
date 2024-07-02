import React, { useState, useRef } from 'react';
import Input, { InputProps } from './Input';
import Modal from '../Modal';

const TolerancePicker: React.FC<InputProps> = (inputProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const [minusTolerance, setMinusTolerance] = useState('00');
  const [plusTolerance, setPlusTolerance] = useState('00');
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTimeChange = (newMinusTolerance: string, newPlusTolerance: string) => {
    setMinusTolerance(newMinusTolerance);
    setPlusTolerance(newPlusTolerance);
    const formattedValue = `-${newMinusTolerance}/+${newPlusTolerance}`;
    setInputValue(formattedValue);
  };

  const TOLERANCE_RANGES = [
    '00',
    '05',
    '10',
    '15',
    '20',
    '25',
    '30',
    '35',
    '40',
    '45',
    '1h',
    '1h15',
    '1h30',
    '1h45',
    '2h',
    '2h30',
    '3h00',
    '3h30',
    '4h00',
  ];

  return (
    <div className="tolerance-picker">
      <div>
        <Input
          {...inputProps}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowPicker(true);
          }}
          readOnly
          onClick={() => setShowPicker(!showPicker)}
          type="text"
          ref={inputRef}
        />
      </div>

      <Modal inputRef={inputRef} isOpen={showPicker} onClose={() => setShowPicker(false)}>
        <div className="time-tolerance">
          <div className="time-picker-section">
            <div className="tolerance-grid">
              {TOLERANCE_RANGES.map((tolerance, index) => (
                <button
                  key={tolerance}
                  className={`minute ${minusTolerance === tolerance ? 'selected' : ''}`}
                  style={{ gridArea: `a${index + 1}` }}
                  onClick={() => handleTimeChange(tolerance, plusTolerance)}
                >
                  {`-${tolerance}`}
                </button>
              ))}
            </div>
          </div>

          <div className="divider" />

          <div className="time-picker-section">
            <div className="tolerance-grid plus-tolerance">
              {TOLERANCE_RANGES.map((tolerance, index) => (
                <button
                  key={tolerance}
                  className={`minute ${plusTolerance === tolerance ? 'selected' : ''}`}
                  style={{ gridArea: `a${index + 1}` }}
                  onClick={() => handleTimeChange(minusTolerance, tolerance)}
                >
                  {`+${tolerance}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TolerancePicker;
