import { connect } from "react-redux";
import { useEffect } from "react";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import AppLayout from "../../../../../layouts/AppLayout";
import { getUserPN } from "../../../../../store/ducks/auth/selectors";
import { fetchActionPlanNego } from "../../../../../store/ducks/RPMNegosiasi/actions";
import { getActionPlanNego, getActionPlanNegoError, getActionPlanNegoLoading, getTimAudit } from "../../../../../store/ducks/RPMNegosiasi/selectors";
import RPMNegosiasiBreadcrumb from "../../../../../component/RPMNegosiasiBreadcrumb";
import RincianKTA from "./RincianKTA";
import RincianKAI from "./RincianKAI";
import RincianMA from "./RincianMA";

function Rincian(props) {
  const { id, kkpt_id } = useParams()

  const { fetchActionPlanNego, user_pn, loading, error, tim_audit, action_plans } = props

  useEffect(() => fetchActionPlanNego(id, kkpt_id), [fetchActionPlanNego, id, kkpt_id])

  if (loading) return (
    <AppLayout title="RPM" breadcrumb={RPMNegosiasiBreadcrumb}>
      <div className="flex justify-center"><Spin /></div>
    </AppLayout>
  )

  if (error && !loading) return (
    <AppLayout title="RPM" breadcrumb={RPMNegosiasiBreadcrumb}>
      <div className="flex justify-center">{error}</div>
    </AppLayout>
  )

  if (action_plans.data.status_negosiasi === "On KAI") {
    const kai = tim_audit && tim_audit.find(a => a.title === "kai")
    if (kai && Number(kai.pn) === Number(user_pn)) {
      return <RincianKAI {...props} />
    } else {
      const ma = tim_audit && tim_audit.find(a => a.title === "ma")
      if (ma && Number(ma.pn) === Number(user_pn)) return (
        <RincianKAI {...props} />
      )
    }
  }

  const ma = tim_audit && tim_audit.find(a => a.title === "ma")
  if (ma && Number(ma.pn) === Number(user_pn)) return (
    <RincianMA {...props} />
  )

  const kta = tim_audit && tim_audit.find(a => a.title === "kta")
  if (kta && Number(kta.pn) === Number(user_pn)) return (
    <RincianKTA {...props} />
  )

  return (
    <AppLayout title="RPM" breadcrumb={RPMNegosiasiBreadcrumb}>
      <div className="flex justify-center">You are not allowed to see this page</div>
    </AppLayout>
  )
}

const mapDispatchToProps = {
  fetchActionPlanNego: fetchActionPlanNego
}

const mapStateToProps = state => ({
  user_pn: getUserPN(state),
  loading: getActionPlanNegoLoading(state),
  error: getActionPlanNegoError(state),
  action_plans: getActionPlanNego(state),
  tim_audit: getTimAudit(state),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Rincian)
