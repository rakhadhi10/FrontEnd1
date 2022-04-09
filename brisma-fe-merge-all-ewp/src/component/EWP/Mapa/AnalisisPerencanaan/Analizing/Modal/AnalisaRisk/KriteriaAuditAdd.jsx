import { Button } from "antd";
import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { submitKriteriaAudit } from "../../../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/actions";
import {
  getSubmitKriteriaAuditError,
  getSubmitKriteriaAuditLoading,
} from "../../../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/selectors";
import Ckeditor from "../../../../../../CKEditor";
import {
  createErrorNotification,
  createSuccessNotification,
} from "../../../../../../utils/notifications";

const showSuccessNotif = createSuccessNotification(
  "Kriteria Audit",
  "Berhasil menyimpan Kriteria Audit"
);
const showErrorNotif = (e) =>
  createErrorNotification(
    "Program Audit",
    "Gagal menyimpan Program Audit: " + e
  );

function KriteriaAuditAdd({
  mcrKode,
  data,
  loading,
  error,
  submitKriteriaAudit,
  mapa_uker_id,
}) {
  let editor = [];
  const { project_id } = useParams();

  const onSave = async () => {
    const body = {
      manual_control_risks: mcrKode,
      mapa_uker_mcr_id: mcrKode,
      mapa_uker_id: mapa_uker_id,
      kriteria: editor.getData(),
    };
    const status = await submitKriteriaAudit(project_id, body);
    if (status === "success") {
      showSuccessNotif();
    } else {
      showErrorNotif(error);
    }
  };

  return (
    <div className="items-center p-2 bg-white">
      <Ckeditor
        contentData={data}
        handleEditorReady={(ed) => (editor = ed)}
        disabled={false}
      />
      <div class="py-5 flex justify-between ...">
        <p>Mohon isi semua data sebelum ke tahap selanjutnya</p>
        <Button type="primary" loading={loading} onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: getSubmitKriteriaAuditLoading(state),
    error: getSubmitKriteriaAuditError(state),
  };
};

const mapDispachToProps = {
  submitKriteriaAudit: submitKriteriaAudit,
};

export default connect(mapStateToProps, mapDispachToProps)(KriteriaAuditAdd);
