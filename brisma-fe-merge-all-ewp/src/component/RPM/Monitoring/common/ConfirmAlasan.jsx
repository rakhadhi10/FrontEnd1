import { useState } from "react"
import { Modal, Input, Button, Typography } from "antd";

const Content = ({ label, onOk, onCancel }) => {
  const [alasan, setAlasan] = useState("")
  const [loading, setLoading] = useState(false)

  return (
    <div className="mt-4">
      <Typography.Text className="font-semibold">
        <p className="text-center">{label}</p>
      </Typography.Text>
      <Input.TextArea
        rows={4}
        placeholder="Ketik Alasan"
        onChange={(e) => setAlasan(e.target.value)}
      />
      <div className="mt-4 flex justify-center gap-4">
        <Button onClick={onCancel}>
          Batal
        </Button>
        <Button
          type="primary"
          loading={loading}
          onClick={async (e) => {
            setLoading(true)
            const success = await onOk(alasan)
            if (success) onCancel()
            setLoading(false)
          }}
        >
          Kirim
        </Button>
      </div>
    </div>
  )
}

const ConfirmAlasan = (onOk = (alasan) => null, label = "Alasan") => {
  const modal = Modal.confirm()
  const closeModal = () => modal.destroy();

  modal.update(
    {
      icon: null,
      centered: true,
      closable: true,
      content: <Content label={label} onOk={onOk} onCancel={closeModal} />,
      cancelButtonProps: { style: { display: 'none' } },
      okButtonProps: { style: { display: 'none' } },
    })
}

export default ConfirmAlasan;