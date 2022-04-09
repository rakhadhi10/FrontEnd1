import { compose } from "redux";
import CardProjectsList from "../../../component/PAT/common/PATListProjects/CardProjectsList";
import FilterForm from "../../../component/PAT/common/PATListProjects/FilterForm";
import ModalPenggantianMakerPAT from "../../../component/PAT/common/PATListProjects/ModalPenggantianMakerPAT";
import SortBy from "../../../component/PAT/common/PATListProjects/SortBy";
import AppLayout from "../../../layouts/AppLayout";
import { list_projects } from "../../routes/allowedRoles";
import withAuth from "../../routes/hoc/withAuth";
import withRole from "../../routes/hoc/withRole";

export function PATListProjects() {
  return (
    <AppLayout title="PAT">
      <ModalPenggantianMakerPAT />
      <div className="p-6 my-4 bg-white">
        <FilterForm />
      </div>
      <div className="flex justify-end my-8">
        <SortBy />
      </div>
      <div className="my-8">
        <CardProjectsList />
      </div>
    </AppLayout>
  );
}

export default compose(
  withAuth,
  withRole(list_projects),
)(PATListProjects);