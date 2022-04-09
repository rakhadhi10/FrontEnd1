import { useState } from 'react';
import { AutoComplete } from 'antd';

export default function Name({ value, onChange, ...props }){
  const [options, setOptions] = useState([]);

  const mockVal = (num) => ({
    value: `${num} - Name`,
    label: <p>{num} - Name</p>
  });

  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(1), mockVal(2), mockVal(3)],
    );
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  return (
    <AutoComplete
      placeholder="Ketik Nama atau PN"
      value={value}
      options={options}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
      style={{ width: "100%" }}
      {...props}
    />
  );
}