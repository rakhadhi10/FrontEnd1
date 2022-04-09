import { Collapse, Space } from "antd";
import CheckerForm from "./CheckerForm";
import SignerForm from "./SignerForm";

const { Panel } = Collapse;

export default function ApproverAIWForm(props) {
  return (
    <div className="w-full border border-primary-blue rounded-lg">
      <Collapse defaultActiveKey={["1"]} expandIconPosition="right" bordered ghost>
        <Panel
          header={<span className="font-semibold text-primary-blue">Approver AIW</span>}
          key="1"
        >
          <Space direction="vertical" size="large" className="w-full">
            <CheckerForm />
            <SignerForm />
          </Space>
        </Panel>
      </Collapse>
    </div>
  );
}
