import { Button, Typography } from "antd";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Ckeditor from "../../../../../../component/CKEditor";
import ConfirmAlasan from "../../../../../../component/RPM/Monitoring/common/ConfirmAlasan";
import MakerInfo from "../../../../../../component/RPM/Monitoring/common/MakerInfo";
import RPMAuditeeBreadcrumb from "../../../../../../component/RPMAuditeeBreadcrumb";
import { createErrorNotification, createSuccessNotification } from "../../../../../../component/utils/notifications";
import AppLayout from "../../../../../../layouts/AppLayout";
import { getUserPN } from "../../../../../../store/ducks/auth/selectors";
import { approveSuratSigner, rejectSuratSigner } from "../../../../../../store/ducks/RPMAuditee/actions";
import STATUS from "../../../../../../utils/rpmStatus";

function SuratSigner({ user_pn, surat, approve, reject, fetchSuratDetails }) {
  const { id, kkpt_id } = useParams()

  const isNotPendingSigner = surat.status_kode_surat !== STATUS.SURAT_PENDING_SIGNER_AUDITEE
  const alreadySigned = (surat.logSigner && surat.logSigner.some(s => String(s.from.pn) === String(user_pn)))
  const disabled = isNotPendingSigner || alreadySigned

  return (
    <AppLayout title="RPM" breadcrumb={RPMAuditeeBreadcrumb}>
      <p className="flex justify-center text-2xl font-bold font-mulish my-5">
        Hasil Tindak Lanjut Action Plan
      </p>
      <div className="flex justify-between items-center">
        <Typography.Title level={5}>
          <Typography.Link underline>Preview Dokumen KKPT</Typography.Link>
        </Typography.Title>
        <Button type="primary">
          Preview Surat Hasil Tindak Lanjut
        </Button>
      </div>
      <div className="py-4">
        <MakerInfo surat={surat} />
      </div>
      <div className="py-4">
        <Ckeditor
          disabled={true}
          contentData={surat.surat_hasil_tindak_lanjut_rpm || ""}
        />
      </div>
      <div className="py-4 flex justify-end gap-4">
        <Button
          disabled={disabled}
          onClick={() => ConfirmAlasan(async (alasan) => {
            const success = await reject(id, kkpt_id, alasan)
            if (success) {
              createSuccessNotification("Surat", "Berhasil reject surat")()
              fetchSuratDetails(kkpt_id, id)
            } else {
              createErrorNotification("Surat", "Gagal reject surat")()
            }
            return success
          }, "Apakah Anda yakin menolak data ini? Berikan alasannya!")}
        >
          Reject
        </Button>
        <Button
          type="primary"
          disabled={disabled}
          onClick={() => ConfirmAlasan(async (alasan) => {
            const success = await approve(id, kkpt_id, alasan)
            if (success) {
              createSuccessNotification("Surat", "Berhasil approve surat")()
              fetchSuratDetails(kkpt_id, id)
            } else {
              createErrorNotification("Surat", "Gagal approve surat")()
            }
            return success
          }, "Apakah Anda yakin menyetujui data ini? Berikan alasannya!")}
        >
          Approve
        </Button>
      </div>
    </AppLayout>
  );
}

const mapDispatchToProps = {
  approve: approveSuratSigner,
  reject: rejectSuratSigner,
}

const mapStateToProps = state => ({
  user_pn: getUserPN(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(SuratSigner)