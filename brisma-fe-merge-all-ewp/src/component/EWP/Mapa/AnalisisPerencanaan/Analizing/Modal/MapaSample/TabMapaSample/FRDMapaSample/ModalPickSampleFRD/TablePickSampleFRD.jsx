import { Button, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPoolSampleFRD } from "../../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleFRD/actions";
import {
  getDataPoolSampleFRD,
  getErrorPoolSampleFRD,
  getLoadingPoolSampleFRD,
} from "../../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleFRD/selectors";
import { CreateContentSampleFRDModal } from "../CreateContentSampleFRDModal";

export const TablePickSampleFRD = ({
  data,
  loading,
  error,
  fetchPoolSampleFRD,
  mcr_id,
}) => {
  const [modalContentSample, setmodalContentSample] = useState({
    visible: false,
    pool_frd_id: "",
  });
  useEffect(() => fetchPoolSampleFRD(), [fetchPoolSampleFRD]);

  const column = [
    {
      title: "Nama Database",
      dataIndex: "database_name",
      key: "database_name",
    },
    {
      title: "Nama Tabel",
      dataIndex: "table_name",
      key: "table_name",
    },
    {
      title: "Bulan",
      key: "month",
      render: (_, record) =>
        moment()
          .month(record.month - 1)
          .format("MMM"),
    },
    {
      title: "Sub Aktivitas",
      dataIndex: "sub_aktivitas",
      key: "sub_aktivitas",
    },
    {
      title: "Aktivitas",
      dataIndex: "aktivitas",
      key: "aktivitas",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() =>
            setmodalContentSample({ visible: true, pool_frd_id: record.id })
          }
        >
          Open
        </Button>
      ),
    },
  ];
  return (
    <>
      <CreateContentSampleFRDModal
        mcr_id={mcr_id}
        visible={modalContentSample.visible}
        pool_frd_id={modalContentSample.pool_frd_id}
        onCancel={() =>
          setmodalContentSample({ visible: false, pool_frd_id: "" })
        }
      />
      <Table
        dataSource={!loading && !error ? data : []}
        columns={column}
        rowKey="id"
        loading={loading}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    data: getDataPoolSampleFRD(state),
    loading: getLoadingPoolSampleFRD(state),
    error: getErrorPoolSampleFRD(state),
  };
};

const mapDispatchToProps = {
  fetchPoolSampleFRD: fetchPoolSampleFRD,
};

export default connect(mapStateToProps, mapDispatchToProps)(TablePickSampleFRD);
