import { useState } from "react"
import { Modal, Input, Button, Typography } from "antd";

const Content = ({ label, onOk, onCancel }) => {
  const [rekomendasi, setRekomendasi] = useState("")
  const [loading, setLoading] = useState(false)

  return (
    <div className="mt-4">
      <Typography.Text className="font-semibold">
        <p className="text-center">{label}</p>
      </Typography.Text>
      <Input.TextArea
        rows={4}
        placeholder="Ketik Rekomendasi"
        onChange={(e) => setRekomendasi(e.target.value)}
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
            const success = await onOk(rekomendasi)
            if (success) onCancel()
            setLoading(false)
          }}
        >
          Buat
        </Button>
      </div>
    </div>
  )
}

const ConfirmRekomendasi = (onOk = (alasan) => null, label = "Rekomendasi") => {
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

export default ConfirmRekomendasi;