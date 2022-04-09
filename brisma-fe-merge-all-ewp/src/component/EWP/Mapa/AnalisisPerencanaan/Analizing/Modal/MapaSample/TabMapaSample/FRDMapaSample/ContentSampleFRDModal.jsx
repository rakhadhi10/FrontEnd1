import { Button, message, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  fetchContentPoolSampleFRD,
  submitUpdateMapaSampleFRD,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleFRD/actions";
import {
  getContent,
  getErrorContentPoolSampleFRD,
  getErrorUpdateSampleFRD,
  getExisisting,
  getLoadingContentPoolSampleFRD,
  getLoadingUpdateSampleFRD,
  getPoolFRD,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleFRD/selectors";

export const ContentSampleFRDModal = ({
  content,
  poolFRD,
  existing,
  loading,
  error,
  submitError,
  submitLoading,
  fetchContentPoolSampleFRD,
  submitUpdateMapaSampleFRD,
  mcr_id,
  pool_frd_id,
}) => {
  const [columns, setcolumns] = useState([]);
  const [selectedData, setselectedData] = useState([]);
  useEffect(
    () => fetchContentPoolSampleFRD(mcr_id, pool_frd_id),
    [fetchContentPoolSampleFRD, mcr_id, pool_frd_id]
  );

  useEffect(
    () => content.length !== 0 && makeColumns(Object.keys(content[0])),
    [content]
  );

  const makeColumns = (keys) => {
    let newColumns = [];
    keys.map((item, inx) =>
      newColumns.push({ title: item, dataIndex: item, key: inx, width: 150 })
    );
    setcolumns(newColumns);
  };

  const onSave = async () => {
    const failed = await submitUpdateMapaSampleFRD(mcr_id, selectedData);
    if (!failed) {
      message.success("Data Berhasil disimpan");
    } else {
      message.error("Data Gagal Disimpan. " + failed);
    }
  };

  return (
    <div className="space-y-4">
      {error && message.error(error)}
      {loading && (
        <div className="flex justify-center h-96 items-center">
          <Spin size="large" />{" "}
        </div>
      )}
      {!loading && poolFRD && columns.length !== 0 && (
        <div className="space-y-2">
          <div>
            <p>
              {poolFRD.database_name +
                " " +
                moment().month(poolFRD.month).format("MMM") +
                " " +
                poolFRD.year}
            </p>
          </div>
          <p>{poolFRD.aktivitas + "/" + poolFRD.sub_aktivitas}</p>
          <Table
            columns={columns}
            dataSource={content}
            rowKey={poolFRD.column_pk}
            loading={loading}
            scroll={{ x: 800 }}
            rowSelection={{
              defaultSelectedRowKeys: existing.map((item) => item.value),
              onSelect: (record, selected, rowSelected) => {
                let dataTemp = [];
                rowSelected.map((item) =>
                  dataTemp.push({
                    value: item[poolFRD.column_pk],
                    objek_sample_id: pool_frd_id,
                    pn_auditor: null,
                    name_auditor: null,
                  })
                );
                setselectedData(dataTemp);
              },
            }}
          />
        </div>
      )}
      <div className="flex justify-end">
        <Button type="primary" onClick={onSave} loading={submitLoading}>
          Save
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    content: getContent(state),
    poolFRD: getPoolFRD(state),
    existing: getExisisting(state),
    loading: getLoadingContentPoolSampleFRD(state),
    error: getErrorContentPoolSampleFRD(state),
    submitLoading: getLoadingUpdateSampleFRD(state),
    submitError: getErrorUpdateSampleFRD(state),
  };
};

const mapDispatchToProps = {
  fetchContentPoolSampleFRD: fetchContentPoolSampleFRD,
  submitUpdateMapaSampleFRD: submitUpdateMapaSampleFRD,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentSampleFRDModal);
