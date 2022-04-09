import { Button, Select, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { approveActionPlanMaker } from "../../../../../store/ducks/RPMAuditor/actions";
import STATUS from "../../../../../utils/rpmStatus";
import { createErrorNotification, createSuccessNotification } from "../../../../utils/notifications";
import ConfirmSubmit from "../../common/maker/ConfirmSubmit";

const TableActionPlan = ({
  id,
  nama,
  rekomendasi_kkpt,
  project_rpm_id,
  kkpt_id,
  lampiran = [],
  hasil_evaluasi,
  status_kode,
  submit
}) => {
  const disabled = status_kode !== STATUS.PENDING_MAKER_AUDITOR

  const [evaluasi, setEvaluasi] = useState(hasil_evaluasi)
  useEffect(() => setEvaluasi(hasil_evaluasi), [hasil_evaluasi])

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
      <MakerActions
        statusDisabled={disabled}
        evaluasi={evaluasi}
        setEvaluasi={setEvaluasi}
        submit={async () => {
          return await submit(
            project_rpm_id,
            kkpt_id,
            rekomendasi_kkpt,
            {
              id: id,
              nama: nama
            },
            evaluasi
          )
        }}
      />
    </div>
  );
};

const MakerActions = ({ evaluasi, setEvaluasi, statusDisabled, submit }) => {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="flex justify-end items-center gap-4">
      <div className="flex items-center gap-4">
        <p>Hasil Evaluasi:</p>
        <Select
          className="w-48"
          defaultValue={evaluasi}
          disabled={statusDisabled || submitted}
          onChange={(val) => setEvaluasi(val)}
        >
          <Select.Option value="Memadai">Memadai</Select.Option>
          <Select.Option value="Tidak Memadai">Tidak Memadai</Select.Option>
          <Select.Option value="Dalam Pemantauan">Dalam Pemantauan</Select.Option>
        </Select>
      </div>
      <Button
        type="primary"
        disabled={statusDisabled || submitted}
        style={{ borderRadius: "10px" }}
        onClick={() => ConfirmSubmit(async () => {
          const success = await submit()
          if (success) {
            setSubmitted(true)
            createSuccessNotification("Action Plan", "Berhasil submit action plan")()
          } else {
            createErrorNotification("Action Plan", "Gagal submit action plan")()
          }
          return success
        })}
      >
        Submit
      </Button>
    </div>
  )
}

const mapDispatchToProps = {
  submit: approveActionPlanMaker
}

export default connect(null, mapDispatchToProps)(TableActionPlan);