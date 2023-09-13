import React, { useEffect } from 'react';
import Input from '../Input';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';

export default function SearchInput({ tempValue, setValue, onChange }) {
  useEffect(() => {
    const id = setTimeout(() => {
      setValue(tempValue);
    }, 400);
    return () => {
      clearTimeout(id);
    };
  }, [tempValue]);

  return (
    <Input
      icon={
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <SearchIcon style={{ fill: '#fff', width: '25px', height: '25px' }} />
        </div>
      }
      iconPosition={'right'}
      value={tempValue}
      onChange={onChange}
      placeholder={'Szukaj...'}
    />
  );
}
