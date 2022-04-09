import React from "react";
import { Popconfirm, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const TableInfoKkpt = ({ data, onProdukDelete }) => {
  const column = [
    {
      title: "Produk",
      dataIndex: "produk",
    },
    {
      title: "Action",
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => onProdukDelete(record.key)}>
            <DeleteOutlined className="cursor-pointer" />
          </Popconfirm>
        ) : null,
    },
  ];

  return <Table columns={column} dataSource={data} pagination={false} />;
};
