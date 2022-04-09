import { Button, Typography } from "antd";
import React, { useState } from "react";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { EWPLayout } from "../../../../layouts/EwpLayout";
import { Link, useParams } from "react-router-dom";
import { TableJadwalAudit } from "../../../../component/EWP/Mapa/JadwalAudit/TableJadwalAudit";
import {
  getData,
  getError,
  getLoading,
  getSubmitError,
  getSubmitLoading,
} from "../../../../store/ducks/EWP/Mapa/JadwalAudit/selectors";
import { compose } from "redux";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";
import { pat_content } from "../../../routes/allowedRoles";
import { connect } from "react-redux";
import {
  fetchJadwalAudit,
  submitJadwalAudit,
} from "../../../../store/ducks/EWP/Mapa/JadwalAudit/actions";
import { useEffect } from "react";
import {
  createErrorNotification,
  createSuccessNotification,
} from "../../../../component/utils/notifications";
import moment from "moment";
import { getUserPN } from "../../../../store/ducks/auth/selectors";

const showSuccessNotif = createSuccessNotification(
  "Jadwal Audit",
  "Berhasil menyimpan Jadwal Audit"
);
const showErrorNotif = (error) =>
  createErrorNotification(
    "Jadwal Audit",
    "Gagal menyimpan Jadwal Audit || ERROR : " + error
  );

function MapaJadwalAudit({
  data,
  loading,
  error,
  submitError,
  submitLoading,
  fetchJadwalAudit,
  submitJadwalAudit,
  pn,
}) {
  const { project_id } = useParams();
  const [dataJadwalAudit, setdataJadwalAudit] = useState();

  useEffect(() => fetchJadwalAudit(project_id), [project_id, fetchJadwalAudit]);
  useEffect(() => setdataJadwalAudit(data), [data]);

  const breadcrumb = [
    { title: "MAPA", link: "/ewp/mapa/dashboard/" + project_id },
    {
      title: "Jadwal Audit",
      link: "/ewp/mapa/jadwal/" + project_id,
    },
  ];

  const onChangeJadwal = (date) => {
    setdataJadwalAudit((prev) => ({
      ...prev,
      ...date,
      updated_at: moment.now(),
      updated_by: pn,
    }));
  };

  const onSave = async () => {
    console.log(dataJadwalAudit);
    const status = await submitJadwalAudit(project_id, dataJadwalAudit);
    if (status === "success") {
      showSuccessNotif();
      fetchJadwalAudit(project_id);
    } else {
      showErrorNotif(submitError);
    }
  };

  return (
    <EWPLayout selectedKey="2" breadcrumb={breadcrumb}>
      <div className="flex gap-1 mb-5">
        <Button size="small">
          <Link to={"/ewp/mapa/penugasan/" + project_id}>&lt;</Link>
        </Button>
        <Button size="small">
          <Link to={"/ewp/mapa/anggaran/" + project_id}>&gt;</Link>
        </Button>
      </div>
      <div className="px-6">
        <CardProjectEWP />
      </div>
      <div className="mt-16">
        <Typography.Title level={3} className="font-mulish">
          Jadwal Audit
        </Typography.Title>
      </div>
      <div className="w-full rounded-2xl bg-white border border-primary-blue p-5 space-y-4 mb-10">
        <TableJadwalAudit
          data={dataJadwalAudit}
          loading={loading}
          dateOnChange={onChangeJadwal}
        />
        <div className="flex justify-end">
          <Button type="primary" loading={submitLoading} onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
    </EWPLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state),
    error: getError(state),
    submitLoading: getSubmitLoading(state),
    submitError: getSubmitError(state),
    data: getData(state),
    pn: getUserPN(state),
  };
};

const mapDispachToProps = {
  fetchJadwalAudit: fetchJadwalAudit,
  submitJadwalAudit: submitJadwalAudit,
};

export default compose(
  withAuth,
  withRole(pat_content),
  connect(mapStateToProps, mapDispachToProps)
)(MapaJadwalAudit);
