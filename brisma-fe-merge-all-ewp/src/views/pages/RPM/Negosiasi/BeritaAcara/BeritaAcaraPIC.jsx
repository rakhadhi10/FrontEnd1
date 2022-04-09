import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import AppLayout from "../../../../../layouts/AppLayout";
import TitleQuestion from "../../../../../component/RPM/Negosiasi/TitleQuestion";
import Ckeditor from "../../../../../component/CKEditor";
import ConfirmAlasan from "../../../../../component/RPM/Negosiasi/ConfirmAlasan";
import { createErrorNotification, createSuccessNotification } from "../../../../../component/utils/notifications";
import { approveRejectBeritaAcara } from "../../../../../store/ducks/RPMNegosiasi/actions";
import StatusApprovalBeritaAcara from "../../../../../component/RPM/Negosiasi/StatusApprovalBeritaAcara";
import RPMNegosiasiBreadcrumb from "../../../../../component/RPMNegosiasiBreadcrumb";

function BeritaAcaraPIC(props) {
  const { id } = useParams()
  const { log, content, status, approveRejectBeritaAcara, fetchBeritaAcara } = props
  const isOnAuditee = status === "On Auditee Check"

  return (
    <AppLayout title="RPM" breadcrumb={RPMNegosiasiBreadcrumb}>
      <TitleQuestion className="flex flex-row items-center mt-8 mb-2" title="Berita Acara" />
      <div className="my-5">
        <StatusApprovalBeritaAcara log={log} />
      </div>
      <div className="border border-primary-blue p-5 rounded-xl">
        <Ckeditor
          disabled
          contentData={content ? content : ""}
        />
      </div>
      <ApproveReject
        statusDisabled={!isOnAuditee}
        approve={async (alasan) => {
          const error = await approveRejectBeritaAcara(id, true, alasan)
          if (error) createErrorNotification("Approve Berita Acara", error)()
          else createSuccessNotification("Approve Berita Acara", "Berhasil menyetujui berita acara")()
          fetchBeritaAcara(id)
          return error
        }}
        reject={async (alasan) => {
          const error = await approveRejectBeritaAcara(id, false, alasan)
          if (error) createErrorNotification("Reject Berita Acara", error)()
          else createSuccessNotification("Reject Berita Acara", "Berhasil menolak berita acara")()
          fetchBeritaAcara(id)
          return error
        }}
      />
    </AppLayout>
  )
}

const mapDispatchToProps = {
  approveRejectBeritaAcara: approveRejectBeritaAcara
}

export default connect(null, mapDispatchToProps)(BeritaAcaraPIC)

const ApproveReject = ({ statusDisabled, approve, reject }) => {
  return (
    <div className="flex justify-end items-center gap-4 mt-5 mb-10">
      <Button
        disabled={statusDisabled}
        onClick={() => {
          ConfirmAlasan(async (alasan) => {
            const error = await reject(alasan)
            return !error
          }, "Apakah Anda yakin menolak data ini? Berikan alasannya!")
        }}>
        Reject
      </Button>
      <Button
        type="primary"
        disabled={statusDisabled}
        onClick={() => {
          ConfirmAlasan(async (alasan) => {
            const error = await approve(alasan)
            return !error
          }, "Apakah Anda yakin menyetujui data ini? Berikan alasannya!")
        }}>
        Approve
      </Button>
    </div>
  )
}
