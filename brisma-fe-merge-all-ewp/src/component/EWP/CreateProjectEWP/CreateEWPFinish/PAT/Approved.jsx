import { Button, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Approved = ({ id }) => {
  let navigate = useNavigate();

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <img src="/success-mark.png" alt="Success EWP" />
      <Typography.Title level={4}>
        <span style={{ color: "#1A9718" }}>Create Project EWP Success!</span>
      </Typography.Title>
      <Button type="primary" onClick={() => navigate("/ewp/audit-info/" + id)}>
        Continue EWP
      </Button>
    </div>
  );
};
