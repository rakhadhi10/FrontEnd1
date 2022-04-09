import { Card, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function RPMMonitoringDashboard() {
  return (
    <Card
      className="flex flex-col justify-start border-secondary-gray "
      style={{ overflow: "hidden", borderRadius: "10px", width: "100%", height: "100%" }}
    >
      <Space direction="vertical" className="w-full">
        <Link to="/rpm/auditee/projects">
          <Card
            hoverable
            className="flex flex-col justify-start border-secondary-light-black hover:border-primary-blue font-mulish text-secondary-light-black hover:text-primary-blue"
          >
            <p className="text-lg font-bold">RPM - AUDITEE </p>
            <p className="text-sm font-light">
              Monitoring Rencana Perbaikan Manajemen
            </p>
          </Card>
        </Link>
        <Link to="/rpm/auditor/projects">
          <Card
            hoverable
            className="flex flex-col justify-start border-secondary-light-black hover:border-primary-blue font-mulish text-secondary-light-black hover:text-primary-blue"
          >
            <p className="text-lg font-bold">RPM - AUDITOR </p>
            <p className="text-sm font-light">
              Monitoring Rencana Perbaikan Manajemen
            </p>
          </Card>
        </Link>
      </Space>
    </Card>
  );
}
