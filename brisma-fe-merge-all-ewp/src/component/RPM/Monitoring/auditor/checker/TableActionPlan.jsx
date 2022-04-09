import { Button, Select, Table } from "antd";
import { useState } from "react";
import { connect } from "react-redux";
import { approveActionPlanChecker, rejectActionPlanChecker } from "../../../../../store/ducks/RPMAuditor/actions";
import STATUS from "../../../../../utils/rpmStatus";
import { createErrorNotification, createSuccessNotification } from "../../../../utils/notifications";
import ConfirmAlasan from "../../common/ConfirmAlasan";

const TableActionPlan = ({
  id,
  nama,
  rekomendasi_kkpt,
  project_rpm_id,
  kkpt_id,
  lampiran = [],
  hasil_evaluasi,
  status_kode,
  approve,
  reject
}) => {
  const disabled = status_kode !== STATUS.PENDING_CHECKER_AUDITOR

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
      <CheckerActions
        evaluasi={hasil_evaluasi}
        statusDisabled={disabled}
        approve={async (alasan) => {
          return await approve(
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

        }}
        reject={async (alasan) => {
          return await reject(
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

        }}
      />
    </div>
  );
};

const CheckerActions = ({ evaluasi, statusDisabled, approve, reject }) => {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="flex justify-end items-center gap-4">
      <div className="flex items-center gap-4">
        <p>Hasil Evaluasi:</p>
        <Select className="w-48" disabled defaultValue={evaluasi}>
          <Select.Option value="Memadai">Memadai</Select.Option>
          <Select.Option value="Tidak Memadai">Tidak Memadai</Select.Option>
          <Select.Option value="Dalam Pemantauan">Dalam Pemantauan</Select.Option>
        </Select>
      </div>
      <Button
        disabled={statusDisabled || submitted}
        style={{ borderRadius: "10px" }}
        onClick={() => ConfirmAlasan(async (alasan) => {
          const success = await reject(alasan)
          if (success) {
            setSubmitted(true)
            createSuccessNotification("Action Plan", "Berhasil reject action plan")()
          } else {
            createErrorNotification("Action Plan", "Gagal reject action plan")()
          }
          return success
        })}
      >
        Reject
      </Button>
      <Button
        type="primary"
        disabled={statusDisabled || submitted}
        style={{ borderRadius: "10px" }}
        onClick={() => ConfirmAlasan(async (alasan) => {
          const success = await approve(alasan)
          if (success) {
            setSubmitted(true)
            createSuccessNotification("Action Plan", "Berhasil approve action plan")()
          } else {
            createErrorNotification("Action Plan", "Gagal approve action plan")()
          }
          return success
        })}
      >
        Approve
      </Button>
    </div>
  )
}

const mapDispatchToProps = {
  approve: approveActionPlanChecker,
  reject: rejectActionPlanChecker
}

export default connect(null, mapDispatchToProps)(TableActionPlan);