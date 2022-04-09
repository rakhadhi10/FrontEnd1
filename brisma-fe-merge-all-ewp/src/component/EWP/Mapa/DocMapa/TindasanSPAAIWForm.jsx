import { Button, Form, Input, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

export default function TindasanSPAAIWForm() {
  return (
    <Form name="checkers">
      <Form.List name="uker_orgeh_list">
        {(fields, { add, remove }) => (
          <Space direction="vertical" className="w-full">
            <Button
              onClick={() => add("", 0)}
              size="small"
              shape="circle"
              icon={<PlusOutlined />}
              className="block bg-transparent border border-primary-blue"
            />
            {fields.map((field, index) => (
              <div className="flex items-center gap-2">
                <Form.Item key={field.key} noStyle>
                  <Form.Item {...field} name={[index, "branch"]} noStyle>
                    <Input placeholder="search branch" />
                  </Form.Item>
                  <Form.Item {...field} name={[index, "orgeh"]} noStyle>
                    <Input placeholder="search orgeh" />
                  </Form.Item>
                  <Button
                    onClick={() => remove(index)}
                    size="small"
                    shape="circle"
                    icon={<DeleteOutlined className="text-primary-red" />}
                    className="block bg-transparent border border-primary-red"
                  />
                </Form.Item>
              </div>
            ))}
          </Space>
        )}
      </Form.List>
    </Form>
  );
}
