import { Button, Typography } from "antd";

export default function Success({ onClickContinue }){
  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <img src="/success-mark.png" alt="Success EWP" />
      <Typography.Title level={4}>
        <span style={{ color: "#1A9718" }}>Create Project EWP Success!</span>
      </Typography.Title>
      <Button 
        type="primary" 
        onClick={onClickContinue}
      >
        Continue EWP
      </Button>
    </div>
  );
}