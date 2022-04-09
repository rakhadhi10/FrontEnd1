import { TableMeetingRincian } from "../../../../../component/RPM";
import StatusApprovalRincian from "../../../../../component/RPM/Negosiasi/StatusApprovalRincian";
import TitleQuestion from "../../../../../component/RPM/Negosiasi/TitleQuestion";
import RPMNegosiasiBreadcrumb from "../../../../../component/RPMNegosiasiBreadcrumb";
import AppLayout from "../../../../../layouts/AppLayout";

export default function RincianKTA(props) {
  const { action_plans } = props
  const isOnKTA = action_plans.data.status_negosiasi === "On KTA"

  return (
    <AppLayout title="RPM" breadcrumb={RPMNegosiasiBreadcrumb}>
      <TitleQuestion title="Rincian Negosiasi" />
      <div>
        <StatusApprovalRincian log={action_plans.log} />
      </div>
      <div className="flex justify-center my-10">
        <TableMeetingRincian data={action_plans.data.rekomendasi} isOnKTA={isOnKTA} {...props} />
      </div>
    </AppLayout>
  );
}