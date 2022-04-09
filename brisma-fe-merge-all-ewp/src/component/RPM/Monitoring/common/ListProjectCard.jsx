import React from "react";
import moment from "moment";
import { Button, Card, Dropdown, Menu } from "antd";
import { BsGear } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getUserPN } from "../../../../store/ducks/auth/selectors";
import { connect } from "react-redux";
import { createNegosiasi } from "../../../../store/ducks/RPMAuditor/actions";
import { createErrorNotification, createSuccessNotification } from "../../../utils/notifications";

const ListProjectCard = ({
  type,
  canAssign,

  projectID,
  batasWaktu,
  memadai,
  tidakMemadai,
  dalamPemantauan,
  onClick,
  showAssign,
  showDetail,

  id,
  nama_project,
  num_project,
  status_project,
  num_evaluasi,
  batas_waktu,
  status,
  pic_auditee,

  createNegosiasi
}) => {
  let navigate = useNavigate();

  const stopPropagation = async (e, func = () => null) => {
    e.stopPropagation()
    await func()
  }

  const menu = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={(e) => stopPropagation(e.domEvent, navigate(`/rpm/auditee/projects/${id}`))}
      >
        Open
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={(e) => stopPropagation(e.domEvent, canAssign ? showAssign : undefined)}
        disabled={!canAssign}
      >
        Assign to...
      </Menu.Item>
      <Menu.Item
        key="2"
        disabled={status_project === "On Progress"}
        onClick={(e) => stopPropagation(e.domEvent, async () => {
          if (type === "auditor" && status_project === "Final") {
            const success = await createNegosiasi(id)
            if (success) {
              createSuccessNotification("Negosiasi", "Berhasil inisiasi negosiasi")()
              navigate(`/rpm/negosiasi/${id}`)
            } else {
              createErrorNotification("Negosiasi", "Gagal inisiasi negosiasi")()
            }
          } else {
            navigate(`/rpm/negosiasi/${id}`)
          }
        })}
      >
        Negosiasi Rekomendasi
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={(e) => stopPropagation(e.domEvent, showDetail)}
      >
        Project Details
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={(e) => stopPropagation(e.domEvent, () => {
          if (type === "auditor") {
            navigate(`/rpm/auditor/projects/${id}/riwayat-dokumen`)
          } else {
            navigate(`/rpm/auditee/projects/${id}/riwayat-dokumen`)
          }
        })}
      >
        Document History
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      hoverable
      onClick={() => onClick(id)}
      title={
        <div className="flex justify-between items-center">
          <div className="font-mulish">
            <p className="text-xl text-primary-blue font-semibold">{num_project}</p>
            <p className="text-secondary-light-black"> {nama_project}</p>
          </div>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              icon={<BsGear className="text-gray-500" style={{ display: "inline-block", verticalAlign: "baseline" }} />}
              type="button"
              onClick={(e) => stopPropagation(e)}
            />
          </Dropdown>
        </div>
      }
    >
      <div>
        <p className="text-xs font-mulish font-light text-gray-500">
          BATAS WAKTU: {moment(batas_waktu).format("DD MMMM YYYY")}
        </p>
        <div className="my-4">
          <div className="flex justify-between text-secondary-light-black font-mulish font-semibold">
            <p>Memadai</p>
            <p>{status["Memadai"]}</p>
          </div>
          <div className="flex justify-between text-secondary-light-black font-mulish font-semibold">
            <p>Tidak Memadai</p>
            <p>{status["Tidak Memadai"]}</p>
          </div>
          <div className="flex justify-between text-secondary-light-black font-mulish font-semibold">
            <p>Dalam Pemantauan</p>
            <p>{status["Dalam Pemantauan"]}</p>
          </div>
        </div>
        <div className="flex justify-between text-xs text-secondary-light-black font-mulish font-semibold">
          <p>Status: {status_project}</p>
        </div>
      </div>
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => {
  let canAssign = false
  if (ownProps.type === "auditor") {
    canAssign = Number(getUserPN(state)) === Number(ownProps.tim_audit.find(t => t.title === "kta").pn)
  }
  else {
    canAssign = Number(getUserPN(state)) === Number(ownProps.pic_auditee.pn)
  }
  return { canAssign }
}

const mapDispatchToProps = {
  createNegosiasi: createNegosiasi
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProjectCard)
