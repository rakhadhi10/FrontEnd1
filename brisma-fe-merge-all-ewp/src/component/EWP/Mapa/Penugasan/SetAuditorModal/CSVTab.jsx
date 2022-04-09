import { Divider, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";

export const CSVTab = ({ data = [], loading, onSelectData }) => {
  const [dataCSV, setdataCSV] = useState();

  useEffect(() => data.length !== 0 && setTableData(data), [data]);
  useEffect(() => {
    setdataCSV();
    return () => {
      console.log("unmount");
    };
  }, []);

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
        ...item.content,
      })
    );
    return dataTemp;
  };

  const setTableData = () => {
    let dataTemp = [];
    if (data.lenght !== 0) {
      data.map((item, index) => {
        const contentColumn = setColumns(Object.keys(item.data[0].content));
        dataTemp.push({
          key: index,
          filename: item.title,
          columns: contentColumn,
          dataSource: remapDataSource(item.data),
        });
      });
    }

    setdataCSV(dataTemp);
  };

  return (
    <div className="space-y-4 overflow-y-scroll h-96">
      <Spin spinning={loading}>
        {dataCSV &&
          dataCSV.map((item) => (
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
