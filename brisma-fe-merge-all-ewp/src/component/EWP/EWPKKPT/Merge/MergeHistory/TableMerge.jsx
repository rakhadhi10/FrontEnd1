import React from "react";
import { Table } from "antd";

export const TableMerge = ({ data }) => {
  // const data = [
  //   { key: 1, judulKKPT: "Judul KKPT 1" },
  //   { key: 2, judulKKPT: "Judul KKPT 2" },
  // ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  }

  const columns = [
    {
      title: "uker",
      dataIndex: "uker",
    },
    {
      title: "Aktivitas",
      dataIndex: "aktivitas",
    },
    {
      title: "Sub Aktivitas",
      dataIndex: "subAktivitas",
    },
    {
      title: "Sub Major",
      dataIndex: "subMajor",
    },
    {
      title: "Risk Issue",
      dataIndex: "riskIssue",
    },
    {
      title: "Status",
      dataIndex: "pnNama",
    },
    {
      title: "Judul KKPT",
      dataIndex: "judulKKPT",
    },
  ];

  return <Table rowSelection={rowSelection} columns={columns} dataSource={data} size="small" bordered />;
};
