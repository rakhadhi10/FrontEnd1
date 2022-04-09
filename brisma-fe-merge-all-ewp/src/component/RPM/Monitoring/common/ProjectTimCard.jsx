import { Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";

const AvatarTim = ({ role, pn, nama, type }) => {
  let color = "";
  switch (role) {
    case "MA":
      color = "#C9EEFA";
      break;
    case "KTA":
      color = "#FAD6D8";
      break;
    case "ATA":
      color = "#E0FAD6";
      break;
    default:
      color = "#E0FAD6";
  }

  return (
    <div className="flex justify-start items-center">
      <Avatar
        style={{
          backgroundColor: color,
        }}
        icon={<UserOutlined />}
      />
      <p className="text-xs font-mulish font-light text-gray-500 px-2">
        {pn} - {nama} - {type}
      </p>
    </div>
  );
};

export const ProjectTimCard = ({
  num_project,
  makers_auditee,
  checkers_auditee,
  signers_auditee,
  tim_audit,
}) => {
  const cardData = []

  if (signers_auditee) {
    signers_auditee.forEach(s => {
      cardData.push({
        pn: s.pn,
        nama: s.nama,
        type: "Signer",
        role: "MA"
      })
    })
  }

  if (checkers_auditee) {
    checkers_auditee.forEach(c => {
      cardData.push({
        pn: c.pn,
        nama: c.nama,
        type: "Checker",
        role: "KTA"
      })
    })
  }

  if (makers_auditee) {
    makers_auditee.forEach(m => {
      cardData.push({
        pn: m.pn,
        nama: m.nama,
        type: "Maker",
        role: "ATA"
      })
    })
  }

  return (
    <Card style={{ overflow: "hidden", borderRadius: "15px" }}>
      <div className="flex gap-6">
        <div className="flex flex-col justify-start font-mulish w-1/4">
          <p className="text-xl text-primary-blue font-semibold">{num_project}</p>
          <p className="text-secondary-light-black">{tim_audit && tim_audit[0].nama_tim}</p>
        </div>
        <div className="grid-flow-col grid-rows-2 grid gap-4 w-3/4">
          {cardData.map((item) => (
            <AvatarTim pn={item.pn} nama={item.nama} type={item.type} role={item.role} />
          ))}
        </div>
      </div>
    </Card>
  );
};
