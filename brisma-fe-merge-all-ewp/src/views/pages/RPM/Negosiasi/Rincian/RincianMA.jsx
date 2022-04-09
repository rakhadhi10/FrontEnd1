import StatusApprovalRincian from "../../../../../component/RPM/Negosiasi/StatusApprovalRincian";
import TableMeetingRincianRead from "../../../../../component/RPM/Negosiasi/TableMeetingRincianRead";
import TitleQuestion from "../../../../../component/RPM/Negosiasi/TitleQuestion";
import RPMNegosiasiBreadcrumb from "../../../../../component/RPMNegosiasiBreadcrumb";
import AppLayout from "../../../../../layouts/AppLayout";

export default function RincianMA(props) {
  const { action_plans } = props
  const isOnMA = action_plans.data.status_negosiasi === "On MA"

  return (
    <AppLayout title="RPM" breadcrumb={RPMNegosiasiBreadcrumb}>
      <TitleQuestion title="Rincian Negosiasi" />
      <div>
        <StatusApprovalRincian log={action_plans.log} />
      </div>
      <div className="flex justify-center my-10">
        <TableMeetingRincianRead data={action_plans.data.rekomendasi} isOnMA={isOnMA} {...props} />
      </div>
    </AppLayout>
  );
}