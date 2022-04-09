import { Button, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPoolSampleMonber } from "../../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleMonber/actions";
import {
  getDataPoolSampleMonber,
  getErrorPoolSampleMonber,
  getLoadingPoolSampleMonber,
} from "../../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleMonber/selections";
import { CreateContentSampleMonberModal } from "../CreateContentSampleMonberModal";

function TablePickSampleMonber({
  data,
  loading,
  error,
  fetchPoolSampleMonber,
  mcr_id,
}) {
  const [modalContentSample, setmodalContentSample] = useState({
    visible: false,
    pool_monber_id: "",
  });
  useEffect(() => fetchPoolSampleMonber(), [fetchPoolSampleMonber]);

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
            setmodalContentSample({ visible: true, pool_monber_id: record.id })
          }
        >
          Open
        </Button>
      ),
    },
  ];
  return (
    <>
      <CreateContentSampleMonberModal
        mcr_id={mcr_id}
        visible={modalContentSample.visible}
        pool_monber_id={modalContentSample.pool_monber_id}
        onCancel={() =>
          setmodalContentSample({ visible: false, pool_monber_id: "" })
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
}

const mapStateToProps = (state) => {
  return {
    data: getDataPoolSampleMonber(state),
    loading: getLoadingPoolSampleMonber(state),
    error: getErrorPoolSampleMonber(state),
  };
};

const mapDispatchToProps = {
  fetchPoolSampleMonber: fetchPoolSampleMonber,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TablePickSampleMonber);
