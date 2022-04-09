import { connect } from "react-redux";
import { useEffect } from "react";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import RPMKKPTMaker from "./ActionPlanMaker";
import RPMKKPTChecker from "./ActionPlanChecker";
import RPMKKPTSigner from "./ActionPlanSigner";
import { fetchKKPTDetails } from "../../../../../../store/ducks/RPMAuditor/actions";
import { getKKPTDetails, getKKPTDetailsError, getKKPTDetailsLoading, getKKPTDetailsMCS, getKKPTDetailsSurat } from "../../../../../../store/ducks/RPMAuditor/selectors";
import AppLayout from "../../../../../../layouts/AppLayout";
import withAuth from "../../../../../routes/hoc/withAuth";
import { getUserPN } from "../../../../../../store/ducks/auth/selectors";
import RPMAuditorBreadcrumb from "../../../../../../component/RPMAuditorBreadcrumb";

function RPMKKPT(props) {
  const { id, kkpt_id } = useParams()

  const { fetchKKPTDetails, user_pn, loading, error, mcs } = props

  useEffect(() => fetchKKPTDetails(kkpt_id, id), [fetchKKPTDetails, kkpt_id, id])

  if (loading) return (
    <AppLayout title="RPM" breadcrumb={RPMAuditorBreadcrumb}>
      <div className="flex justify-center"><Spin /></div>
    </AppLayout>
  )

  if (error && !loading) return (
    <AppLayout title="RPM" breadcrumb={RPMAuditorBreadcrumb}>
      <div className="flex justify-center">{error}</div>
    </AppLayout>
  )

  if (mcs.makers_auditor && mcs.makers_auditor.some(a => Number(a.pn) === Number(user_pn))) return (
    <RPMKKPTMaker mcs={mcs} {...props} />
  )

  if (mcs.checkers_auditor && mcs.checkers_auditor.some(a => Number(a.pn) === Number(user_pn))) return (
    <RPMKKPTChecker mcs={mcs} {...props} />
  )

  if (mcs.signers_auditor && mcs.signers_auditor.some(a => Number(a.pn) === Number(user_pn))) return (
    <RPMKKPTSigner mcs={mcs} {...props} />
  )

  return (
    <AppLayout title="RPM" breadcrumb={RPMAuditorBreadcrumb}>
      <div className="flex justify-center">You are not registered as makers/checkers/signers</div>
    </AppLayout>
  )
}

const mapDispatchToProps = {
  fetchKKPTDetails: fetchKKPTDetails
}

const mapStateToProps = state => ({
  user_pn: getUserPN(state),
  loading: getKKPTDetailsLoading(state),
  error: getKKPTDetailsError(state),
  mcs: getKKPTDetailsMCS(state),
  kkpt: getKKPTDetails(state),
  surat: getKKPTDetailsSurat(state)
})

export default compose(
  withAuth,
  connect(mapStateToProps, mapDispatchToProps)
)(RPMKKPT)
