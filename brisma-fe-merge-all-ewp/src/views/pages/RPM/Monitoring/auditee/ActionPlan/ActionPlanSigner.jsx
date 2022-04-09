import { Button, Typography } from "antd";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AppLayout from "../../../../../../layouts/AppLayout";
import CollapseRekomendasi from "../../../../../../component/RPM/Monitoring/common/CollapseRekomendasi";
import CardActionPlanSignerAuditee from "../../../../../../component/RPM/Monitoring/auditee/signer/CardActionPlan";
import ConfirmAlasan from "../../../../../../component/RPM/Monitoring/common/ConfirmAlasan";
import STATUS from "../../../../../../utils/rpmStatus";
import { approveAllAuditee } from "../../../../../../store/ducks/RPMAuditee/actions";
import { createErrorNotification, createSuccessNotification } from "../../../../../../component/utils/notifications";
import RPMAuditeeBreadcrumb from "../../../../../../component/RPMAuditeeBreadcrumb";

function ActionPlanSigner(props) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { id, kkpt_id } = useParams()

  const { surat, approveAll, fetchKKPTDetails } = props

  return (
    <AppLayout title="RPM" breadcrumb={RPMAuditeeBreadcrumb}>
      <p className="flex justify-center text-2xl font-bold font-mulish my-5">
        Hasil Tindak Lanjut Action Plan
      </p>
      <div className="flex justify-between items-center">
        <Typography.Title level={5}>
          <Typography.Link underline>Preview Dokumen KKPT</Typography.Link>
        </Typography.Title>
        <div className="flex gap-4">
          <Button
            type="primary"
            // disabled={surat.status_kode_surat !== STATUS.SURAT_PENDING_SIGNER_AUDITEE}
            onClick={() => navigate(pathname + "/surat")}
          >
            Surat Hasil Tindak Lanjut
          </Button>
          <Button
            type="primary"
            disabled={surat.status_kode_surat !== STATUS.SURAT_FINAL_AUDITEE}
            onClick={() => ConfirmAlasan(async (alasan) => {
              const success = await approveAll(id, kkpt_id, alasan)
              if (success) {
                createSuccessNotification("Submit All", "Berhasil mengirim action plan ke auditor")()
                fetchKKPTDetails(kkpt_id, id)
              } else {
                createErrorNotification("Submit All", "Gagal mengirim action plan ke auditor")()
              }
              return success
            }, "Apakah Anda yakin untuk mengirim data ini kepada Auditor? Berikan alasannya!")}
          >
            Submit
          </Button>
        </div>
      </div>
      <div className="py-8">
        <CollapseRekomendasi {...props} card={CardActionPlanSignerAuditee} />
      </div>
    </AppLayout>
  );
}

const mapDispatchToProps = {
  approveAll: approveAllAuditee
}

export default connect(null, mapDispatchToProps)(ActionPlanSigner)
