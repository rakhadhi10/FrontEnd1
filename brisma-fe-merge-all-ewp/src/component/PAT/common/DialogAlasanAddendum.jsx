import { useState } from "react"
import { Modal, Space, Input, Button } from "antd";

const Content = ({ onOk, onCancel }) => {
  const [alasan, setAlasan] = useState("")
  const [loading, setLoading] = useState(false)

  return (
    <div className="mt-4">
      <Space direction="vertical" className="w-full">
        <p>Alasan Addendum</p>
        <Input.TextArea rows={4} onChange={(e) => setAlasan(e.target.value)} />
      </Space>
      <div className="mt-4 flex justify-end gap-4">
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="danger"
          loading={loading}
          onClick={async (e) => {
            setLoading(true)
            const success = await onOk(alasan)
            if (success) onCancel()
            setLoading(false)
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

const DialogAlasanAddendum = (onOk = (alasan) => null) => {
  const modal = Modal.confirm()
  const closeModal = () => modal.destroy();

  modal.update(
    {
      title: <p className="pb-2 text-primary-red text-center border-b border-gray-500">Submit</p>,
      icon: null,
      centered: true,
      closable: true,
      content: <Content onOk={onOk} onCancel={closeModal} />,
      cancelButtonProps: { style: { display: 'none' } },
      okButtonProps: { style: { display: 'none' } },
    })
}

export default DialogAlasanAddendum;