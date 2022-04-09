import { EditOutlined } from "@ant-design/icons";
import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchMapaSampleMonber,
  removeMapaSampleMonber,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleMonber/actions";
import {
  getDataMapaSampleMonber,
  getErrorDeleteMapaSampleMonber,
  getErrorMapaSampleMonber,
  getLoadingDeleteMapaSampleMonber,
  getLoadingMapaSampleMonber,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleMonber/selections";
import { CreateContentSampleMonberModal } from "./CreateContentSampleMonberModal";
import { CreateModalPickSampleMonber } from "./CreateModalPickSampleMonber";

function MonberMapaSample({
  data,
  loading,
  error,
  fetchMapaSampleMonber,
  deleteError,
  deleteLoading,
  removeMapaSampleMonber,
  mcr_id,
}) {
  const [selectedData, setselectedData] = useState([]);
  const [modalPickSample, setmodalPickSample] = useState(false);
  const [modalEditSample, setmodalEditSample] = useState({
    visible: false,
    pool_sample_id: "",
  });

  useEffect(
    () => fetchMapaSampleMonber(mcr_id),
    [fetchMapaSampleMonber, mcr_id]
  );

  const onDeleteSelected = async () => {
    const failed = await removeMapaSampleMonber(mcr_id, selectedData);
    if (!failed) {
      message.success("Berhasil menghapus data");
    } else {
      message.error("gagal menghapus data: " + deleteError);
    }
  };

  const columns = [
    {
      title: "Nama Tabel Monber",
      dataIndex: "nama_tabel",
      key: "nama_tabel",
    },
    {
      title: "Bulan/Tahun",
      dataIndex: "monthYear",
      key: "monthYear",
    },
    {
      title: "Jumlah Baris",
      dataIndex: "jumlah_baris",
      key: "jumlah_baris",
    },
    {
      title: "Jumlah Sample",
      dataIndex: "jumlah_sample",
      key: "jumlah_sample",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          type="text"
          onClick={() =>
            setmodalEditSample({
              visible: true,
              pool_sample_id: record.id,
            })
          }
        />
      ),
    },
    Table.SELECTION_COLUMN,
  ];

  return (
    <div className="space-y-3">
      <CreateModalPickSampleMonber
        mcr_id={mcr_id}
        visible={modalPickSample}
        onCancel={() => {
          setmodalPickSample(false);
          fetchMapaSampleMonber(mcr_id);
        }}
      />
      <CreateContentSampleMonberModal
        visible={modalEditSample.visible}
        mcr_id={mcr_id}
        pool_monber_id={modalEditSample.pool_sample_id}
        onCancel={() => {
          setmodalEditSample({ visible: false, pool_sample_id: "" });
          fetchMapaSampleMonber(mcr_id);
        }}
      />
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={loading}
        rowSelection={{
          hideSelectAll: true,
          onSelect: (record, selected, selectedRows) => {
            const dataTemp = [];
            selectedRows.map((item) =>
              dataTemp.push({ objek_sample_id: item.id })
            );
            setselectedData(dataTemp);
          },
        }}
      />
      <div className="flex justify-between">
        <Button type="primary" onClick={() => setmodalPickSample(true)}>
          Pick Sample
        </Button>
        <Button
          type="primary"
          danger
          loading={deleteLoading}
          onClick={onDeleteSelected}
        >
          Delete Selected
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: getDataMapaSampleMonber(state),
    loading: getLoadingMapaSampleMonber(state),
    error: getErrorMapaSampleMonber(state),
    deleteLoading: getLoadingDeleteMapaSampleMonber(state),
    deleteError: getErrorDeleteMapaSampleMonber(state),
  };
};

const mapDispatchToProps = {
  fetchMapaSampleMonber: fetchMapaSampleMonber,
  removeMapaSampleMonber: removeMapaSampleMonber,
};

export default connect(mapStateToProps, mapDispatchToProps)(MonberMapaSample);
