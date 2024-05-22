import React, {
  useState,
  useRef,
  useEffect,
  ChangeEventHandler,
  KeyboardEventHandler,
  ReactNode,
} from 'react';
import cx from 'classnames';
import Input, { InputProps } from './Input';

interface InputWithSuggestionsProps<T> extends Omit<InputProps, 'onChange' | 'value'> {
  suggestions: Array<T>;
  onChange: (value: T) => void;
  getSuggestionLabel: (option: T) => string;
  getSuggestionKey: (value: T) => string;
  customLabel?: ReactNode;
}

function InputWithSuggestions<T>({
  suggestions,
  onChange,
  getSuggestionLabel,
  getSuggestionKey,
  customLabel,
  ...inputProps
}: InputWithSuggestionsProps<T>) {
  const [filteredSuggestions, setFilteredSuggestions] = useState<T[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const userInput = e.currentTarget.value;

    if (userInput === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = suggestions.filter((suggestion) =>
      getSuggestionLabel(suggestion).toLowerCase().startsWith(userInput.toLowerCase())
    );

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveSuggestion((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : prev));
    } else if ((e.key === 'Enter' || e.key === 'Tab') && activeSuggestion >= 0) {
      selectSuggestion(activeSuggestion);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (index: number) => {
    const selectedSuggestion = filteredSuggestions[index];
    if (inputRef.current) {
      inputRef.current.value = getSuggestionLabel(selectedSuggestion);
    }
    onChange(selectedSuggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (showSuggestions && filteredSuggestions.length === 0) {
      setShowSuggestions(false);
    }
  }, [filteredSuggestions, showSuggestions]);

  return (
    <div className="input-with-suggestions">
      {customLabel && <label htmlFor={inputProps.id}>{customLabel}</label>}
      <Input
        {...inputProps}
        ref={inputRef}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setTimeout(() => setShowSuggestions(false), 200);
        }}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={getSuggestionKey(suggestion)}
              className={cx('suggestion-item', { active: index === activeSuggestion })}
              onClick={() => selectSuggestion(index)}
            >
              {getSuggestionLabel(suggestion)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InputWithSuggestions;
