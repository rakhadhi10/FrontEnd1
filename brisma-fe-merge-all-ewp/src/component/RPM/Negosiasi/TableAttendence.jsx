import { Button, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteAttendance } from "../../../store/ducks/RPMNegosiasi/actions";
import { getAttendance, getAttendanceError, getAttendanceLoading } from "../../../store/ducks/RPMNegosiasi/selectors";
import { createErrorNotification, createSuccessNotification } from "../../utils/notifications";

const DeleteAttendance = ({ deleteAttendance, is_closed, ...props }) => {
  const [loading, setLoading] = useState(false)

  return (
    <Button
      disabled={is_closed}
      loading={loading}
      icon={
        <FiTrash2
          className={!is_closed && "text-red-600 cursor-pointer"}
          style={{ display: "inline-block", verticalAlign: "baseline" }}
        />
      }
      onClick={async () => {
        setLoading(true)
        const error = await deleteAttendance()
        if (error) {
          createErrorNotification("Delete Attendance", error)()
        } else {
          createSuccessNotification("Delete Attendance", "Berhasil menghapus attendance")()
        }
        setLoading(false)
      }}
      {...props}
    />
  )
}

const TableAttendence = ({ loading, error, attendance, is_closed, deleteAttendance }) => {
  const { id } = useParams()

  const getData = () => {
    if (!attendance) return []
    return attendance.map((a, idx) => ({
      key: idx,
      pn: a.pn,
      nama: a.nama,
      jabatan: a.jabatan,
      uker: a.orgeh_name,
      tglAbsen: moment(a.tanggal_absen).format("DD MMMM YYYY hh:mm")
    }))
  }

  const columns = [
    { title: "PN", dataIndex: "pn", align: "center" },
    { title: "Nama", dataIndex: "nama", align: "center" },
    { title: "Jabatan", dataIndex: "jabatan", align: "center" },
    { title: "Tgl Absen", dataIndex: "tglAbsen", align: "center" },
    { title: "Unit Kerja", dataIndex: "uker", align: "center" },
    {
      title: "Delete",
      dataIndex: "delete",
      align: "center",
      render: (_, record) => <DeleteAttendance is_closed={is_closed} deleteAttendance={() => deleteAttendance(record.pn, id)} />
    },
  ];


  return <Table loading={loading} dataSource={getData()} columns={columns} pagination={false} />;
};

const mapDispatchToProps = {
  deleteAttendance: deleteAttendance
}

const mapStateToProps = state => ({
  loading: getAttendanceLoading(state),
  error: getAttendanceError(state),
  attendance: getAttendance(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(TableAttendence)