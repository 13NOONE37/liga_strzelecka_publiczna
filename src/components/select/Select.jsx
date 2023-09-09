import React, { useEffect, useRef } from 'react';
import ReactSelect from 'react-select';
import cx from 'classnames';

import styles from './Select.module.css';

const Select = ({
  placeholder,
  value,
  onChange,
  options,
  isSearchable,
  size,
  width,
  height,
  backgroundColor,
  id,
  focusOnMount,
  setIsFocused,
  setTouched,
  isMulti,
  limitOfOptions,
  isDisabled,
}) => {
  const selectRef = useRef(null);

  useEffect(() => {
    if (setIsFocused && focusOnMount && selectRef.current) {
      selectRef.current.focus();
      setTimeout(() => {
        //We are setting this state to prevent validating on initial focus
        setIsFocused(true);
      }, 0);
    }
  }, []);

  return (
    <div className={cx(styles.box, { [styles[`box__${size}`]]: size })}>
      <ReactSelect
        ref={selectRef}
        className={styles['box--select']}
        id={id}
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={onChange}
        isSearchable={isSearchable}
        noOptionsMessage={() => 'Brak wyników'}
        classNamePrefix={'box--select'}
        isMulti={isMulti}
        isDisabled={isDisabled}
        isOptionDisabled={() => value?.length >= limitOfOptions}
        styles={{
          multiValue: (base, state) => {
            return {
              ...base,
              display: state.isDisabled ? 'none' : 'inherit',
              backgroundColor: '#39394b',
              color: state.isDisabled ? '#605cff' : '#fff',
            };
          },
          indicatorSeparator: (base, state) => {
            return {
              ...base,
              background: state.isDisabled ? '#39394b' : 'inherit',
            };
          },
          multiValueRemove: (base, state) => {
            return {
              ...base,
              backgroundColor: '#ff5c5c',
            };
          },
          clearIndicator: (base, state) => {
            return {
              ...base,
              color: '#39394b',
            };
          },
          dropdownIndicator: (base, state) => {
            return {
              ...base,
              color: '#39394b',
            };
          },
          control: (base, state) => {
            return {
              ...base,
              transition: 'all .1s ease-in',
              borderWidth: state.isDisabled ? '0px' : '1px',
              borderRadius: '10px',
              width: width ?? 'auto',
              height: height ?? 'auto',
              padding: state.isMulti && '1em',
              paddingLeft: '1em',
              color: state.isDisabled ? '#605cff ' : 'inherit',
            };
          },
          placeholder: (base, state) => {
            return {
              ...base,
              color: state.isDisabled ? '#605cff ' : 'inherit',
            };
          },
          option: (base, state) => {
            return {
              ...base,
              fontWeight: '500',
              color: state.isSelected ? '#222131' : '#fff',
            };
          },
          noOptionsMessage: (base, state) => {
            return {
              ...base,
              color: '#fff',
            };
          },
        }}
        theme={(theme) => ({
          ...theme,

          colors: {
            ...theme.colors,
            primary: 'rgba(129, 118, 255, 0.9)', //active-option and active-border
            // primary75: 'red',
            primary50: 'rgba(48, 42, 255, 0.5)', //option--pressed
            primary25: 'rgba(71, 66, 253, 0.5)', //current-select
            // danger: 'orange',
            // dangerLight: 'orange',
            neutral0: `${backgroundColor ?? '#39394b'}`, //background-color
            neutral5: '#33315f',
            // neutral10: 'yellow',
            neutral20: 'transparent', //inactive-border
            neutral30: '#4742fd', //border-hover-color
            neutral40: '#4742fd', //icon-inactive-hover-color
            neutral50: '#fff', //placeholder
            neutral60: '#605cff',
            // neutral70: 'orange',
            neutral80: '#fff', //selected option text in main and icon-active-hover-color
            // neutral90: 'yellow',
          },
          // #33315f
          // #605cff
        })}
        onBlur={setTouched ?? (() => {})}
      />
    </div>
  );
};

export default Select;
