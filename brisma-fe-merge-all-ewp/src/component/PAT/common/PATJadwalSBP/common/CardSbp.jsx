import { connect } from "react-redux";
import { useState } from "react";
import { Button, Space, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import confirmDelete from "../../../../utils/confirmDelete";
import IDCurrencyFormat from "../../../../IDCurrencyFormat";
import { getUserPN } from "../../../../../store/ducks/auth/selectors";
import { createErrorNotification, createSuccessNotification } from "../../../../utils/notifications";
import { dateToCardDateString } from "../../../../../utils/momentHelpers";
import { getAllStatus, getMakerAddendumPN } from "../../../../../store/ducks/PATProject/selectors";

const showSuccessNotif = createSuccessNotification("Jadwal Consulting", "Berhasil menghapus jadwal consulting")
const showErrorNotif = createErrorNotification("Jadwal Consulting", "Gagal menghapus jadwal consulting")

const EditButton = ({ onEdit = () => null, ...props }) => {
  const [fetchLoading, setFetchLoading] = useState(false)

  return (
    <Button
      {...props}
      icon={<EditOutlined />}
      style={{ border: "none", margin: 0 }}
      loading={fetchLoading}
      onClick={async () => {
        setFetchLoading(true)
        const error = await onEdit()
        if (error) createErrorNotification("Edit Jadwal Consulting", error)()
        setFetchLoading(false)
      }}
    />
  );
};

export function CardSbp({
  isAdendum,
  addendum,
  deleteJadwalSbp,
  openEditModal,
  id,
  orgeh_name,
  orgeh_induk,
  branch_induk,
  sbp_name,
  pelaksanaan_start,
  pelaksanaan_end,
  nama_pic_maker_jadwal_sbp,
  pn_pic_maker_jadwal_sbp,
  total_anggaran,
  pembicara,
  penanggung_jawab,
  canEdit
}) {
  return (
    <div className="bg-white p-4">
      <div className="flex items-start justify-between">
        <Typography.Title level={4} style={{ margin: 0, padding: 0 }} className="pb-4">
          <p className={`${isAdendum ? "text-red-500" : "text-primary-blue"} capitalize font-normal p-0 m-0 truncate`}>
            {orgeh_name && orgeh_name.toLowerCase()}
          </p>
        </Typography.Title>
        {canEdit &&
          <div className="text-lg flex gap-2">
            <EditButton onEdit={openEditModal} />
            <Button
              icon={<DeleteOutlined />}
              danger
              style={{ border: "none", margin: 0 }}
              onClick={confirmDelete(
                "Hapus Jadwal SBP",
                <p className="font-semibold py-4">Apakah anda yakin akan menghapus Jadwal SBP ini?</p>,
                async () => {
                  const success = await deleteJadwalSbp()
                  if (success) showSuccessNotif()
                  else showErrorNotif()
                }
              )}
            />
          </div>
        }
      </div>
      <p style={{ color: "#E38C3B" }}>{sbp_name}</p>
      <Space direction="vertical" className="pt-4">
        <p>
          <Typography.Text type="secondary">
            {dateToCardDateString(pelaksanaan_start)} sd {dateToCardDateString(pelaksanaan_end)}
          </Typography.Text>
        </p>
        <p className="italic">Maker: {nama_pic_maker_jadwal_sbp}</p>
      </Space>
      <div className="mt-4">
        {pembicara.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <div style={{ backgroundColor: "#8BF1EB" }} className="w-1 h-1 rounded-full" />
            <Typography.Text strong>
              {item.nama} ({item.jabatan})
            </Typography.Text>
          </div>
        ))}
      </div>
      <div className="my-4">
        {penanggung_jawab.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <div style={{ backgroundColor: "#8490F8" }} className="w-1 h-1 rounded-full" />
            <Typography.Text type="secondary">
              {item.nama} ({item.jabatan})
            </Typography.Text>
          </div>
        ))}
      </div>
      <IDCurrencyFormat
        value={total_anggaran}
        renderText={value => (
          <Typography.Text type="secondary">Rencana anggaran: {value}</Typography.Text>
        )}
      />
    </div>
  );
}

const mapDispatchToProps = null

const mapStateToProps = (state, ownProps) => {
  const isAddendum = ownProps.addendum
  const userPN = Number(getUserPN(state))
  let canEdit = false

  if (isAddendum) {
    canEdit = userPN === Number(getMakerAddendumPN(state))
  }
  else {
    const isSameMaker = userPN === Number(ownProps.pn_pic_maker_jadwal_sbp)
    const isFinal = getAllStatus(state).status_kode === "7"
    canEdit = !isFinal && isSameMaker
  }
  return { canEdit }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardSbp)