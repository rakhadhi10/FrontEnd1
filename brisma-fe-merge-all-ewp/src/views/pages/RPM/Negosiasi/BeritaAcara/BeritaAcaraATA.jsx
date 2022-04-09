import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import AppLayout from "../../../../../layouts/AppLayout";
import TitleQuestion from "../../../../../component/RPM/Negosiasi/TitleQuestion";
import Ckeditor from "../../../../../component/CKEditor";
import { sendToKTABeritaAcara } from "../../../../../store/ducks/RPMNegosiasi/actions";
import { useState } from "react";
import { createErrorNotification, createSuccessNotification } from "../../../../../component/utils/notifications";
import StatusApprovalBeritaAcara from "../../../../../component/RPM/Negosiasi/StatusApprovalBeritaAcara";
import RPMNegosiasiBreadcrumb from "../../../../../component/RPMNegosiasiBreadcrumb";

let editor = null

function BeritaAcaraATA(props) {
  const [submitting, setSubmitting] = useState(false)
  const { id } = useParams()
  const { log, content, status, sendToKTABeritaAcara, fetchBeritaAcara } = props
  const isOnATA = status === "On ATA"

  return (
    <AppLayout title="RPM" breadcrumb={RPMNegosiasiBreadcrumb}>
      <TitleQuestion className="flex flex-row items-center mt-8 mb-2" title="Berita Acara" />
      <div className="my-5">
        <StatusApprovalBeritaAcara log={log} />
      </div>
      <div className="border border-primary-blue p-5 rounded-xl">
        <Ckeditor
          disabled={!isOnATA}
          contentData={content ? content : ""}
          handleEditorReady={(e) => editor = e}
        />
      </div>
      <div className="flex justify-end items-center gap-4 mt-5 mb-10">
        <Button
          type="primary"
          disabled={!isOnATA}
          loading={submitting}
          onClick={async () => {
            setSubmitting(true)
            const error = await sendToKTABeritaAcara(id, editor.getData())
            if (error) createErrorNotification("Send To KTA", error)()
            else createSuccessNotification("Send To KTA", "Berhasil mengirim berita acara ke KTA")()
            setSubmitting(false)
            fetchBeritaAcara(id)
          }}>
          Send to KTA
        </Button>
      </div>
    </AppLayout>
  )
}

const mapDispatchToProps = {
  sendToKTABeritaAcara: sendToKTABeritaAcara
}

export default connect(null, mapDispatchToProps)(BeritaAcaraATA)
