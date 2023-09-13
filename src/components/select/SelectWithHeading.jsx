import React from 'react';
import cx from 'classnames';
import styles from './SelectWithHeading.module.css';

export default function SelectWithHeading({
  heading,
  children,
  id,
  additionalClasses = [],
}) {
  return (
    <div className={cx(styles.box, ...additionalClasses)}>
      {heading && (
        <label className={styles['label']} htmlFor={id}>
          {heading}
        </label>
      )}
      <div className={styles.inputBox}>{children}</div>
    </div>
  );
}
