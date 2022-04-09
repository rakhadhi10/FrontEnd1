import { Button } from "antd";
import React, {
  useState, useEffect
} from "react";
import { TableTransfer } from "./TableTransfer";


export const MergeKKPTTab = ({ dataList, handleMerge, messageMerge }) => {
  const [dataKKPT, setdataKKPT] = useState([
    {
      key: 1,
      judulKKPT: "Judul KKPT 1"
    },
    {
      key: 2,
      judulKKPT: "Judul KKPT 2"
    },
  ]);
  const [targetKeys, settargetKeys] = useState([]);

  const onChange = (nextTargetKeys) => {
    // alert(JSON.stringify(nextTargetKeys))
    settargetKeys(nextTargetKeys);
  };

  const onMerge = () => {
    handleMerge(targetKeys)
    settargetKeys([])
  }



  return (
    <div>
      <div className="bg-white px-4 py-4 mb-10 border border-primary-blue">
        <div className="grid grid-cols-2 text-gray-700 font-mulish text-lg text-center my-6">
          <p>List KKPT</p>
          <p>List KKPT Merge</p>
        </div>
        <TableTransfer dataSource={dataList} targetKeys={targetKeys} onChange={onChange} />
      </div>
      <div className="flex justify-end mb-20">
        <Button onClick={onMerge} type="primary">Merge</Button>
        {messageMerge}
      </div>
    </div>
  );
};



