import { Button, Form, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import DebounceAuditor from "../../../../AutoComplete/DebounceAuditor";
import { validateAuditor } from "../../../../utils/validators";

export default function CheckerForm({ checkers, signers }) {
  return (
    <Form.List name="checkers">
      {(fields, { add, remove }) => (
        <Space direction="vertical" className="w-full">
          <p className="font-semibold">Checker</p>
          <Form.Item shouldUpdate noStyle>
            {({ validateFields }) => (
              <Button
                onClick={async () => {
                  try {
                    await validateFields([["checkers", 0]])
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
                        const checkerExists = checkers.some((a, idx) => {
                          if (!a) return false
                          if (idx === field.name) return false
                          if (typeof a === "string") return false
                          return a.pn === value.pn
                        })
                        if (checkerExists) {
                          return Promise.reject("Checker sudah ada")
                        }
                        const signerExists = signers.some(a => {
                          if (!a) return false
                          if (typeof a === "string") return false
                          return a.pn === value.pn
                        })
                        if (signerExists) {
                          return Promise.reject("Checker dan signer tidak boleh sama")
                        }
                        return validateAuditor(rule, value)
                      },
                    }),
                  ]}
                >
                  <DebounceAuditor placeholder="Checker" />
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