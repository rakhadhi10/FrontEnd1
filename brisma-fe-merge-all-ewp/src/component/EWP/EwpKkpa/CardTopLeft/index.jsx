import { UserOutlined } from '@ant-design/icons';

const CardTopLeft = () => {
    return (
        <div className="shadow-lg  bg-white px-5 py-5  rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0 md:gap-56 lg:gap-56">
                <div className="flex flex-col md:flex-row lg:flex-row">
                    <p className="flex-1 text-primary-blue font-bold text-xl pr-3">2021001</p>
                    <span className="bg-primary-blue h-6 px-5 rounded-xl my-1 text-white">Reguler</span>
                </div>
                <div className="text-primary-gray text-sm">21-10-2021 sd 20-11-2021</div>
            </div>
            <p className="text-base  text-justify mt-6">
                AIW Banjarmasin Reg KCJakarta Simatupang
            </p>
            <div className="lg:flex md:flex md:justify-between lg:justify-between mt-5">
                <div>
                    <div className="flex flex-row-reverse">
                        <div className={`rounded-full px-2 py-2  bg-red-200`} >
                            <UserOutlined
                                className="text-primary-gray"
                                style={{ fontSize: "30px" }}
                            />
                        </div>
                        <div className={`rounded-full px-2 py-2 bg-blue-200`} >
                            <UserOutlined
                                className="text-primary-gray"
                                style={{ fontSize: "30px" }}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-row-reverse">
                        <div className={`rounded-full px-2 py-2  bg-secondary-light-green`} >
                            <UserOutlined
                                className="text-primary-gray"
                                style={{ fontSize: "30px" }}
                            />
                        </div>
                        <div className={`rounded-full px-2 py-2 bg-secondary-light-green`} >
                            <UserOutlined
                                className="text-primary-gray"
                                style={{ fontSize: "30px" }}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 lg:mt-0">
                    <ul>
                        <li>
                            <div className="flex justify-start items-center gap-2">
                                <div className={`w-2 h-2 rounded-full bg-primary-yellow`} />
                                <div className="text-xs text-secondary-light-black">KKPA</div>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-start items-center gap-2">
                                <div className={`w-2 h-2 rounded-full bg-primary-red`} />
                                <div className="text-xs text-secondary-light-black">Draft</div>
                            </div>
                        </li>
                        <li>
                            <div className="flex justify-start items-center gap-2">
                                <div className={`w-2 h-2 rounded-full bg-primary-purple`} />
                                <div className="text-xs text-secondary-light-black">Adendum ke-1</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CardTopLeft
