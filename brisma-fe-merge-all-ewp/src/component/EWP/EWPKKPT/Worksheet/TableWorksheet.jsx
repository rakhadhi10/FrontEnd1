import { Checkbox, Table } from "antd";
import React from "react";

export const TableWorksheet = ({ data, id, type, date, onCheck, columns }) => {
  // console.log(data);

  return (
    <div className="mb-10 gap-4">
      <p className="font-mulish text-gray-600 italic">{type + " " + id + " " + date}</p>
      <Table columns={columns} dataSource={data} pagination={false} bordered />
    </div>
  );
};
