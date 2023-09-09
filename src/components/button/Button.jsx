import React, { useId, useReducer } from 'react';
import cx from 'classnames';

import styles from './Button.module.css';
import { ReactComponent as Load } from '../../assets/icons/load.svg';

export default function DefaultButton({
  style, //primary, secondary, text default is primary
  text,
  icon,
  iconPosition, //left or right
  type,
  action,
  size, //big, medium or small default is big
  customSize,
  disabled,
  isLoading,
  additionalClasses = [],
  ...params
}) {
  const buttonClasses = cx(styles.button, ...additionalClasses, {
    [styles[`button__offset__${iconPosition}`]]: iconPosition,
    [styles[`button__disabled`]]: disabled,
    [styles['button__loading']]: isLoading,
    [styles[`button__${size}`]]: size,
    [styles[`button__${style}`]]: style,
  });
  return (
    <button
      className={buttonClasses}
      onClick={action}
      type={type}
      disabled={disabled}
      style={customSize ?? {}}
      {...params}
    >
      {icon ? isLoading ? <Load className={styles.loading} /> : icon : <></>}
      <span>
        {!icon && isLoading ? <Load className={styles.loading} /> : text}
      </span>
    </button>
  );
}

export function IconButton({
  style, //primary or secondary default is primary
  icon,
  type,
  action,
  size, //big, medium or small default is big
  customSize,
  disabled,
  isLoading,
  params,
  additionalClasses = [],
}) {
  const buttonClasses = cx(styles['iconButton'], ...additionalClasses, {
    [styles[`iconButton__disabled`]]: disabled,
    [styles['iconButton__loading']]: isLoading,

    [styles[`iconButton__${size}`]]: size,
    [styles[`iconButton__${style}`]]: style,
  });
  return (
    <button
      className={buttonClasses}
      onClick={action}
      type={type}
      disabled={disabled}
      style={customSize ?? {}}
      {...params}
    >
      {isLoading ? <Load className={styles.loading} /> : icon}
    </button>
  );
}
