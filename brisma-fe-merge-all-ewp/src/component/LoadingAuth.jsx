import { Spin, Typography } from "antd";

export default function LoadingAuth({ text = "Checking Auth" }) {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-primary-blue bg-opacity-5">
      <div className="flex flex-col items-center gap-4">
        <Spin />
        <Typography.Title level={3}>
          {text}
        </Typography.Title>
      </div>
    </div>
  )
}