import { connect } from "react-redux";
import { useState } from "react";
import { Card, Button, Avatar, Space, Popover } from "antd";
import { DeleteOutlined, FormOutlined, UserOutlined } from "@ant-design/icons";
import TableCardJadwalAudit from "./TableCardJadwalAudit";
import confirmDelete from "../../../utils/confirmDelete";
import IDCurrencyFormat from "../../../IDCurrencyFormat";
import { createErrorNotification, createSuccessNotification } from "../../../utils/notifications";
import { getUserPN } from "../../../../store/ducks/auth/selectors";
import { dateToCardJadwalAuditDateString } from "../../../../utils/momentHelpers";
import { getAllStatus, getMakerAddendumPN } from "../../../../store/ducks/PATProject/selectors";

const ExtraHeadCard = ({ onEdit = () => null, onDelete = () => null }) => {
  const [fetchLoading, setFetchLoading] = useState(false)

  return (
    <div className="flex flex-raw">
      <Button
        icon={<FormOutlined />}
        style={{ border: "none", color: "#3C64B1" }}
        loading={fetchLoading}
        onClick={async () => {
          setFetchLoading(true)
          const error = await onEdit()
          if (error) createErrorNotification("Edit Jadwal Audit", error)()
          setFetchLoading(false)
        }}
      />
      <Button
        icon={<DeleteOutlined />}
        danger
        style={{ border: "none" }}
        onClick={onDelete}
      />
    </div>
  );
};

const CardTitle = ({ type, date }) => {
  let bgColor = "#C0D4F3";
  if (typeof type === "string") {
    if (type.includes("Regular")) bgColor = "#C0D4F3";
    if (type.includes("Special")) bgColor = "#c6c0f3";
    if (type.includes("Tematik")) bgColor = "#C0EEF3"
  }

  return (
    <div className="flex flex-row justify-start items-center">
      <p
        style={{ backgroundColor: bgColor }}
        className="text-xs w-min font-mulish font-thin text-black px-4 py-1 rounded bg-secondary-blue"
      >
        {type}
      </p>
      <p className="text-xs font-mulish italic font-normal text-primary-gray px-4">{date}</p>
    </div>
  );
};

const successDeleteNotif = createSuccessNotification("Jadwal Audit", "Berhasil menghapus jadwal audit")
const errorDeleteNotif = createErrorNotification("Jadwal Audit", "Gagal menghapus jadwal audit")

const CardJadwalAudit = ({
  jadwal_audit: {
    id,
    pat_id,

    nama_kegiatan,

    pn_pic_jadwal_audit,
    nama_pic_jadwal_audit,
    jabatan_pic_jadwal_audit,

    pn_kta,
    nama_kta,
    jabatan_kta,

    pn_ma,
    jabatan_ma,
    nama_ma,

    ata,

    tim_id,
    tim_audit_name,

    tipe_audit,
    total_anggaran,

    pelaksanaan_end,
    pelaksanaan_start,

    uka
  },
  targetAudit,
  deleteJadwalAudit,
  openEditModal,
  objekAudit,
  canEdit
}) => {
  return (
    <Card
      title={
        <CardTitle
          type={tipe_audit}
          date={dateToCardJadwalAuditDateString(pelaksanaan_start, "YYYY-MM-DD") + " sd " + dateToCardJadwalAuditDateString(pelaksanaan_end, "YYYY-MM-DD")}
        />
      }
      extra={canEdit &&
        <ExtraHeadCard
          onDelete={confirmDelete(
            "Hapus Jadwal Audit",
            <p className="font-semibold py-4">Apakah anda yakin akan menghapus Jadwal Audit ini?</p>,
            async () => {
              const success = await deleteJadwalAudit(pat_id, id)
              if (success) successDeleteNotif()
              else errorDeleteNotif()
            }
          )}
          onEdit={async () => await openEditModal(id, pat_id)}
        />
      }
    >
      <p className="text-sm font-mulish italic font-normal text-secondary-light-black mb-5">
        {nama_kegiatan}
      </p>
      <p className="text-sm italic mb-5">
        Maker: {nama_pic_jadwal_audit}
      </p>
      <div className="py-2">
        <p className="text-sm font-mulish font-bold text-gray-500">Tim Audit</p>
        <div className="flex flex-row justify-start items-center">
          <p className="text-sm font-mulish font-bold text-primary-blue px-4">{tim_audit_name}</p>
          <Space>
            <Avatar.Group size="large">
              <Popover content={(<p>{nama_ma}</p>)} trigger="hover">
                <Avatar
                  style={{
                    backgroundColor: "#C9EEFA",
                  }}
                  icon={<UserOutlined />}
                />
              </Popover>
            </Avatar.Group>
            <Avatar.Group size="large">
              <Popover content={(<p>{nama_kta}</p>)} trigger="hover">
                <Avatar
                  style={{
                    backgroundColor: "#FAD6D8",
                  }}
                  icon={<UserOutlined />}
                />
              </Popover>
            </Avatar.Group>
            <Avatar.Group size="large" className="flex flex-wrap justify-start">
              {ata.map(a => (
                <Popover
                  key={a.id_ata || a.pn}
                  content={(<p>{a.nama_ata || a.name || a.nama}</p>)}
                  trigger="hover"
                >
                  <Avatar
                    style={{
                      backgroundColor: "#E0FAD6",
                    }}
                    icon={<UserOutlined />}
                  />
                </Popover>
              ))}
            </Avatar.Group>
          </Space>
        </div>
      </div>
      <div className="py-2">
        <p className="text-sm font-mulish font-bold text-gray-500">Anggaran</p>
        <IDCurrencyFormat
          value={total_anggaran}
          prefix="Rp. "
          suffix={",-"}
          renderText={value => (
            <p className="text-sm font-mulish font-bold text-primary-blue px-4 py-1">
              {value}
            </p>
          )}
        />
      </div>
      <div className="py-2">
        <p className="text-sm font-mulish font-bold text-gray-500">Object Audit</p>
        <TableCardJadwalAudit data={objekAudit} />
      </div>
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => {
  const isAddendum = ownProps.addendum
  const pn_user = Number(getUserPN(state))
  let canEdit = false

  if (isAddendum) {
    canEdit = pn_user === Number(getMakerAddendumPN(state))
  }
  else {
    const pn_maker = Number(ownProps.jadwal_audit.pn_pic_jadwal_audit)
    const isSameMaker = pn_maker === pn_user
    const isFinal = getAllStatus(state).status_kode === "7"
    canEdit = !isFinal && isSameMaker
  }
  return { canEdit }

}

export default connect(mapStateToProps)(CardJadwalAudit);
