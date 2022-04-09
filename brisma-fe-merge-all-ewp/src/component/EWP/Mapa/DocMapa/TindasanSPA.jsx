import { Collapse, Typography } from "antd";
import TindasanSPAAIWForm from "./TindasanSPAAIWForm";

const { Panel } = Collapse;

export default function TindasanSPA() {
  return (
    <div className="w-full border border-primary-blue rounded-lg">
      <Collapse defaultActiveKey={["2"]} expandIconPosition="right" bordered ghost>
        <Panel
          header={<span className="font-semibold text-primary-blue">Tindasan SPA</span>}
          key="2"
        >
          <div className="space-y-2">
            <div className="p-2 bg-primary-yellow rounded">
              Tindasan untuk SPA (Surat Perintah Audit) yang akan dikirim kepada Uker induk yang
              akan diaudit. <strong>SPA ini akan otomatis terkirim melalui DIO </strong> setelah{" "}
              <strong>DOC MAPA</strong> ini berstatus <strong>final</strong>.
            </div>
            <Typography.Title level={5}>Select Uker,Orgeh dan Branch Tindasan SPA</Typography.Title>
            <TindasanSPAAIWForm />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
