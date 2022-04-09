import React, { useState } from "react";
import { TableTransfer } from "./TableTransfer";

export const MergeTransfer = () => {
  const [data, setdata] = useState([
    {
      uker: "uker1",
      key: "uker1",
      children: [
        {
          aktivitas: "Aktivitas 1",
          key: "aktivitas1",
        },
      ],
    },
  ]);

  const [targetKeys, settargetKeys] = useState([]);

  const leftColumns = [
    {
      title: "",
      dataIndex: "uker",
    },
    {
      title: "Aktivitas",
      dataIndex: "aktivitas",
    },
  ];

  const rightColumns = [
    {
      title: "Uker",
      dataIndex: "uker",
    },
    {
      title: "Aktivitas",
      dataIndex: "aktivitas",
    },
  ];

  const onChange = (nextTargetKeys) => {
    settargetKeys(nextTargetKeys);
  };

  return (
    <TableTransfer
      dataSource={data}
      targetKeys={targetKeys}
      onChange={onChange}
      leftColumns={leftColumns}
      rightColumns={rightColumns}
    />
  );
};
