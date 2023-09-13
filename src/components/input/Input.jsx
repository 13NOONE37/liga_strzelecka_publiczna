import React, { useEffect, useId, useReducer, useRef } from 'react';
import cx from 'classnames';

import styles from './Input.module.css';
import { ReactComponent as SuccessIcon } from '../../assets/icons/check.svg';
import { ReactComponent as WarningIcon } from '../../assets/icons/warning.svg';
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg';

export default function Input({
  heading,
  icon,
  iconPosition, //left or right
  type,
  placeholder,
  value,
  name,
  onChange,
  onBlur,
  status, // success, warning or error
  statusMessage,
  disabled,
  focusOnMount,
  setIsFocused,
  ...params
}) {
  const [inputState, setInputState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      id: useId(),
      isActive: false,
    },
  );
  const inputRef = useRef(null);

  const inputBox = cx(styles['input--box'], {
    [styles['input--box__active']]: value.length > 0 || inputState.isActive,
    [styles[`input--box__offset__${iconPosition}`]]: iconPosition,
    [styles[`input--box__${status}`]]: status,
    [styles['input--box__disabled']]: disabled,
  });

  useEffect(() => {
    if (setIsFocused && focusOnMount && inputRef.current) {
      inputRef.current.focus();
      setTimeout(() => {
        //We are setting this state to prevent validating on initial focus
        setIsFocused(true);
      }, 0);
    }
  }, []);

  return (
    <div className={styles['box']}>
      {heading && (
        <label className={styles['label']} htmlFor={inputState.id}>
          {heading}
        </label>
      )}
      <div className={inputBox}>
        {placeholder && (
          <span className={styles['input--placeholder']}>{placeholder}</span>
        )}

        <input
          ref={inputRef}
          className={styles['input']}
          id={inputState.id}
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          onFocus={() => setInputState({ isActive: true })}
          onBlur={(e) => {
            setInputState({ isActive: false });
            onBlur && onBlur(e);
          }}
          disabled={disabled}
          {...params}
        />
        {icon && <span className={styles['input--icon']}>{icon}</span>}
      </div>
      {status && (
        <span className={`${styles['status']} ${styles[`status__${status}`]}`}>
          {status === 'success' && <SuccessIcon />}
          {status === 'warning' && <WarningIcon />}
          {status === 'error' && <ErrorIcon />}
          {statusMessage}
        </span>
      )}
    </div>
  );
}
