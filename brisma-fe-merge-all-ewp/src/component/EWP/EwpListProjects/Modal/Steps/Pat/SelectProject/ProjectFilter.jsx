import { Button, Form, Input, Select } from "antd";

export default function ProjectFilter(props){
  return (
    <Form
      className="flex justify-between gap-4"
    >
      <Form.Item className="m-0 p-0 flex-1">
        <Input placeholder="Project Name" />
      </Form.Item>
      <Form.Item className="m-0 p-0 flex-1">
        <Select placeholder="Tipe" />
      </Form.Item>
      <Form.Item className="m-0 p-0 flex-1">
        <Select placeholder="Audited" />
      </Form.Item>
      <Form.Item className="m-0 p-0">
        <Button type="primary">Filter</Button>
      </Form.Item>
    </Form>
  );
}