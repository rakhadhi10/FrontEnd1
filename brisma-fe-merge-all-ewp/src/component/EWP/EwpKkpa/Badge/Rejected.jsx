import { StopOutlined } from '@ant-design/icons'


export default function Rejected({ title }) {
    return (
        <div className="flex bg-red-400  px-1 rounded-xl text-secondary-gray">
            <StopOutlined style={{ fontSize: "10px" }} className="text-secondary-light-black mt-1 mr-1" />
            <p className="text-xs">{title}</p>
        </div>
    )
}
