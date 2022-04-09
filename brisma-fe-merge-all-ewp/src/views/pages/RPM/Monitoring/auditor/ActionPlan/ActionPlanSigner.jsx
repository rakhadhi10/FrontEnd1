import { Button, Typography } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AppLayout from "../../../../../../layouts/AppLayout";
import CollapseRekomendasi from "../../../../../../component/RPM/Monitoring/common/CollapseRekomendasi";
import CardActionPlanSignerAuditor from "../../../../../../component/RPM/Monitoring/auditor/signer/CardActionPlan";
import ConfirmAlasan from "../../../../../../component/RPM/Monitoring/common/ConfirmAlasan";
import STATUS from "../../../../../../utils/rpmStatus";
import { connect } from "react-redux";
import { approveAllAuditor } from "../../../../../../store/ducks/RPMAuditor/actions";
import { createErrorNotification, createSuccessNotification } from "../../../../../../component/utils/notifications";
import RPMAuditorBreadcrumb from "../../../../../../component/RPMAuditorBreadcrumb";

function ActionPlanSigner(props) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { id, kkpt_id } = useParams()

  const { surat, approveAll, fetchKKPTDetails } = props

  return (
    <AppLayout title="RPM" breadcrumb={RPMAuditorBreadcrumb}>
      <p className="flex justify-center text-2xl font-bold font-mulish my-5">
        Hasil Evaluasi Action Plan
      </p>
      <div className="flex justify-between items-center">
        <Typography.Title level={5}>
          <Typography.Link underline>Preview Dokumen KKPT</Typography.Link>
        </Typography.Title>
        <div className="flex gap-4">
          <Button
            type="primary"
            // disabled={surat.status_kode_surat !== STATUS.SURAT_PENDING_SIGNER_AUDITOR_EVALUASI}
            onClick={() => navigate(pathname + "/surat")}
          >
            Surat Hasil Evaluasi
          </Button>
          <Button
            type="primary"
            disabled={surat.status_kode_surat !== STATUS.SURAT_FINAL_AUDITOR}
            onClick={() => ConfirmAlasan(async (alasan) => {
              const success = await approveAll(id, kkpt_id, alasan)
              if (success) {
                createSuccessNotification("Submit All", "Berhasil submit all")()
                fetchKKPTDetails(kkpt_id, id)
              } else {
                createErrorNotification("Submit All", "Gagal submit all")()
              }
              return success
            }, "Apakah Anda yakin untuk mengirim data ini kepada Auditor? Berikan alasannya!")}
          >
            Submit
          </Button>
        </div>
      </div>
      <div className="py-8">
        <CollapseRekomendasi {...props} card={CardActionPlanSignerAuditor} />
      </div>
    </AppLayout>
  );
}

const mapDispatchToProps = {
  approveAll: approveAllAuditor
}

export default connect(null, mapDispatchToProps)(ActionPlanSigner)