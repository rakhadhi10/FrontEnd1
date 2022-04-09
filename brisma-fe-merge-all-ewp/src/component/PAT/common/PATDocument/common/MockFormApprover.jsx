import { Collapse, Form, Input, Space } from "antd";

const { Panel } = Collapse

export default function MockFormApprover({ title }) {
  return (
    <div className="w-full border border-primary-blue rounded-lg">
      <Collapse
        defaultActiveKey={["2"]}
        expandIconPosition="right"
        bordered
        ghost
      >
        <Panel
          header={<span className="font-semibold text-primary-blue">{title}</span>}
          key="2"
        >
          <Form
            name="approver_aiw"
            onFinish={(val) => console.log(val)}
          >
            <Space
              direction="vertical"
              size="large"
              className="w-full"
            >
              <Space direction="vertical" className="w-full">
                <p className="font-semibold">Checker</p>
                <Form.Item
                  className="w-full m-0"
                  rules={[{ required: true, message: "Checker required" }]}
                >
                  <Input placeholder="Checker" disabled />
                </Form.Item>
              </Space>
              <Space direction="vertical" className="w-full">
                <p className="font-semibold">Signer</p>
                <Form.Item
                  className="w-full m-0"
                  rules={[{ required: true, message: "Signer required" }]}
                >
                  <Input placeholder="Signer" disabled />
                </Form.Item>
              </Space>
            </Space>
          </Form>
        </Panel>
      </Collapse>
    </div>
  );
}