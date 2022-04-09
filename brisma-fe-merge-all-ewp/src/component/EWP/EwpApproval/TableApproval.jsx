import React, { useState } from "react";
import { Table } from "antd";
import { ImportOutlined } from "@ant-design/icons";
import { ApprovalAction } from "./ApprovalAction";
import { fetchApprovalDetailEwp } from "../../../store/ducks/EWP/ApprovalDetail/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  getError,
  getLoading,
  getApprovalDetail,
} from "../../../store/ducks/EWP/ApprovalDetail/selectors";
const initialColumns = [
  {
    title: "New Approval",
    children: [
      {
        title: "Project EWP ID",
        dataIndex: "id",
        defaultSortOrder: "descend",
      },
      {
        title: "Nama Project",
        dataIndex: "nama_project",
        defaultSortOrder: "descend",
      },
    ],
  },
  {
    title: "Information Approval",
    children: [
      {
        title: "Tahun Project",
        dataIndex: "tahun_project",
        defaultSortOrder: "descend",
      },
      {
        title: "Tipe Approval",
        dataIndex: "tipe_approval_name",
        defaultSortOrder: "descend",
      },
      {
        title: "Deskripsi",
        dataIndex: "deskripsi",
        defaultSortOrder: "descend",
      },
    ],
  },
];

function TableApproval({
  type,
  data,
  dataDetail,
  loading,
  error,
  fetchApprovalDetailEwp,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const renderColumns = (types) => {
    switch (types) {
      case "incoming":
        const actionChild = initialColumns[1].children.concat({
          title: "Action",
          dataIndex: "",
          render: (item) => (
            <>
              <button
                onClick={async () => {
                  const success = await fetchApprovalDetailEwp(item.id);
                  if (success) {
                    console.log(dataDetail);
                    setModalVisible(true);
                  }
                }}
                type="button"
                className="w-full py-3 focus:ring-offset-primary-blue focus:ring rounded-md focus:outline-none transform rotate-180 flex justify-center text-lg"
              >
                <ImportOutlined />
              </button>
            </>
          ),
        });
        return [
          initialColumns[0],
          {
            ...initialColumns[1],
            children: actionChild,
          },
        ];
      case "history":
        const statusChild = initialColumns[1].children.concat({
          title: "Status",
          dataIndex: "tipe_approval_kode",
          render: (el) => <p className="capitalize">{el}</p>,
        });
        return [
          initialColumns[0],
          {
            ...initialColumns[1],
            children: statusChild,
          },
        ];
      default:
        return initialColumns;
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <>
      <ApprovalAction
        visible={modalVisible}
        handleOnCancel={() => setModalVisible(false)}
      />
      <div className="flex justify-between">
        <p className="text-lg font-bold mb-3">
          {type === "incoming" ? "New Approval" : "History"}
        </p>
      </div>
      <div className="bg-white px-8 py-6">
        <div className="px-2 py-3 rounded-md border border-primary-blue">
          <Table
            columns={renderColumns(type)}
            dataSource={data}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state),
    error: getError(state),
    dataDetail: getApprovalDetail(state),
  };
};

const mapDispachToProps = {
  fetchApprovalDetailEwp: fetchApprovalDetailEwp,
};

export default compose(connect(mapStateToProps, mapDispachToProps))(
  TableApproval
);
