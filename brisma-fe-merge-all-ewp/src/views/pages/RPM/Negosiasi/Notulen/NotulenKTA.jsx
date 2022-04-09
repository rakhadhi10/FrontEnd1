import { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Space } from "antd";
import AppLayout from "../../../../../layouts/AppLayout";
import TitleQuestion from "../../../../../component/RPM/Negosiasi/TitleQuestion";
import Ckeditor from "../../../../../component/CKEditor";
import ConfirmAlasan from "../../../../../component/RPM/Negosiasi/ConfirmAlasan";
import StatusApprovalNotulen from "../../../../../component/RPM/Negosiasi/StatusApprovalNotulen";
import { validateAuditor } from "../../../../../component/utils/validators";
import { approveRejectNotulen, assignATANotulen } from "../../../../../store/ducks/RPMNegosiasi/actions";
import { createErrorNotification, createSuccessNotification } from "../../../../../component/utils/notifications";
import AnggotaTim from "../../../../../component/AutoComplete/AnggotaTim";
import RPMNegosiasiBreadcrumb from "../../../../../component/RPMNegosiasiBreadcrumb";

function NotulenKTA(props) {
  const [submittingATA, setSubmittingATA] = useState(false)
  const { id } = useParams()
  const { log, ata, content, status, assignATANotulen, approveRejectNotulen, fetchNotulen } = props
  const isOnKTA = status === "On KTA"
  const isOnKTACheck = status === "On KTA Check"
  const isFinal = status === "Final"

  return (
    <AppLayout title="RPM" breadcrumb={RPMNegosiasiBreadcrumb}>
      <div className="flex justify-center">
        <div className="w-4/5">
          {/* <CardTop /> */}
        </div>
      </div>
      <TitleQuestion className="flex flex-row items-center mt-8 mb-2" title="Notulen" />
      <div className="flex flex-row gap-1 my-5">
        <div className="w-full">

          {/* Components Search ATA */}
          <div className="border border-primary-blue py-10 px-10 rounded-xl">
            <Space direction="vertical" className="w-full">
              <Form
                name="ata_form"
                layout="inline"
                className="flex w-full"
                onFinish={async (val) => {
                  setSubmittingATA(true)
                  const error = await assignATANotulen(id, val.ata)
                  if (error) createErrorNotification("ATA Penanggung Jawab", error)()
                  else createSuccessNotification("ATA Penanggung Jawab", "Berhasil menyimpan ATA")()
                  setSubmittingATA(false)
                  fetchNotulen(id)
                }}
              >
                <Form.Item
                  initialValue={ata ? ata : undefined}
                  name="ata"
                  style={{ width: "85%", marginRight: 0 }}
                  label={<p className="text-primary-blue text-base">ATA Penanggung Jawab</p>}
                  rules={[
                    () => ({
                      validator(rule, value) {
                        return validateAuditor(rule, value)
                      },
                    }),
                  ]}
                >
                  <AnggotaTim
                    disabled={isFinal || !isOnKTA}
                    placeholder="Search by PN or Name"
                  />
                </Form.Item>
                <Form.Item
                  shouldUpdate
                  noStyle
                >
                  {
                    ({ getFieldsError }) => {
                      const anyErrors = getFieldsError().some(({ errors }) => errors.length)
                      return (
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={anyErrors || isFinal || !isOnKTA}
                          loading={submittingATA}
                          icon={<EditOutlined />}
                        />
                      )
                    }
                  }
                </Form.Item>
              </Form>
              <Status status={status} />
            </Space>
          </div>
          {/* Components Search ATA */}

        </div>
        <div className="w-full">
          {/* Components Approver */}
          <StatusApprovalNotulen log={log} />
          {/* Components Approver */}
        </div>
      </div>
      <div className="border border-primary-blue p-5 rounded-xl">
        <Ckeditor
          disabled={!isOnKTA}
          contentData={content ? content : ""}
        />
      </div>
      <ApproveReject
        statusDisabled={!isOnKTACheck}
        approve={async (alasan) => {
          const error = await approveRejectNotulen(id, true, alasan)
          if (error) createErrorNotification("Approve Notulen", error)()
          else createSuccessNotification("Approve Notulen", "Berhasil menyetujui notulen")()
          fetchNotulen(id)
          return error
        }}
        reject={async (alasan) => {
          const error = await approveRejectNotulen(id, false, alasan)
          if (error) createErrorNotification("Reject Notulen", error)()
          else createSuccessNotification("Reject Notulen", "Berhasil menolak notulen")()
          fetchNotulen(id)
          return error
        }}
      />
    </AppLayout>
  )
}

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

const Status = ({ status = "Unknown Status" }) => {
  let color = {
    text: "rgba(60, 100, 177, 1)",
    background: "rgba(208, 225, 252, 1)"
  }

  if (status === "On ATA") color = {
    text: "rgba(131, 105, 12, 1)",
    background: "#F9E293"
  }

  return (
    <div>
      <label className="text-primary-blue text-base">Status: </label>
      <span
        className="px-4 py-1 rounded-lg"
        style={{ backgroundColor: color.background, color: color.text }}
      >
        {status}
      </span>
    </div>
  )
}

const mapDispatchToProps = {
  assignATANotulen: assignATANotulen,
  approveRejectNotulen: approveRejectNotulen
}

export default connect(null, mapDispatchToProps)(NotulenKTA)
