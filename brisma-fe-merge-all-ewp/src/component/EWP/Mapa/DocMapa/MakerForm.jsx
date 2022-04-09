import { Form, Input, Space } from "antd";

export default function MakerForm(props){
  return (
    <Form name="maker">
      <Space direction="vertical" className="w-full">
        <p className="font-semibold">Maker</p>
        <Form.Item noStyle>
          <Input placeholder="Maker" />
        </Form.Item>
      </Space>
    </Form>
  );
}