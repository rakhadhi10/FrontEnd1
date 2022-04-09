import { Table } from "antd";
import React, { useEffect, useState } from "react";

export const EditTableSampleCSV = ({ data, onChange }) => {
  const [columns, setcolumns] = useState();
  const makeColumns = (column) => {
    let newColumns = [];
    column.map((value, index) =>
      newColumns.push({ title: value, key: index, dataIndex: value, width: 150 })
    );
    setcolumns(newColumns);
  };

  useEffect(() => makeColumns(Object.keys(data.csvContent[0])), [data]);

  return (
    <div className="space-y-2">
      <div className="flex space-x-3">
        <p>{data.csvPool.filename}</p>
        <p>{data.csvPool.name_auditor}</p>
      </div>
      {columns && (
        <Table
          dataSource={data.csvContent}
          rowKey={data.csvPool.uniq_column}
          columns={columns}
          rowSelection={{
            defaultSelectedRowKeys: data.existingSample.map((item) => item.value),
            onSelect: (record, selected, selectedRows) => {
              let dataTemp = [];
              selectedRows.map((item) =>
                dataTemp.push({
                  value: item[data.csvPool.uniq_column],
                  objek_sample_id: data.csvPool.id,
                  pn_auditor: data.csvPool.pn_auditor ? data.csvPool.pn_auditor : null,
                  name_auditor: data.csvPool.name_auditor ? data.csvPool.name_auditor : null,
                })
              );
              onChange(dataTemp);
            },
          }}
        />
      )}
    </div>
  );
};
