import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Dropdown, Menu, Progress } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { openModal } from "../../../../../store/ducks/PATListProjects/actions";
import AddendumStatus from "./AddendumStatus";
import ApprovalStatus from "./ApprovalStatus";
import DocumentStatus from "./DocumentStatus";
import { getUserRoleCodes } from "../../../../../store/ducks/auth/selectors";
import { ADMIN_UKA } from "../../../../../views/routes/allowedRoles";

export function CardProject({
  id,
  kode,
  tahun,
  riwayat_adendum,
  status_kode,
  nama_status,
  nama_persetujuan,
  pat_name,
  uka_nama,
  isAdmin,
  onClickEdit,
  onClickDoc,
  onClickDetails
}) {
  const stopPropagation = (e, func = () => null) => {
    e.stopPropagation()
    func()
  }

  const menu = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={(e) => stopPropagation(e.domEvent, () => onClickEdit(id))}
        disabled={!isAdmin}
      >
        Change Maker
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={(e) => stopPropagation(e.domEvent, onClickDoc)}
      >
        Document History
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={(e) => stopPropagation(e.domEvent, onClickDetails)}
      >
        Project Details
      </Menu.Item>
    </Menu>
  );

  return (
    <Link to={`/pat/projects/${id}`}>
      <div
        className="bg-white p-4 rounded-md cursor-pointer hover:bg-primary-blue hover:bg-opacity-5"
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg" style={{ color: "#3C64B1" }}>
            {tahun}
          </h2>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              icon={<SettingOutlined className="text-gray-500" style={{ display: "block", verticalAlign: "baseline" }} />}
              type="button"
              onClick={(e) => stopPropagation(e)}
            />
          </Dropdown>
        </div>
        <h3 className="font-semibold text-sm text-secondary-light-black">{pat_name}</h3>
        <div className="mt-8">
          <Progress percent={Math.round(Number(status_kode) / 7 * 100)} strokeWidth="4px" />
        </div>
        <div className="mt-4 space-y-2">
          <DocumentStatus status={nama_status} />
          <ApprovalStatus status={nama_persetujuan} />
          <AddendumStatus num={riwayat_adendum} />
        </div>
      </div>
    </Link>
  );
}

const mapStateToProps = state => ({
  isAdmin: getUserRoleCodes(state).includes(ADMIN_UKA)
})

const mapDispatchToProps = {
  onClickEdit: openModal
}

export default connect(mapStateToProps, mapDispatchToProps)(CardProject)