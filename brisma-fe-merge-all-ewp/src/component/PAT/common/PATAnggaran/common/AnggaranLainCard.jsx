import React from "react";
import { connect } from "react-redux";
import { Button, Card } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import IDCurrencyFormat from "../../../../IDCurrencyFormat";
import confirmDelete from "../../../../utils/confirmDelete";
import { createErrorNotification, createSuccessNotification } from "../../../../utils/notifications";
import { getUserPN } from "../../../../../store/ducks/auth/selectors";
import { dateToCardDateString } from "../../../../../utils/momentHelpers";
import { getAllStatus, getMakerAddendumPN } from "../../../../../store/ducks/PATProject/selectors";

const showSuccessNotif = createSuccessNotification("Anggaran Lain", "Berhasil menghapus anggaran")
const showErrorNotif = createErrorNotification("Anggaran Lain", "Gagal menghapus anggaran")

export const AnggaranLainCard = ({
  isAdendum,
  addendum,
  id,
  nama_kegiatan,
  branch_induk,
  orgeh_induk,
  orgeh_name,
  total_anggaran,
  pn_pic_maker_kegiatan_lain,
  nama_pic_maker_kegiatan_lain,
  pelaksanaan_start,
  pelaksanaan_end,
  anggota,
  canEdit,
  deleteKegiatan,
  openEditModal
}) => {
  return (
    <Card
      headStyle={{ color: isAdendum ? "#ED0000" : "#3C64B1", fontSize: "18px", fontWeight: "400" }}
      title={nama_kegiatan}
      extra={canEdit &&
        <div className="flex">
          <Button
            icon={<EditOutlined />}
            style={{ border: "none", margin: 0 }}
            onClick={() => openEditModal()}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            style={{ border: "none", margin: 0 }}
            onClick={confirmDelete(
              `Kegiatan Lain-Lain ${orgeh_name}`,
              <p className="font-semibold py-4">Apakah anda yakin ingin menghapus kegiatan ini?</p>,
              async () => {
                const success = await deleteKegiatan()
                if (success) showSuccessNotif()
                else showErrorNotif()
              }
            )}
          />
        </div>
      }
    >
      <div className="flex flex-col justify-start font-mulish">
        <p className="text-xs text-gray-400 pb-4">
          {dateToCardDateString(pelaksanaan_start)} sd {dateToCardDateString(pelaksanaan_end)}
        </p>
        <div className="pb-4">
          {anggota.map(p => (
            <div className="flex items-center gap-2">
              <div style={{ backgroundColor: "#8490F8" }} className="w-1 h-1 rounded-full" />
              <p className="text-xs text-gray-500 font-light ">{p.nama} ({p.jabatan})</p>
            </div>
          ))}
        </div>
        <IDCurrencyFormat
          value={total_anggaran}
          renderText={value => (
            <p className="text-xs text-gray-400 pb-4">Rencana anggaran : {value}</p>
          )}
        />
        <span className="px-2 py-1 w-max text-white font-mulish text-xs bg-primary-purple">Lain-Lain</span>
      </div>
    </Card>
  );
};

const mapDispatchToProps = null

const mapStateToProps = (state, ownProps) => {
  const isAddendum = ownProps.addendum
  const pn_user = Number(getUserPN(state))
  let canEdit = false

  if (isAddendum) {
    canEdit = pn_user === Number(getMakerAddendumPN(state))
  }
  else {
    const pn_maker = Number(ownProps.pn_pic_maker_kegiatan_lain)
    const isSameMaker = pn_maker === pn_user
    const isFinal = getAllStatus(state).status_kode === "7"
    canEdit = !isFinal && isSameMaker
  }
  return { canEdit }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnggaranLainCard);
