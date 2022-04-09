import { Button, Modal } from "antd"

export default function ModalAlert({ visible, title, ket, approve = false, closeModal }) {
  return (
    <Modal
      footer={null}
      closable={false}
      visible={visible}
      width={800}
    >

      <div className="px-20">
        <div className="text-center">
          <h1 className={approve ? "text-xl text-secondary-green font-bold" : "text-xl text-red-500 font-bold"}>{title}</h1>
          <hr className="text-secondary-gray" />
        </div>
        <div className="mt-5">
          <div className="space-y-2">
            <label htmlFor="label" className="text-primary-gray text-lg">{ket}</label>
            <textarea
              className='w-full bg-secondary-gray text-secondary-light-black  px-5 py-2 h-32  focus:outline-none'
              placeholder="Text..."
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-5">
        <Button onClick={() => closeModal(false)} className="bg-red-500 text-white">NO</Button>
        <Button className="bg-blue-500 text-white">Yes</Button>
      </div>
    </Modal>
  )
}
