import React from 'react';
import styles from './ShowPasswordButton.module.css';
import { ReactComponent as Visibility } from '../../../assets/icons/visibility.svg';
import { ReactComponent as VisibilityOff } from '../../../assets/icons/visibility_off.svg';

export default function ShowPasswordButton({ isVisible, setIsVisible }) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => setIsVisible(!isVisible)}
    >
      {isVisible ? <Visibility /> : <VisibilityOff />}
    </button>
  );
}
