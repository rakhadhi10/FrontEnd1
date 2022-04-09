import React from "react";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const TableListPenyebab = ({ data, onDelete }) => {
  const columns = [
    { title: "Kode Penyebab", dataIndex: "penyebab_kode", key: "penyebab_kode" },
    { title: "Nama Penyebab", dataIndex: "penyebab_name", key: "penyebab_name" },
    { title: "Deskripsi", dataIndex: "desc", key: "desc" },
    {
      title: "PN",
      dataIndex: "pn",
      key: "pn",
      render: (pn) => {
        return pn.length !== 0 ? <p className="flex flex-wrap">{pn.map((item) => item.pn + ", ")} </p> : null
      }
      ,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {

        return <DeleteOutlined
          style={{ color: "#c92222" }}
          onClick={() => onDelete(record.id)}
          className="text-xl"
        />
      }

    },
  ];

  return <Table dataSource={data} columns={columns} pagination={false} bordered />;
};
