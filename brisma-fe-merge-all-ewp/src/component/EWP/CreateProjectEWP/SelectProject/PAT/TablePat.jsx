import { CheckOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Popover, Table } from "antd";
import React from "react";
import { connect } from "react-redux";
import { setJadwalAudit } from "../../../../../store/ducks/EWP/CreateEWP/actions";
import {
  getListJadwalAudit,
  getLoadingPat,
} from "../../../../../store/ducks/EWP/CreateEWP/selectors";

export const TablePat = ({ data, loading, setJadwalAudit }) => {
  const popoverContent = (content) => {
    return (
      <div className="space-y-3">
        {content.ma && (
          <div className="flex items-center space-x-1">
            <Avatar
              style={{
                backgroundColor: "#C9EEFA",
              }}
              icon={<UserOutlined />}
            />
            <p className="text-primary-blue">{content.ma.nama}</p>
          </div>
        )}
        {content.kta && (
          <div className="flex space-x-1 items-center">
            <Avatar
              style={{
                backgroundColor: "#FAD6D8",
              }}
              icon={<UserOutlined />}
            />
            <p className="text-primary-red">{content.kta.nama}</p>
          </div>
        )}
        {content.ata &&
          content.ata.map((item) => (
            <div className="flex space-x-1 items-center">
              <Avatar
                style={{
                  backgroundColor: "#E0FAD6",
                }}
                icon={<UserOutlined />}
              />
              <p className="text-primary-green">{item.nama_ata}</p>
            </div>
          ))}
      </div>
    );
  };

  const columns = [
    {
      title: "Nama Project",
      dataIndex: "name_kegiatan_audit",
      key: "name_kegiatan_audit",
    },
    {
      title: "Tipe",
      dataIndex: "type_audit_name",
      key: "type_audit_name",
    },
    {
      title: "Nama Tim",
      key: "nama_tim",
      render: (_, record) =>
        record.tim_audit && (
          <Popover content={() => popoverContent(record.tim_audit)}>
            <p className="text-primary-blue cursor-pointer underline">
              {record.tim_audit.nama_tim}
            </p>
          </Popover>
        ),
    },
    {
      title: "Audited",
      key: "audited",
      render: (_, record) =>
        record.audited ? (
          <CheckOutlined
            className="text-primary-green"
            style={{ fontSize: 25 }}
          />
        ) : (
          <CloseOutlined
            className="text-primary-red"
            style={{ fontSize: 25 }}
          />
        ),
    },
    Table.SELECTION_COLUMN,
  ];

  const rowSelection = {
    type: "radio",
    columnTitle: "Select",
    onChange: (_, selectedRows) => {
      setJadwalAudit(selectedRows[0]);
    },
    getCheckboxProps: (record) => ({ disabled: record.audited }),
  };

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="id"
      rowSelection={rowSelection}
      loading={loading}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    data: getListJadwalAudit(state),
    loading: getLoadingPat(state),
  };
};

const mapDispatchToProps = {
  setJadwalAudit: setJadwalAudit,
};

export default connect(mapStateToProps, mapDispatchToProps)(TablePat);
