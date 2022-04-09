import { Button } from "antd";
import React from "react";
import {
  getSubmitAnalisaAktivitasLoading,
  getSubmitAnalisaAktivitasError,
} from "../../../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/selectors";
import { submitAnalisaAktivitas } from "../../../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/actions";
import Ckeditor from "../../../../../../CKEditor";
import { useParams } from "react-router-dom";
import {
  createErrorNotification,
  createSuccessNotification,
} from "../../../../../../utils/notifications";
import { connect } from "react-redux";

const showSuccessNotif = createSuccessNotification(
  "Analisa Aktivitas",
  "Berhasil menyimpan Analisa Aktivitas"
);
const showErrorNotif = createErrorNotification(
  "Analisa Aktivitas",
  "Gagal menyimpan Analisa Aktivitas"
);

function AnalisaAktivitas({ data, error, loading, submitAnalisaAktivitas }) {
  let editor = [];
  const { project_id } = useParams();

  const onSave = async () => {
    const body = { id: data.id, uraian_analisa: editor.getData() };
    await submitAnalisaAktivitas(project_id, body);
    if (!error) {
      showSuccessNotif();
    } else {
      showErrorNotif();
    }
  };

  console.log(data);

  return (
    <div className="items-center p-2 bg-white">
      <Ckeditor
        contentData={data.data}
        handleEditorReady={(ed) => (editor = ed)}
        disabled={false}
      />
      <div className="py-5 flex justify-between ...">
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
    loading: getSubmitAnalisaAktivitasLoading(state),
    error: getSubmitAnalisaAktivitasError(state),
  };
};

const mapDispachToProps = {
  submitAnalisaAktivitas: submitAnalisaAktivitas,
};

export default connect(mapStateToProps, mapDispachToProps)(AnalisaAktivitas);
