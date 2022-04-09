import React from "react";
import { Table } from "antd";
import { BiPencil } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

export const TableRekomendasi = ({ dataRekomendasi, handleEdit, handleDelete }) => {
  const columns = [
    {
      title: "Tipe Rekomendasi",
      dataIndex: "tipe_rekomendasi_name",
    },
    {
      title: "Uker Tujuan branch",
      dataIndex: "ref_uker_tujuan_branch_name",
    },
    {
      title: "Uraian Rekomendasi",
      dataIndex: "desc",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        dataRekomendasi.length !== 0 ? (
          <div className="text-2xl gap-3 flex">
            <BiPencil
              color="#0827C7"
              className="cursor-pointer"
              onClick={() => handleEdit(record)}
            />
            <RiDeleteBin6Line
              color="#E41F1F"
              className="cursor-pointer"
              onClick={() => handleDelete(record)}
            />
          </div>
        ) : null,
    },
  ];

  return <Table bordered columns={columns} dataSource={dataRekomendasi} pagination={false} />;
};
