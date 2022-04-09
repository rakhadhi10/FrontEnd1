import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Space } from "antd";
import AppLayout from "../../../../../layouts/AppLayout";
import TitleQuestion from "../../../../../component/RPM/Negosiasi/TitleQuestion";
import Ckeditor from "../../../../../component/CKEditor";
import ConfirmAlasan from "../../../../../component/RPM/Negosiasi/ConfirmAlasan";
import { validateAuditor } from "../../../../../component/utils/validators";
import DebounceAuditor from "../../../../../component/AutoComplete/DebounceAuditor";
import { createErrorNotification, createSuccessNotification } from "../../../../../component/utils/notifications";
import { approveRejectBeritaAcara, assignATAPICBeritaAcara } from "../../../../../store/ducks/RPMNegosiasi/actions";
import StatusApprovalBeritaAcara from "../../../../../component/RPM/Negosiasi/StatusApprovalBeritaAcara";
import AnggotaTim from "../../../../../component/AutoComplete/AnggotaTim";
import RPMNegosiasiBreadcrumb from "../../../../../component/RPMNegosiasiBreadcrumb";

function BeritaAcaraKTA(props) {
  const [submittingATA, setSubmittingATA] = useState(false)

  const { id } = useParams()
  const { log, pic, ata, content, status, assignATAPICBeritaAcara, approveRejectBeritaAcara, fetchBeritaAcara } = props
  const isOnKTA = status === "On KTA"
  const isOnKTACheck = status === "On KTA Check"
  const isFinal = status === "Final"

  return (
    <AppLayout title="RPM" breadcrumb={RPMNegosiasiBreadcrumb}>
      <TitleQuestion className="flex flex-row items-center mt-8 mb-2" title="Berita Acara" />
      <div className="flex flex-row gap-1 my-5">
        <div className="w-full">
          {/* Components Search ATA */}
          <div className="border border-primary-blue py-10 px-10 rounded-xl">
            <Space direction="vertical" className="w-full">
              <Form
                name="ata_form"
                layout="inline"
                onFinish={async (val) => {
                  setSubmittingATA(true)
                  const error = await assignATAPICBeritaAcara(id, val.ata, val.pic)
                  if (error) createErrorNotification("PIC", error)()
                  else createSuccessNotification("PIC", "Berhasil menyimpan PIC")()
                  setSubmittingATA(false)
                  fetchBeritaAcara(id)
                }}
              >
                <div className="w-full flex items-center">
                  <div className="w-full">
                    <Form.Item
                      initialValue={ata ? ata : undefined}
                      name="ata"
                      label={<p className="text-primary-blue text-base">ATA Penanggung Jawab</p>}
                      style={{ width: "100%" }}
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
                      initialValue={pic ? pic : undefined}
                      name="pic"
                      label={<p className="text-primary-blue text-base">Pimpinan Uker Auditee</p>}
                      style={{ width: "100%" }}
                      rules={[
                        () => ({
                          validator(rule, value) {
                            return validateAuditor(rule, value)
                          },
                        }),
                      ]}
                    >
                      <DebounceAuditor
                        disabled={isFinal || !isOnKTA}
                        placeholder="Search by PN or Name"
                      />
                    </Form.Item>
                  </div>
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
                </div>
              </Form>
              <Status status={status} />
            </Space>
          </div>
          {/* Components Search ATA */}
        </div>
        <div className="w-full">
          <StatusApprovalBeritaAcara log={log} />
        </div>
      </div>
      <div className="border border-primary-blue p-5 rounded-xl">
        <Ckeditor
          disabled
          contentData={content ? content : ""}
        />
      </div>
      <ApproveReject
        statusDisabled={!isOnKTACheck}
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
  assignATAPICBeritaAcara: assignATAPICBeritaAcara,
  approveRejectBeritaAcara: approveRejectBeritaAcara
}

export default connect(null, mapDispatchToProps)(BeritaAcaraKTA)

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
