import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import QRCode from "qrcode.react";
import { Button } from "antd";
import AppLayout from "../../../../layouts/AppLayout";
import { TableAttendence } from "../../../../component/RPM";
import { closeAttendance, fetchAttendance } from "../../../../store/ducks/RPMNegosiasi/actions";
import { getAttendanceClosed } from "../../../../store/ducks/RPMNegosiasi/selectors";
import { createErrorNotification, createSuccessNotification } from "../../../../component/utils/notifications";
import TitleQuestion from "../../../../component/RPM/Negosiasi/TitleQuestion";
import RPMNegosiasiBreadcrumb from "../../../../component/RPMNegosiasiBreadcrumb";

function RPMProjectNegosiasiAttandence({
  is_closed,
  fetchAttendance,
  closeAttendance
}) {
  const { id } = useParams()
  const [closeLoading, setCloseLoading] = useState(false)

  useEffect(() => fetchAttendance(id), [fetchAttendance, id])

  const url = `${window.location.origin.toString()}/rpm/attendance/${id}`

  return (
    <AppLayout title="RPM" breadcrumb={RPMNegosiasiBreadcrumb}>
      <TitleQuestion title="Attendance" />
      <div className="border border-primary-blue rounded-lg py-6 px-6 font-mulish mb-8 mx-10">
        <div className="flex space-x-4 mb-8">
          <p className="text-primary-blue">Login URL</p>
          <div className="space-y-4 w-min">
            <p className="text-white bg-secondary-light-black px-4">
              {url}
            </p>
            <div>
              <QRCode value={url} size={180} className="p-2 bg-white" />
            </div>
          </div>
        </div>
        <TableAttendence is_closed={is_closed} />
      </div>
      <div className="flex justify-end mb-20 mx-10">
        <Button
          type="danger"
          disabled={is_closed}
          loading={closeLoading}
          onClick={async () => {
            setCloseLoading(true)
            const error = await closeAttendance(id)
            if (error) {
              createErrorNotification("Close Attendance", error)()
            } else {
              createSuccessNotification("Close Attendance", "Berhasil menutup attendance")()
              fetchAttendance(id)
            }
            setCloseLoading(false)
          }}
        >
          Close Attendance
        </Button>
      </div>
    </AppLayout>
  );
}

const mapDispatchToProps = {
  fetchAttendance: fetchAttendance,
  closeAttendance: closeAttendance
}

const mapStateToProps = state => ({
  is_closed: getAttendanceClosed(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(RPMProjectNegosiasiAttandence)
