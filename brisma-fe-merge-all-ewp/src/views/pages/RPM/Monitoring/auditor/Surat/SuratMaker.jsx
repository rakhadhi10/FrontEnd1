import { Button, Typography } from "antd";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Ckeditor from "../../../../../../component/CKEditor";
import ConfirmSubmit from "../../../../../../component/RPM/Monitoring/common/maker/ConfirmSubmit";
import MakerInfo from "../../../../../../component/RPM/Monitoring/common/MakerInfo";
import RPMAuditorBreadcrumb from "../../../../../../component/RPMAuditorBreadcrumb";
import { createErrorNotification, createSuccessNotification } from "../../../../../../component/utils/notifications";
import AppLayout from "../../../../../../layouts/AppLayout";
import { approveSuratMaker } from "../../../../../../store/ducks/RPMAuditor/actions";
import STATUS from "../../../../../../utils/rpmStatus";

let editor = null

function SuratMaker({ surat, submit, fetchSuratDetails }) {
  const { id, kkpt_id } = useParams()
  const disabled = surat.status_kode_surat !== STATUS.SURAT_PENDING_MAKER_AUDITOR_EVALUASI

  return (
    <AppLayout title="RPM" breadcrumb={RPMAuditorBreadcrumb}>
      <p className="flex justify-center text-2xl font-bold font-mulish my-5">
        Hasil Evaluasi Action Plan
      </p>
      <div className="flex justify-between items-center">
        <Typography.Title level={5}>
          <Typography.Link underline>Preview Dokumen KKPT</Typography.Link>
        </Typography.Title>
        <Button type="primary">
          Preview Surat Hasil Evaluasi
        </Button>
      </div>
      <div className="py-4">
        <MakerInfo surat={surat} />
      </div>
      <div className="py-4">
        <Ckeditor
          disabled={disabled}
          contentData={surat.surat_hasil_evaluasi_rpm || ""}
          handleEditorReady={(e) => editor = e}
        />
      </div>
      <div className="py-4 flex justify-end gap-4">
        <Button
          disabled={disabled}
        >
          Simpan
        </Button>
        <Button
          type="primary"
          disabled={disabled}
          onClick={() => ConfirmSubmit(async () => {
            const success = await submit(id, kkpt_id, editor.getData())
            if (success) {
              createSuccessNotification("Surat", "Berhasil submit surat")()
              fetchSuratDetails(kkpt_id, id)
            } else {
              createErrorNotification("Surat", "Gagal submit surat")()
            }
            return success
          })}
        >
          Kirim
        </Button>
      </div>
    </AppLayout>
  );
}

const mapDispatchToProps = {
  submit: approveSuratMaker
}

export default connect(null, mapDispatchToProps)(SuratMaker)
