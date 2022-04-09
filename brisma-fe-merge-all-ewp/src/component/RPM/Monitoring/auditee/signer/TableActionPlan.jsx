import { Button, Table } from "antd";
import { useState } from "react";
import { connect } from "react-redux";
import { getUserPN } from "../../../../../store/ducks/auth/selectors";
import { approveActionPlanSigner, rejectActionPlanSigner } from "../../../../../store/ducks/RPMAuditee/actions";
import STATUS from "../../../../../utils/rpmStatus";
import { createErrorNotification, createSuccessNotification } from "../../../../utils/notifications";
import ConfirmAlasan from "../../common/ConfirmAlasan";

const TableActionPlan = ({
  id,
  nama,
  rekomendasi_kkpt,
  project_rpm_id,
  kkpt_id,
  lampiran,
  status_kode,
  signed_by,
  user_pn,
  approve,
  reject = () => null
}) => {
  const disabled = status_kode !== STATUS.PENDING_SIGNER_AUDITEE

  const columns = [
    {
      title: "Lampiran",
      dataIndex: "attachment",
      width: "50%",
      editable: true,
      align: "center",
      render: (val) => {
        const [url, name] = val ? val.split("@") : []
        if (url && name) {
          return (
            <a className="underline" href={url} target="_blank" rel="noreferrer" >{name}</a>
          )
        }
        else {
          return <p className="text-primary-red">URL not valid</p>
        }
      }
    },
    {
      title: "Deskripsi",
      dataIndex: "deskripsi",
      width: "50%",
      editable: true,
      align: "center",
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <Table
        bordered
        size="small"
        columns={columns}
        pagination={false}
        dataSource={lampiran}
        scroll={{ y: 200 }}
        locale={{
          emptyText: (
            <span className="text-black">
              Anda belum mengunggah lampiran, untuk mengunggah lampiran, klik tombol “Tambah Lampiran” di bawah tabel ini.
            </span>)
        }}
      />
      <SignerActions
        statusDisabled={disabled || (signed_by && signed_by.includes(String(user_pn)))}
        approve={async (alasan) => {
          const success = approve(
            project_rpm_id,
            kkpt_id,
            rekomendasi_kkpt,
            {
              id: id,
              nama: nama
            },
            true,
            alasan
          )
          return success
        }}
        reject={async (alasan) => {
          const success = await reject(
            project_rpm_id,
            kkpt_id,
            rekomendasi_kkpt,
            {
              id: id,
              nama: nama
            },
            false,
            alasan
          )
          return success
        }}
      />
    </div>
  );
};

const SignerActions = ({ statusDisabled, approve, reject }) => {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="flex justify-end items-center gap-4">
      <Button
        style={{ borderRadius: "10px" }}
        disabled={statusDisabled || submitted}
        onClick={() => ConfirmAlasan(async (alasan) => {
          const success = await reject(alasan)
          if (success) {
            setSubmitted(true)
            createSuccessNotification("Action Plan", "Berhasil reject action plan")()
          } else {
            createErrorNotification("Action Plan", "Gagal reject action plan")()
          }
          return success
        }, "Apakah Anda yakin menolak data ini? Berikan alasannya!")}
      >
        Reject
      </Button>
      <Button
        type="primary"
        style={{ borderRadius: "10px" }}
        disabled={statusDisabled || submitted}
        onClick={() => ConfirmAlasan(async (alasan) => {
          const success = await approve(alasan)
          if (success) {
            setSubmitted(true)
            createSuccessNotification("Action Plan", "Berhasil approve action plan")()
          } else {
            createErrorNotification("Action Plan", "Gagal approve action plan")()
          }
          return success
        }, "Apakah Anda yakin menyetujui data ini? Berikan alasannya!")}
      >
        Approve
      </Button>
    </div>
  )
}

const mapDispatchToProps = {
  approve: approveActionPlanSigner,
  reject: rejectActionPlanSigner
}

const mapStateToProps = state => ({
  user_pn: getUserPN(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(TableActionPlan);