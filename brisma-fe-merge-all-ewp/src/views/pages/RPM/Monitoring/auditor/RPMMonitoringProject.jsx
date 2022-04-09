import { Pagination, Select, Spin } from "antd";
import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { compose } from "redux";
import { KKPTCard, ProjectTimCard } from "../../../../../component/RPM";
import RPMAuditorBreadcrumb from "../../../../../component/RPMAuditorBreadcrumb";
import AppLayout from "../../../../../layouts/AppLayout";
import { fetchAllKKPT } from "../../../../../store/ducks/RPMAuditor/actions";
import { getKKPT, getKKPTError, getKKPTLoading, getKKPTMCS } from "../../../../../store/ducks/RPMAuditor/selectors";
import withAuth from "../../../../routes/hoc/withAuth";

function RPMMonitoringProject({
  kkpts,
  mcs,
  loading,
  error,
  fetchAllKKPT
}) {
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => fetchAllKKPT(id), [fetchAllKKPT, id])

  const onClickCard = (kkpt_id) => {
    navigate(`/rpm/auditor/projects/${id}/kkpt/${kkpt_id}`);
  };

  return (
    <AppLayout title="RPM" breadcrumb={RPMAuditorBreadcrumb}>
      {!loading && !error &&
        <div className="mx-24">
          <ProjectTimCard
            {...mcs}
            makers_auditee={mcs.makers_auditor}
            checkers_auditee={mcs.checkers_auditor}
            signers_auditee={mcs.signers_auditor}
          />
        </div>
      }
      <div className="flex justify-between my-10">
        <p className="text-2xl font-bold font-mulish text-secondary-light-black">
          {mcs.nama_project}
        </p>
        <Select placeholder="Sort by" allowClear style={{ width: "200px" }} />
      </div>
      <p className="text-xl font-bold font-mulish text-secondary-light-black">Pilih KKPT</p>
      {loading && <div className="flex justify-center"><Spin /></div>}
      {error && !loading && <div className="flex justify-center">{error}</div>}
      {!loading && !error &&
        <>
          <div className="mx-16 space-y-4 my-8">
            {kkpts.map(kkpt => (
              <KKPTCard onClick={() => onClickCard(kkpt.kkpt_id)} {...kkpt} />
            ))}
          </div>
          <div className="flex justify-center my-10">
            <Pagination />
          </div>
        </>
      }

    </AppLayout>
  );
}

const mapDispatchToProps = {
  fetchAllKKPT: fetchAllKKPT
}

const mapStateToProps = state => ({
  loading: getKKPTLoading(state),
  error: getKKPTError(state),
  kkpts: getKKPT(state),
  mcs: getKKPTMCS(state)
})

export default compose(
  withAuth,
  connect(mapStateToProps, mapDispatchToProps)
)(RPMMonitoringProject)
