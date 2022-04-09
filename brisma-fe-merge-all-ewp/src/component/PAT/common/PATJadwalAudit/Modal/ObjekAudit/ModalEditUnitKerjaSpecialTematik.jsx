import { Button, Form, List, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import DebounceOrgehBranch from "../../../../../AutoComplete/DebounceOrgehBranch";
import { validateOrgehBranch } from "../../../../../utils/validators";

export default function ModalEditUnitKerjaSpecialTematik({
  visible,
  rows,
  closeModal,
  updateRows
}) {
  return (
    <Modal
      visible={visible}
      width="800px"
      centered
      maskClosable={false}
      destroyOnClose
      onCancel={closeModal}
      footer={null}
      title={" "}
    >
      <Form>
        <div className="flex gap-4">
          <div className="flex gap-4 items-center">
            <p className="font-semibold text-primary-blue">Input Uker</p>
          </div>
          <div className="flex-1 flex gap-4">
            <Form.Item
              name="uker"
              className="w-full m-0"
              rules={[
                () => ({
                  validator(rule, value) {
                    return validateOrgehBranch(rule, value)
                  },
                }),
              ]}
            >
              <DebounceOrgehBranch>
                {(inputOrgeh, inputBranch) => (
                  <div className="flex flex-col gap-2">
                    {inputOrgeh}
                    {inputBranch}
                  </div>
                )}
              </DebounceOrgehBranch>
            </Form.Item>
          </div>
          <div className="flex gap-4 items-center">
            <Form.Item noStyle shouldUpdate>
              {({ getFieldsValue, getFieldsError, resetFields }) => {
                const { uker } = getFieldsValue(true)
                const anyErrors = getFieldsError().some(({ errors }) => errors.length)
                const canEnter = uker && uker.orgeh && uker.branch && !anyErrors
                return (
                  <Button
                    disabled={!canEnter}
                    onClick={() => {
                      if (rows.some(r => r.branch.branch === uker.branch.branch)) return
                      const newUker = {
                        orgeh: uker.orgeh,
                        branch: uker.branch,
                        deskripsi: "Deskripsi",
                        attachments: []
                      }
                      updateRows([...rows, newUker])
                      resetFields(["uker"])
                    }}
                  >
                    Enter
                  </Button>
                )
              }}
            </Form.Item>
          </div>
        </div>
      </Form>
      <div className="h-64 my-4 px-4 border border-primary-blue rounded-lg overflow-auto">
        <List
          itemLayout="horizontal"
          dataSource={rows}
          renderItem={item => (
            <List.Item
              actions={[
                <Button
                  ghost
                  icon={<DeleteOutlined className="text-primary-red" />}
                  onClick={() => {
                    const filter = rows.filter(u => u.branch !== item.branch)
                    updateRows(filter)
                  }}
                />
              ]}
            >
              <div>{item.branch.branch} - {item.orgeh.child} - {item.orgeh.my_name}</div>
            </List.Item>
          )}
        />
      </div>
      <div className="flex flex-row justify-end gap-4">
        <Button
          type="primary"
          htmlType="submit"
          onClick={closeModal}
        >
          Simpan
        </Button>
      </div>
    </Modal>
  );
}