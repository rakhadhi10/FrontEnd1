import { Button, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../../../../../../layouts/AppLayout";
import CollapseRekomendasi from "../../../../../../component/RPM/Monitoring/common/CollapseRekomendasi";
import CardActionPlanCheckerAuditee from "../../../../../../component/RPM/Monitoring/auditee/checker/CardActionPlan";
import RPMAuditeeBreadcrumb from "../../../../../../component/RPMAuditeeBreadcrumb";
// import STATUS from "../../../../../../utils/rpmStatus";

export default function ActionPlanChecker(props) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // const { surat } = props

  return (
    <AppLayout title="RPM" breadcrumb={RPMAuditeeBreadcrumb}>
      <p className="flex justify-center text-2xl font-bold font-mulish my-5">
        Hasil Tindak Lanjut Action Plan
      </p>
      <div className="flex justify-between items-center">
        <Typography.Title level={5}>
          <Typography.Link underline>Preview Dokumen KKPT</Typography.Link>
        </Typography.Title>
        <Button
          type="primary"
          // disabled={surat.status_kode_surat !== STATUS.SURAT_PENDING_CHECKER_AUDITEE}
          onClick={() => navigate(pathname + "/surat")}
        >
          Surat Hasil Tindak Lanjut
        </Button>
      </div>
      <div className="py-8">
        <CollapseRekomendasi {...props} card={CardActionPlanCheckerAuditee} />
      </div>
    </AppLayout>
  );
}
