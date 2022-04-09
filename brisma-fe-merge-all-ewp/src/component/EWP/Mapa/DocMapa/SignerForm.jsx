import { Button, Form, Input, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

export default function SignerForm(props){
  return (
    <Form name="signers">
      <Form.List name="signers_list">
        {(fields, { add, remove }) => (
          <Space direction="vertical" className="w-full">
            <p className="font-semibold">Signer</p>
            <Button
              onClick={() => add("", 0)}
              size="small"
              shape="circle"
              icon={<PlusOutlined />}
              className="block bg-transparent border border-primary-blue"
            />
            {fields.map((field, index) => (
              <div className="flex items-center gap-2">
                <Form.Item
                  key={field.key}
                  noStyle
                >
                  <Form.Item
                    {...field}
                    noStyle
                  >
                    <Input placeholder="Signer" />
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