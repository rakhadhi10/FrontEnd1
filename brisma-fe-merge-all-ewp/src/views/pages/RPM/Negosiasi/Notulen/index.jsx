import { connect } from "react-redux";
import { useEffect } from "react";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import AppLayout from "../../../../../layouts/AppLayout";
import { getUserPN } from "../../../../../store/ducks/auth/selectors";
import { fetchNotulen } from "../../../../../store/ducks/RPMNegosiasi/actions";
import { getNotulenATA, getNotulenContent, getNotulenError, getNotulenKTA, getNotulenLoading, getNotulenLogs, getNotulenStatus } from "../../../../../store/ducks/RPMNegosiasi/selectors";
import NotulenKTA from "./NotulenKTA";
import NotulenATA from "./NotulenATA";
import RPMNegosiasiBreadcrumb from "../../../../../component/RPMNegosiasiBreadcrumb";

function Notulen(props) {
  const { id } = useParams()

  const { fetchNotulen, user_pn, loading, error, kta, ata } = props

  useEffect(() => fetchNotulen(id), [fetchNotulen, id])

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

  if (kta && Number(kta.pn) === Number(user_pn)) return (
    <NotulenKTA {...props} />
  )

  if (ata && Number(ata.pn) === Number(user_pn)) return (
    <NotulenATA {...props} />
  )

  return (
    <AppLayout title="RPM" breadcrumb={RPMNegosiasiBreadcrumb}>
      <div className="flex justify-center">You are not allowed to see this page</div>
    </AppLayout>
  )
}

const mapDispatchToProps = {
  fetchNotulen: fetchNotulen
}

const mapStateToProps = state => ({
  user_pn: getUserPN(state),
  loading: getNotulenLoading(state),
  error: getNotulenError(state),
  content: getNotulenContent(state),
  kta: getNotulenKTA(state),
  ata: getNotulenATA(state),
  status: getNotulenStatus(state),
  log: getNotulenLogs(state)
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Notulen)
