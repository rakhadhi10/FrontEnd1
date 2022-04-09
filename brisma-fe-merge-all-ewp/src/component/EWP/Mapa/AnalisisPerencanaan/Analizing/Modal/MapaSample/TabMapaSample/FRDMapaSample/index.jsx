import { EditOutlined } from "@ant-design/icons";
import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchMapaSampleFRD,
  removeMapaSampleFRD,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleFRD/actions";
import {
  getDataMapaSampleFRD,
  getErrorDeleteMapaSampleFRD,
  getErrorMapaSampleFRD,
  getLoadingDeleteMapaSampleFRD,
  getLoadingMapaSampleFRD,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleFRD/selectors";
import { CreateContentSampleFRDModal } from "./CreateContentSampleFRDModal";
import { CreateModalPickSampleFRD } from "./CreateModalPickSampleFRD";

export const FRDMapaSample = ({
  data,
  loading,
  error,
  deleteError,
  deleteLoading,
  fetchMapaSampleFRD,
  removeMapaSampleFRD,
  mcr_id,
}) => {
  const [selectedData, setselectedData] = useState([]);
  const [modalPickSample, setmodalPickSample] = useState(false);
  const [modalEditSample, setmodalEditSample] = useState({
    visible: false,
    pool_sample_id: "",
  });

  useEffect(() => fetchMapaSampleFRD(mcr_id), [fetchMapaSampleFRD, mcr_id]);

  const onDeleteSelected = async () => {
    const failed = await removeMapaSampleFRD(mcr_id, selectedData);
    if (!failed) {
      message.success("Berhasil menghapus data");
    } else {
      message.error("gagal menghapus data: " + deleteError);
    }
  };

  const columns = [
    {
      title: "Nama Tabel FRD",
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
      <CreateModalPickSampleFRD
        mcr_id={mcr_id}
        visible={modalPickSample}
        onCancel={() => {
          setmodalPickSample(false);
          fetchMapaSampleFRD(mcr_id);
        }}
      />
      <CreateContentSampleFRDModal
        visible={modalEditSample.visible}
        mcr_id={mcr_id}
        pool_frd_id={modalEditSample.pool_sample_id}
        onCancel={() => {
          setmodalEditSample({ visible: false, pool_sample_id: "" });
          fetchMapaSampleFRD(mcr_id);
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
};

const mapStateToProps = (state) => {
  return {
    data: getDataMapaSampleFRD(state),
    loading: getLoadingMapaSampleFRD(state),
    error: getErrorMapaSampleFRD(state),
    deleteLoading: getLoadingDeleteMapaSampleFRD(state),
    deleteError: getErrorDeleteMapaSampleFRD(state),
  };
};

const mapDispatchToProps = {
  fetchMapaSampleFRD: fetchMapaSampleFRD,
  removeMapaSampleFRD: removeMapaSampleFRD,
};

export default connect(mapStateToProps, mapDispatchToProps)(FRDMapaSample);
