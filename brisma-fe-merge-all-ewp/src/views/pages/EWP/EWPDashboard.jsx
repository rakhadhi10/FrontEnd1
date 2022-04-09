import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router";

export const EWPDashboard = () => {
  let navigate = useNavigate();

  return (
    <Card
      className="flex flex-col justify-start border-secondary-gray "
      style={{ overflow: "hidden", borderRadius: "10px", width: "100%", height: "100%" }}
    >
      <Card
        hoverable
        onClick={() => navigate("/ewp/project")}
        className="flex flex-col mb-6 justify-start border-secondary-light-black hover:border-primary-blue font-mulish text-secondary-light-black hover:text-primary-blue"
      >
        <p className="text-lg font-bold">EWP</p>
        <p className="text-sm font-light">Perencanaan Audit Tahunan - Audit Intern Wilayah</p>
      </Card>
      <Card
        hoverable
        onClick={() => navigate("/ewp/approval")}
        className="flex flex-col justify-start border-secondary-light-black hover:border-primary-blue font-mulish text-secondary-light-black hover:text-primary-blue"
      >
        <p className="text-lg font-bold">Approval</p>
        <p className="text-sm font-light">Perencanaan Audit Tahunan - Audit Intern Wilayah</p>
      </Card>
    </Card>
  );
};
