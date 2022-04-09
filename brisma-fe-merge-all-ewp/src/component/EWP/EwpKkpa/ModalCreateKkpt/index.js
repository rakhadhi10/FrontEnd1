import { Button, Modal } from 'antd';
import { CheckCircleOutlined } from "@ant-design/icons";
import { useState } from 'react';



export default function ModalCreateKkpt({ show, cancelModal, onCreateKkpt }) {
    const [judul, setjudul] = useState("")
    const onSave = () => {
        onCreateKkpt(judul)
        setjudul("")
    }
    return (
        <Modal
            title={"Create Kkpt"}
            visible={show}
            onCancel={(e) => cancelModal(e)}
            footer={null}
            width={800}
        >
            <div className='flex flex-col md:flex-row lg:flex-row space-x-5 py-3'>
                <div className='w-full md:w-96 lg:w-96'>
                    <div className='border border-primary-blue  rounded-lg'>
                        <div className='header border-b border-primary-blue h-10 px-3 py-2 flex flex-row justify-between'>
                            <p className='text-primary-blue text-sm font-bold'>Info KKPA</p>
                            <CheckCircleOutlined className="text-primary-blue" />
                        </div>
                        <div className="flex flex-col space-y-1 p-5">
                            <div className="text-sm text-secondary-light-black w-full">
                                [ATA] 817283 - Messi
                            </div>
                            <div className="text-sm text-secondary-light-black">
                                AKD1 - Permohonan Kredit
                            </div>
                            <div className="text-sm text-secondary-light-black">
                                AKD - Analisa Kredit
                            </div>
                            <div className="text-sm text-secondary-light-black">
                                Kredit Kecil
                            </div>
                            <div className="text-sm text-secondary-light-black">
                                Perkreditan
                            </div>
                            <div className="text-sm text-secondary-light-black">
                                KC A
                            </div>
                            <div className="flex justify-start items-center gap-2">
                                <div className={`bg-secondary-light-green px-1 py-1 text-primary-gray rounded-3xl text-xs`} >
                                    on ATA
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full space-y-10'>
                    <h1 className='text-2xl text-secondary-light-black'>Judul Kkpt</h1>
                    <div className="space-y-1">
                        <textarea
                            value={judul}
                            onChange={(e) => setjudul(e.target.value)}
                            className='w-full bg-secondary-gray text-secondary-light-black rounded-xl px-5 py-2 h-32  focus:outline-none'
                            placeholder={'Judul Kkpt'}
                        />
                    </div>
                    <Button onClick={onSave} className={`bg-red-500 text-white h-10 w-24 hover:text-black float-right`}>
                        Create
                    </Button>
                </div>
            </div>

        </Modal>
    )
}
