import { Divider, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";

export const MonberTab = ({ data = [], loading, onSelectData }) => {
  const [dataMonber, setdataMonber] = useState([]);

  useEffect(() => data.length !== 0 && setTableData(data), [data]);
  console.log(data);

  const setColumns = (keys) => {
    let dataTemp = [];
    dataTemp.push({
      title: "Auditor",
      key: "auditor",
      width: 150,
      render: (_, record) => record.pn_auditor + " - " + record.name_auditor,
    });
    keys.map((value) => {
      dataTemp.push({
        title: value,
        dataIndex: value,
        key: value,
        width: 150,
      });
    });
    return dataTemp;
  };

  const remapDataSource = (values = []) => {
    let dataTemp = [];
    values.map((item) =>
      dataTemp.push({
        key: item.id,
        pn_auditor: item.pn_auditor,
        name_auditor: item.name_auditor,
        filename: item.file_name,
        ...item.content[0],
      })
    );
    return dataTemp;
  };

  const setTableData = (value = []) => {
    let dataTemp = [];
    if (value.lenght !== 0) {
      value.map((item, index) => {
        const contentColumn = setColumns(Object.keys(item.data[0].content[0]));
        console.log(contentColumn);
        dataTemp.push({
          key: index,
          filename: item.title,
          columns: contentColumn,
          dataSource: remapDataSource(item.data),
        });
      });
    }
    console.log(dataTemp);
    setdataMonber(dataTemp);
  };
  return (
    <div className="space-y-4 overflow-y-scroll h-96">
      <Spin spinning={loading}>
        {dataMonber.length !== 0 &&
          dataMonber.map((item) => (
            <>
              <p>{item.filename}</p>
              <Table
                dataSource={item.dataSource}
                columns={item.columns}
                rowSelection={{
                  onSelect: (record, selected) => {
                    if (selected) {
                      onSelectData(record.key);
                    }
                  },
                }}
                size="small"
              />
              <Divider />
            </>
          ))}
      </Spin>
    </div>
  );
};
