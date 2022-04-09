import { Card, Button } from "antd";
import { BankOutlined, SettingOutlined } from "@ant-design/icons";

const CardPAT = ({
  tahun,
  aiw = {},
  aikp = {},
  aiti = {},
  onClickEdit = () => null,
  canEdit = false,
}) => {
  return (
    <Card
      title={`PAT ${tahun}`}
      headStyle={{ color: "#3C64B1", fontSize: "18px", fontWeight: "500" }}
      extra={canEdit &&
        <div className="flex flex-raw">
          <Button
            icon={<SettingOutlined />}
            style={{ border: "none" }}
            onClick={() => onClickEdit()}
          />
        </div>
      }
    >
      <div className="space-y-2">
        <div className="grid grid-cols-2">
          <div className="flex items-center gap-2">
            <BankOutlined />
            <p>AIKP</p>
          </div>
          <p>{aikp.count} Kantor Audit</p>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex items-center gap-2">
            <BankOutlined />
            <p>AITI</p>
          </div>
          <p>{aiti.count} Kantor Audit</p>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex items-center gap-2">
            <BankOutlined />
            <p>AIW</p>
          </div>
          <p>{aiw.count} Kantor Audit</p>
        </div>
      </div>
    </Card>
  );
};

export default CardPAT;
