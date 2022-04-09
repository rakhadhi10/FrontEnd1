import React from "react";
import { Button, Table } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";

export const TableListKerugian = ({ data, onDelete }) => {
  const columns = [
    { key: "jumlah_kerugian", title: "Jumlah Kerugian", dataIndex: "jumlah_kerugian" },
    { key: "jenis_kerugian", title: "Jenis Kerugian", dataIndex: "jenis_kerugian" },
    { key: "keterangan", title: "Keterangan", dataIndex: "keterangan" },
    {
      key: "Action",
      title: "Action",
      dataIndex: "Action",
      render: (_, record) =>
        data.length !== 0 ? (
          <Button
            danger
            type="link"
            size="large"
            onClick={() => onDelete(record.key, record.jumlah_kerugian)}
          >
            <RiDeleteBin6Line />
          </Button>
        ) : null,
    },
  ];

  return <Table dataSource={data} columns={columns} pagination={false} bordered />;
};
