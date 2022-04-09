import { connect } from "react-redux";
import { useEffect } from "react";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import AppLayout from "../../../../../layouts/AppLayout";
import { getUserPN } from "../../../../../store/ducks/auth/selectors";
import { fetchBeritaAcara } from "../../../../../store/ducks/RPMNegosiasi/actions";
import { getBeritaAcaraATA, getBeritaAcaraContent, getBeritaAcaraError, getBeritaAcaraKTA, getBeritaAcaraLoading, getBeritaAcaraLogs, getBeritaAcaraPIC, getBeritaAcaraStatus } from "../../../../../store/ducks/RPMNegosiasi/selectors";
import BeritaAcaraKTA from "./BeritaAcaraKTA";
import BeritaAcaraATA from "./BeritaAcaraATA";
import BeritaAcaraPIC from "./BeritaAcaraPIC";
import RPMNegosiasiBreadcrumb from "../../../../../component/RPMNegosiasiBreadcrumb";

function BeritaAcara(props) {
  const { id } = useParams()

  const { fetchBeritaAcara, user_pn, loading, error, kta, ata, pic } = props

  useEffect(() => fetchBeritaAcara(id), [fetchBeritaAcara, id])

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
    <BeritaAcaraKTA {...props} />
  )

  if (ata && Number(ata.pn) === Number(user_pn)) return (
    <BeritaAcaraATA {...props} />
  )

  if (pic && Number(pic.pn) === Number(user_pn)) return (
    <BeritaAcaraPIC {...props} />
  )

  return (
    <AppLayout title="RPM" breadcrumb={RPMNegosiasiBreadcrumb}>
      <div className="flex justify-center">You are not allowed to see this page</div>
    </AppLayout>
  )
}

const mapDispatchToProps = {
  fetchBeritaAcara: fetchBeritaAcara
}

const mapStateToProps = state => ({
  user_pn: getUserPN(state),
  loading: getBeritaAcaraLoading(state),
  error: getBeritaAcaraError(state),
  content: getBeritaAcaraContent(state),
  kta: getBeritaAcaraKTA(state),
  ata: getBeritaAcaraATA(state),
  pic: getBeritaAcaraPIC(state),
  status: getBeritaAcaraStatus(state),
  log: getBeritaAcaraLogs(state)
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(BeritaAcara)
