import { Transfer, Table } from "antd";
import React from "react";

export const TableTransfer = ({ ...restProp }) => (
  <Transfer {...restProp}>
    {({ filteredItems, onItemSelect, selectedKeys: listSelectedKeys, disabled: listDisabled }) => {
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

      const rowSelection = {
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? "none" : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);
