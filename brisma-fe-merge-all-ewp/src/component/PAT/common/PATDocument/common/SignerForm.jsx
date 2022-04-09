import { Button, Form, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import DebounceAuditor from "../../../../AutoComplete/DebounceAuditor";
import { validateAuditor } from "../../../../utils/validators";

export default function SignerForm({ checkers, signers }) {
  return (
    <Form.List name="signers">
      {(fields, { add, remove }) => (
        <Space direction="vertical" className="w-full">
          <p className="font-semibold">Signer</p>
          <Form.Item shouldUpdate noStyle>
            {({ validateFields }) => (
              <Button
                onClick={async () => {
                  try {
                    await validateFields([["signers", 0]])
                    add("", 0)
                  } catch (error) { }
                }}
                size="small"
                shape="circle"
                icon={<PlusOutlined />}
                className="block bg-transparent border border-primary-blue"
              />
            )}
          </Form.Item>
          {fields.map((field, index) => (
            <div className="flex items-center gap-2">
              <Form.Item
                key={field.key}
                noStyle
              >
                <Form.Item
                  {...field}
                  className="w-full m-0"
                  rules={[
                    () => ({
                      validator(rule, value) {
                        if (!value) return Promise.resolve()
                        const signerExists = signers.some((a, idx) => {
                          if (!a) return false
                          if (idx === field.name) return false
                          if (typeof a === "string") return false
                          return a.pn === value.pn
                        })
                        if (signerExists) {
                          return Promise.reject("Signer sudah ada")
                        }
                        const checkerExists = checkers.some((a) => {
                          if (!a) return false
                          if (typeof a === "string") return false
                          return a.pn === value.pn
                        })
                        if (checkerExists) {
                          return Promise.reject("Checker dan signer tidak boleh sama")
                        }
                        return validateAuditor(rule, value)
                      },
                    }),
                  ]}
                >
                  <DebounceAuditor placeholder="Signer" />
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
  );
}