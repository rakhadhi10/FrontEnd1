import { Button, Form, Modal, Select, Typography } from "antd";
import { connect } from "react-redux";
import { closeModal, createPAT, fetchPATs } from "../../../store/ducks/CreatePAT/actions";
import { getModalVisible } from "../../../store/ducks/CreatePAT/selectors";
import { createErrorNotification, createSuccessNotification } from "../../utils/notifications";

const showSuccessNotif = createSuccessNotification("Create PAT", "Berhasil membuat PAT Baru")
const showErrorNotif = createErrorNotification("Create PAT", "Gagal membuat PAT baru")

const { Option } = Select

function ModalCreatePAT({
  visible,
  closeModal,
  createPAT,
  fetchPATs
}) {
  const nextYear = new Date().getFullYear() + 1

  return (
    <Modal
      visible={visible}
      maskClosable={false}
      destroyOnClose
      centered
      onCancel={closeModal}
      footer={null}
      title={[
        <Typography.Title level={3} className="text-center">
          Buat PAT
        </Typography.Title>,
      ]}
    >
      <Form
        onValuesChange={(_, val) => console.log(val)}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-8">
            <p>Tahun Audit</p>
            <Form.Item
              name="tahun_audit"
              className="flex-1 m-0"
            >
              <Select placeholder="Pilih Tahun" allowClear>
                <Option key={nextYear} value={nextYear}>
                  {nextYear}
                </Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        <div
          style={{ backgroundColor: "#F4F5F4" }}
          className="rounded-lg my-4 p-2 h-96 overflow-auto"
        >

        </div>
        <div className="flex justify-end">
          <Form.Item shouldUpdate noStyle>
            {({ getFieldValue }) => {
              const tahun_audit = getFieldValue("tahun_audit")
              return (
                <Button
                  type="primary"
                  disabled={!tahun_audit}
                  onClick={() => {
                    Modal.confirm({
                      title: <p className="text-center">Apakah data yang Anda buat sudah sesuai?</p>,
                      centered: true,
                      maskClosable: true,
                      icon: null,
                      okText: "Ya",
                      cancelText: "Tidak",
                      cancelButtonProps: {
                        type: "danger",
                      },
                      async onOk() {
                        const success = await createPAT(tahun_audit)
                        if (success) {
                          showSuccessNotif()
                          closeModal()
                          fetchPATs()
                        } else {
                          showErrorNotif()
                        }
                      },
                    });
                  }}
                >
                  Buat PAT
                </Button>
              )
            }}
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

const mapStateToProps = state => ({
  visible: getModalVisible(state),
})

const mapDispatchToProps = {
  closeModal: closeModal,
  createPAT: createPAT,
  fetchPATs: fetchPATs
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreatePAT)