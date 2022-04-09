import {
  Button,
  Collapse,
  Empty,
  message,
  Table,
  Modal,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchContentPoolSampleCSV,
  submitUpdateMapaSampleCSV,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleCSV/actions";
import {
  getDataContentPoolSampleCSV,
  getErrorContentPoolSampleCSV,
  getErrorUpdateSampleCSV,
  getLoadingContentPoolSampleCSV,
  getLoadingUpdateSampleCSV,
} from "../../../../../../../../../store/ducks/EWP/Mapa/MapaSampleCSV/selectors";

function DetailPickSampleCSVModal({
  visible,
  onCancel,
  data,
  loading,
  error,
  loadingSubmit,
  errorSubmit,
  fetchContentPoolSampleCSV,
  submitUpdateMapaSampleCSV,
  mcr_id,
  csv_pool_id,
}) {
  const [columns1, setcolumns1] = useState();
  const [selectedDatas, setselectedDatas] = useState();
  const [firstSelected, setfirstSelected] = useState();
  const [dataCSV, setdataCSV] = useState();

  const makeColumns1 = () => {
    if (dataCSV) {
      let dataTemp = [];
      const existing = dataCSV.existingSample;
      existing.map((item) =>
        dataTemp.push({
          value: item.value,
          objek_sample_id: csv_pool_id,
          pn_auditor: null,
          name_auditor: null,
        })
      );
      console.log(dataTemp);
      setfirstSelected(dataTemp);
      const column = Object.keys(dataCSV.csvContent[0]);
      let newColumns = [];
      column.map((value, index) =>
        newColumns.push({
          title: value,
          key: index,
          dataIndex: value,
          width: 150,
        })
      );
      console.log(newColumns);
      setcolumns1(newColumns);
    } else {
      console.log("belum");
    }
  };

  useEffect(() => {
    const body = [{ pool_sample_id: csv_pool_id }];
    fetchContentPoolSampleCSV(mcr_id, body);
  }, [fetchContentPoolSampleCSV, mcr_id, csv_pool_id]);
  console.log(data.csvContent);

  useEffect(() => {
    setdataCSV(data[0]);
    makeColumns1();
  }, [data]);

  const onSave = async () => {
    const body = selectedDatas ? selectedDatas : firstSelected;
    const failed = await submitUpdateMapaSampleCSV(mcr_id, body);
    if (!failed) {
      message.success("Data Berhasil disimpan!");
    } else {
      message.error(errorSubmit);
    }
  };

  const columns2 = [
    {
      key: 1,
      title: "Pengguna",
      render: (record) =>
        record.pn_auditor == null
          ? " - "
          : record.pn_auditor + " - " + record.name_auditor,
    },
    {
      title: "Risk Issue",
      key: 3,
      render: (record) => record.ref_pool_sample_csv.original_risk_issue_kode,
    },
    {
      title: "Sub Aktivitas",
      key: 4,
      render: (record) =>
        record.ref_pool_sample_csv.original_sub_aktivitas_nama,
    },
    {
      title: "Aktivitas",
      key: 5,
      render: (record) => record.ref_pool_sample_csv.original_aktivitas_nama,
    },
  ];

  return (
    <>
      <Modal
        visible={visible}
        destroyOnClose
        centered
        width={1000}
        maskClosable={false}
        footer={null}
        onCancel={onCancel}
        title={[
          <Typography.Title level={2} className="text-left">
            <span className={"text-gray-700"}>Pick Sample</span>
          </Typography.Title>,
        ]}
      >
        {!columns1 && !dataCSV && <Empty />}
        {error && message.error(error)}
        {columns1 && dataCSV && (
          <div className="space-y-4">
            <div className="space-y-2">
              <p>{dataCSV.csvPool.filename}</p>
              <p>{dataCSV.csvPool.name_auditor}</p>
              <Table
                columns={columns1}
                dataSource={dataCSV ? dataCSV.csvContent : []}
                loading={loading}
                scroll={{ x: 800, y: 500 }}
                rowSelection={{
                  defaultSelectedRowKeys: firstSelected.map(
                    (item) => item.value
                  ),
                  onSelect: (record, selected, selectedRows) => {
                    let dataTemp = [];
                    selectedRows.map((item) =>
                      dataTemp.push({
                        value: item[dataCSV.csvPool.uniq_column],
                        objek_sample_id: csv_pool_id,
                        pn_auditor: null,
                        name_auditor: null,
                      })
                    );
                    setselectedDatas(dataTemp);
                  },
                }}
                rowKey={dataCSV.csvPool.uniq_column}
              />
              <div className="flex justify-end">
                <Button type="primary" onClick={onSave} loading={loadingSubmit}>
                  Save
                </Button>
              </div>
            </div>
            <Collapse defaultActiveKey={1}>
              <Collapse.Panel key={1} header="Histori">
                <Table
                  dataSource={dataCSV ? dataCSV.history : []}
                  columns={columns2}
                  loading={loading}
                  scroll={{ x: 800, y: 500 }}
                />
              </Collapse.Panel>
            </Collapse>
          </div>
        )}
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    data: getDataContentPoolSampleCSV(state),
    loading: getLoadingContentPoolSampleCSV(state),
    error: getErrorContentPoolSampleCSV(state),
    loadingSubmit: getLoadingUpdateSampleCSV(state),
    errorSubmit: getErrorUpdateSampleCSV(state),
  };
};

const mapDispatchToProps = {
  fetchContentPoolSampleCSV: fetchContentPoolSampleCSV,
  submitUpdateMapaSampleCSV: submitUpdateMapaSampleCSV,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPickSampleCSVModal);
