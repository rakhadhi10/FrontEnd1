import { Form, Space } from "antd";
import Name from "../../../AutoComplete/Name";

export default function MakerForm(props){
  return (
    <Space direction="vertical" className="w-full">
      <p className="font-semibold">Maker</p>
      <Form.Item
        name="maker" 
        noStyle
      >
        <Name placeholder="Maker" />
      </Form.Item>
    </Space>
  );
}