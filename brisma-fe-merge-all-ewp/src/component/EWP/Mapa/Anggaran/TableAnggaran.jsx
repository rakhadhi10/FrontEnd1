import React from "react";
import { Table } from "antd";
import { BiPencil } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Moment from "react-moment";
import "moment/locale/id";
import NumberFormat from "react-number-format";
import { numberWithCommas } from "../../../../utils/helper";

export const TableAnggaran = ({ dataAnggaran, handleEdit, handleDelete, loading }) => {
  const remapEditdata = (data) => {
    return {
      tipe_anggaran_name: data.tipe_anggaran_name,
      stc_mapa_tipe_anggaran_kode: data.stc_mapa_tipe_anggaran_kode,
      tanggal: data.tanggal,
      amount: data.amount,
      deskripsi: data.deskripsi,
    };
  };
  const columns = [
    {
      title: "Tipe Pengeluaran",
      dataIndex: "tipe_anggaran_name",
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      render: (_, record) => <Moment date={record.tanggal} format="DD-MMMM-YYYY" locale="id" />,
    },
    {
      title: "Biaya",
      dataIndex: "amount",
      render: (_, record) => "Rp. " + numberWithCommas(record.amount),
    },
    {
      title: "Deskripsi",
      dataIndex: "deskripsi",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        dataAnggaran.length !== 0 ? (
          <div className="text-2xl space-x-3 flex">
            <BiPencil
              color="#0827C7"
              className="cursor-pointer"
              onClick={() => {
                console.log(remapEditdata(record));
                handleEdit(remapEditdata(record), true, record.id);
              }}
            />
            {record.stc_mapa_tipe_anggaran_kode == null && (
              <RiDeleteBin6Line
                color="#E41F1F"
                className="cursor-pointer"
                onClick={() => handleDelete(record.id)}
              />
            )}
          </div>
        ) : null,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataAnggaran}
      pagination={false}
      rowKey="id"
      loading={loading}
    />
  );
};
