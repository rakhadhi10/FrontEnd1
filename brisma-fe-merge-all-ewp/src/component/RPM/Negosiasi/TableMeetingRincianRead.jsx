import { Button, Table } from "antd";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { approveRejectNego } from "../../../store/ducks/RPMNegosiasi/actions";
import { createErrorNotification, createSuccessNotification } from "../../utils/notifications";
import ConfirmAlasan from "./ConfirmAlasan";

const TableMeetingRincian = ({ data = [], isOnMA, approveRejectNego, fetchActionPlanNego }) => {
  const { id, kkpt_id } = useParams()
  const [submitted, setSubmitted] = useState(false)

  const [mockData, setMockData] = useState(data)
  useEffect(() => setMockData(data), [data])

  const mappedData = mockData.map(d => {
    return d.action_plan ? d.action_plan.map((a, idx) => ({
      key: `${d.id},${a.id}`,
      rekomendasi: {
        ...d,
        head: idx === 0,
      },
      action_plan: a.nama,
      batas_waktu: moment(a.batas_waktu),
    })) : []
  }).flat().sort((a, b) => a.rekomendasi.id - b.rekomendasi.id)

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      align: "center",
      render: (a, b, idx) => idx + 1
    },
    {
      title: "Rekomendasi",
      dataIndex: "rekomendasi",
      render: (r, rec) => {
        const obj = {
          props: { rowSpan: r.head ? rec.rekomendasi.action_plan.length : 0 },
          children: (
            <div>
              <p>{r.nama}</p>
            </div>
          )
        }
        return obj
      },
    },
    {
      title: "Action Plan",
      dataIndex: "action_plan",
      editable: true,
      render: (text, idx) => {
        return text
      }

    },
    {
      title: "Batas Waktu",
      dataIndex: "batas_waktu",
      editable: true,
      align: "center",
      render: (m) => m.format("DD MMMM YYYY")
    },
  ];

  return (
    <div className="w-full">
      <Table
        dataSource={mappedData}
        columns={columns}
        pagination={false}
      />
      <div className="flex justify-end gap-4 my-10">
        <Button
          disabled={submitted || !isOnMA}
          onClick={() => {
            ConfirmAlasan(async (alasan) => {
              const error = await approveRejectNego(id, kkpt_id, false, alasan)
              if (!error) {
                setSubmitted(true)
                createSuccessNotification("Negosiasi", "Berhasil reject rincian negosiasi")()
                fetchActionPlanNego(id, kkpt_id)
              }
              else createErrorNotification("Negosiasi", "Gagal reject rincian negosiasi")()
              return !error
            }, "Apakah Anda yakin menolak data ini? Berikan alasannya!")
          }}
        >
          Reject
        </Button>
        <Button
          type="primary"
          disabled={submitted || !isOnMA}
          onClick={() => {
            ConfirmAlasan(async (alasan) => {
              const error = await approveRejectNego(id, kkpt_id, true, alasan)
              if (!error) {
                setSubmitted(true)
                createSuccessNotification("Negosiasi", "Berhasil approve rincian negosiasi")()
                fetchActionPlanNego(id, kkpt_id)
              }
              else createErrorNotification("Negosiasi", "Gagal approve rincian negosiasi")()
              return !error
            }, "Apakah Anda yakin menyetujui data ini? Berikan alasannya!")
          }}
        >
          Approve
        </Button>
      </div>
    </div>
  )
};

const mapDispatchToProps = {
  approveRejectNego: approveRejectNego
}

export default connect(null, mapDispatchToProps)(TableMeetingRincian)
