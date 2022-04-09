import { Button, Typography } from "antd";

export default function NeedApproval({ onClickContinue }) {
  return (
    <div className="p-12 flex flex-col items-center gap-4">
      <Typography.Title level={4}>
        <span
          style={{
            color: "#C81818",
          }}
        >
          Menunggu Dulu Approval Ketua Projek Baru
        </span>
      </Typography.Title>
      <Button type="danger" onClick={onClickContinue}>
        Continue EWP
      </Button>
    </div>
  );
}
