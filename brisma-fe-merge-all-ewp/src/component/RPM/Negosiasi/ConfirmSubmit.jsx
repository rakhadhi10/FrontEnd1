import { useState } from "react"
import { Modal, Button, Typography } from "antd";

const Content = ({ onOk, onCancel }) => {
  const [loading, setLoading] = useState(false)

  return (
    <div className="mt-4">
      <Typography.Text className="font-semibold">
        <p className="text-center">Apakah Anda yakin mengirim permintaan approval ke MA?</p>
      </Typography.Text>
      <div className="mt-4 flex justify-center gap-4">
        <Button
          type="danger"
          onClick={onCancel}
          style={{ borderRadius: "10px" }}
        >
          Tidak
        </Button>
        <Button
          type="primary"
          loading={loading}
          style={{ borderRadius: "10px" }}
          onClick={async (e) => {
            setLoading(true)
            const success = await onOk()
            if (success) onCancel()
            setLoading(false)
          }}
        >
          Ya
        </Button>
      </div>
    </div>
  )
}

const ConfirmSubmit = (onOk = () => null) => {
  const modal = Modal.confirm()
  const closeModal = () => modal.destroy();

  modal.update(
    {
      title: null,
      icon: null,
      centered: true,
      content: <Content onOk={onOk} onCancel={closeModal} />,
      cancelButtonProps: { style: { display: 'none' } },
      okButtonProps: { style: { display: 'none' } },
    })
}

export default ConfirmSubmit;