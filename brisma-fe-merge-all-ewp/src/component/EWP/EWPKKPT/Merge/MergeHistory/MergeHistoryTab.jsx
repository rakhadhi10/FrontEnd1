import { useState } from "react";
import { Card, Divider, Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";
export const MergeHistoryTab = ({ dataListHistory }) => {

  const [infoKkptMerge, setInfoKkptMerge] = useState({
    examplar: "",
    auditor: {
      posisi: "",
      pn: "",
      nama: ""
    },
    risk_issue: {
      kode: "",
      nama: ""
    },
    sub_major: {
      kode: ""
    },
    sub_aktivitas: "",
    aktivitas: "",
    uker: ""
  })

  const onSelect = (selectedKeys, info) => {
    // console.log(info.node)
    if (info.node.id_kkpt_merge !== undefined) {
      console.log(info.node)
      setInfoKkptMerge(info.node.info_kkpt)
    }
  };


  return (
    <div className="flex w-full rounded-2xl bg-white border border-primary-blue py-5 px-5 mb-10 space-x-5">
      <div className="flex flex-col justify-start w-6/12 space-y-4">
        <p className="text-center font-mulish text-gray-500 text-xl">List Merge</p>
        <Tree
          className="mt-5"
          showLine
          defaultExpandedKeys={["1-1-1-1-1-1"]}
          defaultSelectedKeys={["1-1-1-1-1-1"]}
          switcherIcon={<DownOutlined style={{ fontSize: "13px", fontWeight: "bold" }} />}
          onSelect={onSelect}
          treeData={dataListHistory}
        />
      </div>
      <div className="flex flex-col items-center w-6/12 space-y-4">
        <Card style={{ overflow: "hidden", borderRadius: "10px" }}>
          <div className="flex flex-row items-center">
            <p className="text-primary-blue font-bold font-mulish">Info KKPT</p>
            <Divider type="vertical" />
            <div className="font-mulish font-light">
              <p className="text-red-800 font-bold">Exemplar No : {infoKkptMerge.exemplar}</p>
              <p>
                [{infoKkptMerge.auditor.posisi}] {infoKkptMerge.auditor.pn} - {infoKkptMerge.auditor.nama}
              </p>
              <p>{infoKkptMerge.risk_issue.kode} - {infoKkptMerge.risk_issue.nama} </p>
              <p>{infoKkptMerge.sub_major.kode}</p>
              <p>{infoKkptMerge.sub_aktivitas}</p>
              <p>{infoKkptMerge.aktivitas}</p>
              <p>{infoKkptMerge.uker}</p>
            </div>
          </div>
        </Card>
        <div className="bg-gray-400 py-6 text-center h-72 w-4/6 my-6">Dokumen KKPT</div>
      </div>
    </div>
  );
};
