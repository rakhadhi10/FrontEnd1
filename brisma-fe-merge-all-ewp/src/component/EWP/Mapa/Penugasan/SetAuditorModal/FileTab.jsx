import { Table } from "antd";
import React from "react";

export const FileTab = ({ data = [], onSelectData, loading }) => {
  const column = [
    {
      title: "Auditor",
      key: "auditor",
      render: (_, record) => record.pn_auditor + " - " + record.name_auditor,
    },
    { title: "Nama File", dataIndex: "value", key: "filename" },
    { title: "Description", dataIndex: "description", key: "description" },
  ];

  return (
    <Table
      columns={column}
      dataSource={data}
      loading={loading}
      rowSelection={{
        onSelect: (record, selected) => {
          if (selected) {
            onSelectData(record.id);
          }
        },
      }}
      rowKey="id"
    />
  );
};
