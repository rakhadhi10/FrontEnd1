import { Button, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../../../../../../layouts/AppLayout";
import CollapseRekomendasi from "../../../../../../component/RPM/Monitoring/common/CollapseRekomendasi";
import CardActionPlanCheckerAuditor from "../../../../../../component/RPM/Monitoring/auditor/checker/CardActionPlan";
import RPMAuditorBreadcrumb from "../../../../../../component/RPMAuditorBreadcrumb";
// import STATUS from "../../../../../../utils/rpmStatus";

export default function ActionPlanChecker(props) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // const { surat } = props

  return (
    <AppLayout title="RPM" breadcrumb={RPMAuditorBreadcrumb}>
      <p className="flex justify-center text-2xl font-bold font-mulish my-5">
        Hasil Evaluasi Action Plan
      </p>
      <div className="flex justify-between items-center">
        <Typography.Title level={5}>
          <Typography.Link underline>Preview Dokumen KKPT</Typography.Link>
        </Typography.Title>
        <Button
          type="primary"
          // disabled={surat.status_kode_surat !== STATUS.SURAT_PENDING_CHECKER_AUDITOR_EVALUASI}
          onClick={() => navigate(pathname + "/surat")}
        >
          Surat Hasil Evaluasi
        </Button>
      </div>
      <div className="py-8">
        <CollapseRekomendasi {...props} card={CardActionPlanCheckerAuditor} />
      </div>
    </AppLayout>
  );
}
