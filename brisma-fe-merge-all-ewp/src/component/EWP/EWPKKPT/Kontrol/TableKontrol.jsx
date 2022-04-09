import React from "react";
import { Checkbox, Table } from "antd";
import { BiCheck } from "react-icons/bi";

export const TableKontrol = ({ data, onChange }) => {
  const columns = [
    {
      title: "Kode",
      dataIndex: "kode",
    },
    {
      title: "Uraian Kontrol",
      dataIndex: "nama",
    },
    {
      title: "Key",
      dataIndex: "mtd_stc_control_kritikalitas_kode",
      render: (_, record) => {
        let isKey = record.mtd_stc_control_kritikalitas_kode.split("-")
        return isKey[1].replace(/\s+/g, '') === "Key" ? <BiCheck color="#21D01E" className="text-2xl" /> : null
      }

    },
    {
      title: "Coso",
      dataIndex: "mtd_stc_control_coso_kode",
    },
    {
      title: "Nature Code",
      dataIndex: "mtd_stc_control_nature_kode",
    },
    {
      title: "Type Code",
      dataIndex: "mtd_stc_control_type_kode",
    },
    {
      title: "Terkait",
      dataIndex: "terkait",
      render: (_, record) => (data.length !== 0 ? <Checkbox onChange={(e) => onChange(e, record.kode)} /> : null),
    },
  ];
  return <Table columns={columns} dataSource={data} pagination={false} />;
};
