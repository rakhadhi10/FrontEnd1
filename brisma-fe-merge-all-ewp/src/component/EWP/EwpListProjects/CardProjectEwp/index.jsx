import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Progress, Typography, Card, Menu, Dropdown } from "antd";
import MemberTim from "./MemberTim";
import DocumentStatus from "./DocumentStatus";
import AddendumStatus from "./AddendumStatus";
import ProjectType from "./ProjectType";
import ProjectStatus from "./ProjectStatus";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";

export default function CardProjectEwp({
  id,
  project_id,
  project_name,
  type,
  tim_audit,
  addendum,
  status_name = "mapa",
  start_date,
  end_date,
  disabled,
  role,
}) {
  const navigate = useNavigate();

  const persetageProses = (value) => {
    switch (value) {
      case "mapa":
        return 20;
      case "final":
        return 100;
      default:
        return 0;
    }
  };

  const DropdownHeaderAdmin = () => {
    return (
      <Menu>
        <Menu.Item key={0} className="space-x-2">
          <EditOutlined />
          <p>Ubah KTA</p>
        </Menu.Item>
        <Menu.Item key={1} className="space-x-2" danger>
          <DeleteOutlined />
          <p>Delete Project</p>
        </Menu.Item>
      </Menu>
    );
  };

  const ActionHeaderAdmin = () => {
    return (
      <Dropdown overlay={DropdownHeaderAdmin} trigger={["click"]}>
        <SettingOutlined className="cursor-pointer" />
      </Dropdown>
    );
  };

  return (
    <>
      <Card
        hoverable={disabled ? false : true}
        title={
          <div className="flex flex-wrap justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-bold text-lg" style={{ color: "#3C64B1" }}>
                {project_id}
              </h2>
              <ProjectType type={type} />
            </div>
            <div>
              {role === "admin" ? (
                <ActionHeaderAdmin />
              ) : (
                <Button
                  icon={<DeleteOutlined className="text-lg text-primary-red" />}
                  ghost
                />
              )}
            </div>
          </div>
        }
        onClick={() => {
          !disabled && navigate(`/ewp/audit-info/${id}`);
        }}
        style={{ backgroundColor: disabled ? "#C4C4C4" : "white" }}
      >
        <h3 className="py-4 text-sm text-secondary-light-black italic">
          {project_name}
        </h3>
        <div className="mt-4 space-y-1">
          {Array.isArray(tim_audit) ? (
            tim_audit.map((item) => (
              <MemberTim name={item.nama} position={item.posisi_kode} />
            ))
          ) : (
            <>
              {tim_audit.ma && (
                <MemberTim name={tim_audit.ma.nama} position="ma" />
              )}
              {tim_audit.kta && (
                <MemberTim name={tim_audit.kta.nama} position="kta" />
              )}
              {tim_audit.ata &&
                tim_audit.ata.map((item) => (
                  <MemberTim name={item.nama} position="ata" />
                ))}
            </>
          )}
        </div>
        <div className="mt-4">
          <Progress percent={persetageProses(status_name)} strokeWidth="4px" />
        </div>
        <div className="grid grid-cols-2">
          <div className="">
            <ProjectStatus status={status_name} />
            <DocumentStatus status="draft" />
            <AddendumStatus num={addendum} />
          </div>
          <div className="justify-self-end self-end">
            <p className="text-sm">
              <Typography.Text type="secondary">
                <Moment date={start_date} format="DD-MM-YYYY" /> sd{" "}
                <Moment date={end_date} format="DD-MM-YYYY" />
              </Typography.Text>
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
