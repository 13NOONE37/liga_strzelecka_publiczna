import React from 'react';
import styles from './Checkbox.module.css';
import { ReactComponent as CheckIcon } from '../../assets/icons/checkPath.svg';
export default function Checkbox({ checked = false, onChange, disabled }) {
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <CheckIcon />
    </div>
  );
}
