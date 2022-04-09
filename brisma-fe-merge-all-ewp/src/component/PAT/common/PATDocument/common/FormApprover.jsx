import { Collapse, Form, Space } from "antd";
import CheckerForm from "./CheckerForm";
import SignerForm from "./SignerForm";

const { Panel } = Collapse

export default function FormApprover({ title, checkers, signers, updateForm }) {
  return (
    <div className="w-full border border-primary-blue rounded-lg">
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="right"
        bordered
        ghost
      >
        <Panel
          header={<span className="font-semibold text-primary-blue">{title}</span>}
          key="1"
        >
          <Form
            name="approver"
            onValuesChange={(_, val) => updateForm(val)}
            initialValues={{ checkers: [undefined], signers: [undefined] }}
          >
            <Space
              direction="vertical"
              size="large"
              className="w-full"
            >
              <CheckerForm checkers={checkers} signers={signers} />
              <SignerForm checkers={checkers} signers={signers} />
            </Space>
          </Form>
        </Panel>
      </Collapse>
    </div>
  );
}