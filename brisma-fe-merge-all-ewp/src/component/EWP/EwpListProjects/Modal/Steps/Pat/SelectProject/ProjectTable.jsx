import React, { useState } from "react";
import PropTypes from "prop-types";
import { Table, Typography, Radio, Popover } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Team from "./Team";

const { Column } = Table;

const mockTeam = {
  ma: "Suranto",
  kta: "Robert Pittersburg",
  ata: ["Simon Guteres", "Messi", "C. Ronaldo"],
};

export default function ProjectTable({ data, onChangeTable }) {
  const [dataRowCek, setDataRowCek] = useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {},
    onSelect: (record, selected, selectedRows) => {
      onChangeTable(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {},
  };

  return (
    <Table
      dataSource={data}
      pagination={false}
      size="small"
      tableLayout="auto"
      scroll={{ y: 300 }}
      rowSelection={{
        ...rowSelection,
        checkStrictly: true,
        type: "radio",
      }}
    >
      <Column
        title="Nama Project"
        dataIndex="nama_project"
        key="nama_project"
        render={(text, record) => <Typography.Text>{text}</Typography.Text>}
      />
      <Column
        title="Tipe"
        dataIndex="tipe"
        key="tipe"
        align="center"
        render={(text, record) => text}
      />
      <Column
        title="Tim"
        dataIndex="tim"
        key="tim"
        align="center"
        render={(text, record) => (
          <Popover content={<Team {...mockTeam} />}>
            <span className="border-b border-primary-blue text-primary-blue cursor-pointer">
              {text}
            </span>
          </Popover>
        )}
      />
      <Column
        title="Audited"
        dataIndex="audited"
        key="audited"
        align="center"
        render={(isAudited, record) =>
          isAudited !== "On Progress" ? (
            <CheckOutlined
              className="text-primary-green"
              style={{ fontSize: 25 }}
            />
          ) : (
            <CloseOutlined
              className="text-primary-red"
              style={{ fontSize: 25 }}
            />
          )
        }
      />
    </Table>
  );
}

ProjectTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      existing: PropTypes.number,
      audit: PropTypes.number,
      percent: PropTypes.number,
    })
  ),
};

ProjectTable.defaultProps = {
  data: [],
};
