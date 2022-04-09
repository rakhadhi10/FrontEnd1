import { Radio, Typography } from 'antd';

export default function SelectAuditSource({ current, onChange }){
  const handleOnChange = e => {
    onChange(e.target.value);
  };

  return (
    <Radio.Group 
      onChange={handleOnChange}
      defaultValue={current}
      className="grid grid-cols-2"
    >
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <img src="/select-pat.png" alt="PAT"/>
          <Typography.Title 
            level={2} 
            style={{ margin: 0, padding: 0, color: "#3BAAA4"}}
          >
            PAT
          </Typography.Title>
        </div>
        <Radio value="pat" />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <img src="/select-non-pat.png" alt="PAT" />
          <Typography.Title
            level={2}
            style={{ margin: 0, padding: 0, color: "#FE9843" }}
          >
            NON PAT
          </Typography.Title>
        </div>
        <Radio value="nonpat" />
      </div>
    </Radio.Group>
  );
}