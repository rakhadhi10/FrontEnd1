import { CheckCircleOutlined } from '@ant-design/icons'


export default function Approval({ title }) {
    return (
        <div className="flex bg-primary-green  px-1 rounded-xl text-secondary-gray">
            <CheckCircleOutlined style={{ fontSize: "10px" }} className="text-secondary-light-black mt-1 mr-1" />
            <p className="text-xs">{title}</p>
        </div>
    )
}
