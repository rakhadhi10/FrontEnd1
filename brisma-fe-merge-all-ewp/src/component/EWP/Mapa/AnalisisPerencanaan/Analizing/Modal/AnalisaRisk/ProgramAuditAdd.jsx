import { Button } from "antd";
import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { submitProgramAudit } from "../../../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/actions";
import {
  getSubmitProgramAuditError,
  getSubmitProgramAuditLoading,
} from "../../../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/selectors";
import Ckeditor from "../../../../../../CKEditor";
import {
  createErrorNotification,
  createSuccessNotification,
} from "../../../../../../utils/notifications";

const showSuccessNotif = createSuccessNotification(
  "Program Audit",
  "Berhasil menyimpan Program Audit"
);
const showErrorNotif = (e) =>
  createErrorNotification(
    "Program Audit",
    "Gagal menyimpan Program Audit: " + e
  );

function ProgramAuditAdd({
  mcrKode,
  data,
  loading,
  error,
  submitProgramAudit,
  mapa_uker_id,
}) {
  let editor = [];
  const { project_id } = useParams();

  const onSave = async () => {
    const body = {
      manual_control_risks: mcrKode,
      mapa_uker_mcr_id: mcrKode,
      mapa_uker_id: mapa_uker_id,
      program_audit: editor.getData(),
    };
    const status = await submitProgramAudit(project_id, body);
    if (status === "success") {
      showSuccessNotif();
    } else {
      showErrorNotif(error);
    }
  };
  console.log(data);

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
    loading: getSubmitProgramAuditLoading(state),
    error: getSubmitProgramAuditError(state),
  };
};

const mapDispachToProps = {
  submitProgramAudit: submitProgramAudit,
};

export default connect(mapStateToProps, mapDispachToProps)(ProgramAuditAdd);
