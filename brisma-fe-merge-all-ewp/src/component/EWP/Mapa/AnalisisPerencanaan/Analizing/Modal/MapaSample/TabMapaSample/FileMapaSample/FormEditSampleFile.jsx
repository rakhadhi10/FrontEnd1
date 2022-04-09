import React from "react";
import { Input } from "antd";

export const FormEditSampleFile = ({ filename, deskripsi, onChange, id }) => {
  return (
    <div className="space-y-2">
      <p>{filename}</p>
      <Input.TextArea
        onChange={(e) => onChange(e, id)}
        defaultValue={deskripsi}
        key={id}
        rows={4}
        allowClear
      />
    </div>
  );
};
