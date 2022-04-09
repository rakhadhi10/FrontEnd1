import { Button, Form, Modal } from "antd";
import { useParams } from "react-router-dom";
import DebounceAuditor from "../../../AutoComplete/DebounceAuditor";
import { createErrorNotification, createSuccessNotification } from "../../../utils/notifications";
import { validateAuditor } from "../../../utils/validators";

export default function ModalAssignMaker({ visible, onClose, onSubmit, fetchStatus }) {
  const { pat_id } = useParams()

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      centered
      footer={null}
      title={<div className="text-center">Pilih Maker</div>}
    >
      <Form
        name="form_maker_addendum"
        layout="vertical"
        onFinish={async (val) => {
          const error = await onSubmit(pat_id, val.maker)
          if (error) createErrorNotification("Addendum", error)()
          else {
            createSuccessNotification("Addendum", "Berhasil assign maker addendum")()
            fetchStatus(pat_id)
          }

        }}
      >
        <Form.Item
          name="maker"
          rules={[
            () => ({
              validator(rule, value) {
                return validateAuditor(rule, value)
              },
            }),
          ]}
        >
          <DebounceAuditor placeholder="Ketik Nama atau PN" />
        </Form.Item>
        <div className="flex justify-center mt-8">
          <Form.Item
            shouldUpdate
            noStyle
          >
            {
              ({ getFieldsError }) => {
                const anyErrors = getFieldsError().some(({ errors }) => errors.length)
                return (
                  <div className="flex flex-row justify-end">
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={anyErrors}
                    >
                      Send
                    </Button>
                  </div>
                )
              }
            }
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}