import React from "react";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const ListPnPenyebab = ({ data, onDelete }) => {
  const columns = [
    { title: "PN", dataIndex: "pn" },
    { title: "Nama", dataIndex: "nama" },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        data.length !== 0 ? (
          <DeleteOutlined style={{ color: "#c92222" }} onClick={() => onDelete(record.key)} />
        ) : null,
    },
  ];
  return <Table columns={columns} dataSource={data} pagination={false} />;
};
