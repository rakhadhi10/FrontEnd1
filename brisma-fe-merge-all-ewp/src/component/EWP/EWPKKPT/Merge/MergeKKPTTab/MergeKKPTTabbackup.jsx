import React, { useState } from "react";
import { Button, Tree, Table } from "antd";

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

export const MergeKKPTTab = ({ treeData }) => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedNode, setselectedNode] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [mergeValue, setmergeValue] = useState([]);

  const onExpand = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue, selectedNodes) => {
    console.log("onCheck", checkedKeysValue);
    console.log(selectedNodes);
    const newdata = selectedNodes.checkedNodes;
    setCheckedKeys(checkedKeysValue);
    setselectedNode([...newdata]);
  };

  const onSelect = (selectedKeysValue, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };

  const onTransfer = () => {
    console.log(selectedNode);
    setmergeValue((prev) => [...prev, ...selectedNode]);
    console.log(mergeValue);

    setselectedNode([]);
  };

  return (
    <div className="flex items-center w-full rounded-2xl bg-white border border-primary-blue py-5 px-5 mb-10">
      <div className="w-5/12">
        <p className="text-center font-mulish text-gray-500">List Merge</p>
        <Tree
          checkable
          checkStrictly
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={treeData}
        />
      </div>
      <div className="w-1/12">
        <Button type="primary" className="mb-4" onClick={onTransfer}>
          {">>"}
        </Button>
        <Button type="primary">{"<<"}</Button>
      </div>
      <div className="w-6/12">
        <Table columns={columns} pagination={false} dataSource={mergeValue} />
      </div>
    </div>
  );
};
