import { compose } from "redux";
import AddendumWarning from "../../../../component/PAT/common/PATProject/AddendumWarning";
import CardMenuList from "../../../../component/PAT/common/PATProject/CardMenuList";
import AppLayout from "../../../../layouts/AppLayout";
import { pat_content } from "../../../routes/allowedRoles";
import withAuth from "../../../routes/hoc/withAuth";
import withPATStatus from "../../../routes/hoc/withPATStatus";
import withRole from "../../../routes/hoc/withRole";

export function PATProject({ status }) {
  const { status_pat } = status
  return (
    <AppLayout title="PAT">
      <CardMenuList />
      {(status_pat === "Final" || status_pat === "On Adendum") && <AddendumWarning />}
    </AppLayout>
  );
}

export default compose(
  withAuth,
  withRole(pat_content),
  withPATStatus,
)(PATProject)