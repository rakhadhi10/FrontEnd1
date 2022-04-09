import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  fetchContentPoolSampleMonber,
  submitUpdateMapaSampleMonber,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleMonber/actions";
import {
  getContent,
  getErrorContentPoolSampleMonber,
  getErrorUpdateSampleMonber,
  getExisisting,
  getLoadingContentPoolSampleMonber,
  getLoadingUpdateSampleMonber,
  getPoolMBR,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleMonber/selections";
import { Button, message, Spin, Table } from "antd";

function ContentSampleMonberModal({
  content,
  existing,
  poolMBR,
  loading,
  error,
  submitError,
  submitLoading,
  fetchContentPoolSampleMonber,
  submitUpdateMapaSampleMonber,
  mcr_id,
  pool_monber_id,
}) {
  const [columns, setcolumns] = useState([]);
  const [selectedData, setselectedData] = useState([]);
  useEffect(
    () => fetchContentPoolSampleMonber(mcr_id, pool_monber_id),
    [fetchContentPoolSampleMonber, mcr_id, pool_monber_id]
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
    const failed = await submitUpdateMapaSampleMonber(mcr_id, selectedData);
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
      {!loading && poolMBR && columns.length !== 0 && (
        <div className="space-y-2">
          <div>
            <p>
              {poolMBR.database_name +
                " " +
                moment().month(poolMBR.month).format("MMM") +
                " " +
                poolMBR.year}
            </p>
          </div>
          <p>{poolMBR.aktivitas + "/" + poolMBR.sub_aktivitas}</p>
          <Table
            columns={columns}
            dataSource={content}
            rowKey={poolMBR.column_pk}
            loading={loading}
            scroll={{ x: 800 }}
            rowSelection={{
              defaultSelectedRowKeys: existing.map((item) => item.value),
              onSelect: (record, selected, rowSelected) => {
                let dataTemp = [];
                rowSelected.map((item) =>
                  dataTemp.push({
                    value: item[poolMBR.column_pk],
                    objek_sample_id: pool_monber_id,
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
}

const mapStateToProps = (state) => {
  return {
    content: getContent(state),
    poolMBR: getPoolMBR(state),
    existing: getExisisting(state),
    loading: getLoadingContentPoolSampleMonber(state),
    error: getErrorContentPoolSampleMonber(state),
    submitLoading: getLoadingUpdateSampleMonber(state),
    submitError: getErrorUpdateSampleMonber(state),
  };
};

const mapDispatchToProps = {
  fetchContentPoolSampleMonber: fetchContentPoolSampleMonber,
  submitUpdateMapaSampleMonber: submitUpdateMapaSampleMonber,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentSampleMonberModal);
