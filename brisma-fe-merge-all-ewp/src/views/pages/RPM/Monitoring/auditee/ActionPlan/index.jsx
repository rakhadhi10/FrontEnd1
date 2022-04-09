import { connect } from "react-redux";
import { useEffect } from "react";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import RPMKKPTMaker from "./ActionPlanMaker";
import RPMKKPTChecker from "./ActionPlanChecker";
import RPMKKPTSigner from "./ActionPlanSigner";
import { fetchKKPTDetails } from "../../../../../../store/ducks/RPMAuditee/actions";
import { getKKPTDetails, getKKPTDetailsError, getKKPTDetailsLoading, getKKPTDetailsMCS, getKKPTDetailsSurat } from "../../../../../../store/ducks/RPMAuditee/selectors";
import AppLayout from "../../../../../../layouts/AppLayout";
import withAuth from "../../../../../routes/hoc/withAuth";
import { getUserPN } from "../../../../../../store/ducks/auth/selectors";
import RPMAuditeeBreadcrumb from "../../../../../../component/RPMAuditeeBreadcrumb";

function RPMKKPT(props) {
  const { id, kkpt_id } = useParams()

  const { fetchKKPTDetails, user_pn, loading, error, mcs } = props

  useEffect(() => fetchKKPTDetails(kkpt_id, id), [fetchKKPTDetails, kkpt_id, id])

  if (loading) return (
    <AppLayout title="RPM" breadcrumb={RPMAuditeeBreadcrumb}>
      <div className="flex justify-center"><Spin /></div>
    </AppLayout>
  )

  if (error && !loading) return (
    <AppLayout title="RPM" breadcrumb={RPMAuditeeBreadcrumb}>
      <div className="flex justify-center">{error}</div>
    </AppLayout>
  )

  if (mcs.makers_auditee && mcs.makers_auditee.some(a => Number(a.pn) === Number(user_pn))) return (
    <RPMKKPTMaker mcs={mcs} {...props} />
  )

  if (mcs.checkers_auditee && mcs.checkers_auditee.some(a => Number(a.pn) === Number(user_pn))) return (
    <RPMKKPTChecker mcs={mcs} {...props} />
  )

  if (mcs.signers_auditee && mcs.signers_auditee.some(a => Number(a.pn) === Number(user_pn))) return (
    <RPMKKPTSigner mcs={mcs} {...props} />
  )

  return (
    <AppLayout title="RPM" breadcrumb={RPMAuditeeBreadcrumb}>
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
