import { useState } from 'react';
import { AutoComplete } from 'antd';

export default function Uker({ uker, hookOnChange, id }) {
  const [inputValue, setInputValue] = useState(uker);
  const [options, setOptions] = useState([]);

  const mockVal = (num) => ({
    value: `Uker ${num}`,
    label: <p>Uker {num}</p>
  });

  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(1), mockVal(2), mockVal(3)],
    );
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const onChange = (data) => {
    setInputValue(data);
    hookOnChange(id, data)
  };

  return (
    <AutoComplete
      value={inputValue}
      options={options}
      style={{ width: "100%" }}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
      placeholder="Ketik Nama Uker"
    />
  );
}