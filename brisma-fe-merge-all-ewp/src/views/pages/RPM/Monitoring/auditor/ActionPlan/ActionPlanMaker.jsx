import { Button, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../../../../../../layouts/AppLayout";
import CollapseRekomendasi from "../../../../../../component/RPM/Monitoring/common/CollapseRekomendasi";
import CardActionPlanMakerAuditor from "../../../../../../component/RPM/Monitoring/auditor/maker/CardActionPlan";
import RPMAuditorBreadcrumb from "../../../../../../component/RPMAuditorBreadcrumb";
// import STATUS from "../../../../../../utils/rpmStatus";

export default function ActionPlanMaker(props) {
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
          // disabled={surat.status_kode_surat !== STATUS.SURAT_PENDING_MAKER_AUDITOR_EVALUASI}
          onClick={() => navigate(pathname + "/surat")}
        >
          Surat Hasil Evaluasi
        </Button>
      </div>
      <div className="py-8">
        <CollapseRekomendasi {...props} card={CardActionPlanMakerAuditor} />
      </div>
    </AppLayout>
  );
}
