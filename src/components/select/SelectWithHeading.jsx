import React from 'react';

import styles from '../input/Input.module.css';
import { ReactComponent as SuccessIcon } from '../../assets/icons/check.svg';
import { ReactComponent as WarningIcon } from '../../assets/icons/warning.svg';
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg';

export default function SelectWithHeading({
  heading,
  status, // success, warning or error
  statusMessage,
  children,
  id,
}) {
  return (
    <div className={styles['box']}>
      {heading && (
        <label className={styles['label']} htmlFor={id}>
          {heading}
        </label>
      )}
      <div className={styles.inputBox}>{children}</div>
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
