import { Pagination, Select, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import AppLayout from "../../../../../layouts/AppLayout";
import {
  ListProjectCard,
  SearchListProject,
} from "../../../../../component/RPM";
import { fetchProjects, openAssignModal, openDetailsModal } from "../../../../../store/ducks/RPMAuditor/actions";
import { getAuditorProjects, getAuditorProjectsError, getAuditorProjectsLoading } from "../../../../../store/ducks/RPMAuditor/selectors";
import ModalAssign from "../../../../../component/RPM/Monitoring/auditor/Modal/ModalAssign";
import ModalDetailProject from "../../../../../component/RPM/Monitoring/auditor/Modal/ModalDetailProject";
import RPMAuditorBreadcrumb from "../../../../../component/RPMAuditorBreadcrumb";
import { compose } from "redux";
import withAuth from "../../../../routes/hoc/withAuth";

function RPMMonitoringListProject({
  loading,
  error,
  projects,
  fetchProjects,
  openAssignModal,
  openDetailsModal
}) {
  useEffect(() => fetchProjects(), [fetchProjects])

  let navigate = useNavigate();

  const onClickCard = (id) => {
    navigate("/rpm/auditor/projects/" + id);
  };

  return (
    <AppLayout title="RPM" breadcrumb={RPMAuditorBreadcrumb}>
      <ModalAssign type="auditor" />
      <ModalDetailProject />
      <SearchListProject />
      <div className="flex justify-end my-8">
        <Select placeholder="Sort by" allowClear style={{ width: "200px" }} />
      </div>
      {loading && <div className="flex justify-center"><Spin /></div>}
      {!loading && error && <div className="flex justify-center">{error}</div>}
      {!loading && !error &&
        <>
          <div className="grid grid-cols-3 gap-6 mb-8">
            {projects.map((item) => (
              <ListProjectCard
                {...item}
                type="auditor"
                key={item.id}
                projectID={item.projectId}
                batasWaktu={item.batasWaktu}
                memadai={item.memadai}
                tidakMemadai={item.tidakMemadai}
                dalamPemantauan={item.dalamPemantauan}
                onClick={onClickCard}
                showAssign={() => openAssignModal(item.id)}
                showDetail={() => openDetailsModal(item.id)}
              />
            ))}
          </div>
          <Pagination className="flex justify-center mb-8" />
        </>
      }
    </AppLayout>
  );
}

const mapStateToProps = state => ({
  loading: getAuditorProjectsLoading(state),
  error: getAuditorProjectsError(state),
  projects: getAuditorProjects(state)
})

const mapDispatchToProps = {
  fetchProjects: fetchProjects,
  openAssignModal: openAssignModal,
  openDetailsModal: openDetailsModal
}

export default compose(
  withAuth,
  connect(mapStateToProps, mapDispatchToProps)
)(RPMMonitoringListProject)


