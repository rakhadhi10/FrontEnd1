import { Button, message, Table, Typography } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteSubAktivitas,
  fetchAktivitas,
  fetchSubAktivitas,
  postAnalisisPerencanaan,
} from "../../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/actions";
import {
  getDataAktivitas,
  getDataSubAktivitas,
  getErrorSubAktivitas,
  getLoadingAktivitas,
  getLoadingSubAktivitas,
  getSubmitError,
  getSubmitLoading,
  getDeleteError,
  getDeleteLoading,
} from "../../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/selectors";
import {
  remapFetchAktivitas,
  remapSetPIC,
  remapSubAktivitas,
} from "../../../../../../component/utils/mapData";
import {
  createErrorNotification,
  createSuccessNotification,
} from "../../../../../utils/notifications";
import { getCurrentTimAudit } from "../../../../../../store/ducks/EWP/CreateEWP/selectors";
import SelectAuditor from "../../../../common/SelectAuditor";

const showSuccessNotif = createSuccessNotification(
  "PIC Analisators",
  "Berhasil menyimpan PIC Analisators"
);
const showErrorNotif = createErrorNotification(
  "PIC Analisators",
  "Gagal menyimpan PIC Analisators"
);

function SetAuditorModal({
  postAnalisisPerencanaan,
  submitLoading,
  submitError,
  uker_id,
  fetchAktivitas,
  dataAktivitas,
  loadingAktivitas,
  errorAktivitas,
  dataSubAktivitas,
  loadingSubAktivitas,
  errorSubAktivitas,
  fetchSubAktivitas,
  deleteError,
  deleteLoading,
  deleteSubAktivitas,
  uker,
  timAudit,
}) {
  const { project_id } = useParams();
  const [treeData, settreeData] = useState([]);
  const [picTemp, setPicTemp] = useState("");
  const [listPic, setListPic] = useState([]);

  useEffect(
    () => fetchAktivitas(project_id, uker_id),
    [fetchAktivitas, project_id, uker_id]
  );
  useEffect(
    () => settreeData(remapFetchAktivitas(dataAktivitas)),
    [dataAktivitas]
  );
  console.log(timAudit);
  const columns = [
    {
      title: "Aktivitas",
      dataIndex: "aktivitas",
      key: "aktivitas",
    },
    {
      title: "Auditor",
      dataIndex: "auditor",
      key: "auditor",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {},
    onSelect: (record, selected, selectedRows) => {
      setListPic(selectedRows);
      console.log(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {},
  };

  const setsubAktibitas = () => {
    if (listPic.length > 1) {
      message.error(
        "Anda tidak dapat melakukan breakdown lebih dari 1 aktivitas!"
      );
    } else {
      listPic.map((item) => {
        if (!item.mtd_aktivitas_kode) {
          message.error(
            "Anda tidak dapat melakukan breakdown pada Sub Aktivitas"
          );
        } else {
          fetchSubAktivitas(project_id, item.id);
        }
      });
    }
  };

  const effectsubAktivitas = (data) => {
    if (data.length !== 0) {
      listPic.map((item) => {
        const index = treeData.findIndex((e) => e.id === item.id);
        let newData = [...treeData];
        console.log(index);
        if (index > -1) {
          newData[index]["children"] = remapSubAktivitas(data);
        }
        settreeData(newData);
      });
    }
  };

  useEffect(() => effectsubAktivitas(dataSubAktivitas), [dataSubAktivitas]);

  const onMarkupSubAktivitas = () => {
    listPic.map((item) => {
      deleteSubAktivitas(item.id);
      const { ["children"]: tmp, ...rest } = item;
      const prevData = treeData.filter((e) => e.id !== item.id);
      settreeData([...prevData, rest]);
    });
  };

  const setPic = () => {
    for (let i = 0; i < listPic.length; i++) {
      setListPic((item) => [
        ...item,
        (item[i].auditor = picTemp["pn"] + " - " + picTemp["nama"]),
        (item[i].pn_pic_analisa = picTemp["pn"]),
        (item[i].name_pic_analisa = picTemp["nama"]),
      ]);
    }
  };

  const onSave = async () => {
    try {
      const success = await postAnalisisPerencanaan(
        project_id,
        remapSetPIC(treeData, uker_id)
      );
      if (success) {
        showSuccessNotif();
      } else {
        showErrorNotif();
        console.log(submitError);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    setPicTemp({ pn: e.key, nama: e.value });
  };

  return (
    <>
      <div>
        <Typography.Title level={4}>{uker}</Typography.Title>
      </div>
      <div>
        <Typography.Title type="secondary" level={4}>
          Set Auditor
        </Typography.Title>
      </div>
      <div className="items-center border-2 rounded-md border-blue-300 mb-5 bg-white">
        <div className="flex flex-row gap-3 p-8">
          <div className="">
            <Typography.Title level={4}>Auditor</Typography.Title>
          </div>
          <div className="w-full">
            <SelectAuditor onChange={handleOnChange} />
          </div>
          <div>
            <Button type="primary" onClick={setPic}>
              Set
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-4 pb-1">
        <Button type="text" onClick={setsubAktibitas}>
          + Breakdown
        </Button>
        <Button type="text" onClick={onMarkupSubAktivitas}>
          - Markup
        </Button>
      </div>
      <div className="items-center border-2 rounded-md border-blue-300 mb-5 bg-white">
        <div className="h-96 px-16">
          {!loadingAktivitas && errorAktivitas && (
            <p className="text-red-500">{errorAktivitas}</p>
          )}
          <Table
            columns={columns}
            dataSource={treeData}
            pagination={false}
            rowSelection={{
              ...rowSelection,
              checkStrictly: true,
              type: "checkbox",
            }}
            scroll={{ y: 310 }}
            loading={loadingAktivitas || loadingSubAktivitas || deleteLoading}
          />
        </div>
      </div>
      <div className="mb-5 text-right">
        <Button
          size="large"
          type="primary"
          onClick={onSave}
          loading={submitLoading}
        >
          Save
        </Button>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    submitLoading: getSubmitLoading(state),
    submitError: getSubmitError(state),
    dataAktivitas: getDataAktivitas(state),
    loadingAktivitas: getLoadingAktivitas(state),
    errorAktivitas: getErrorSubAktivitas(state),
    dataSubAktivitas: getDataSubAktivitas(state),
    loadingSubAktivitas: getLoadingSubAktivitas(state),
    errorSubAktivitas: getErrorSubAktivitas(state),
    deleteError: getDeleteError(state),
    deleteLoading: getDeleteLoading(state),
    timAudit: getCurrentTimAudit(state),
  };
};

const mapDispachToProps = {
  postAnalisisPerencanaan: postAnalisisPerencanaan,
  fetchAktivitas: fetchAktivitas,
  fetchSubAktivitas: fetchSubAktivitas,
  deleteSubAktivitas: deleteSubAktivitas,
};

export default connect(mapStateToProps, mapDispachToProps)(SetAuditorModal);
