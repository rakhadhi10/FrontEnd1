import React from "react";
import { Layout, Space, Input, Button } from "antd";
import NotifButton from "./NotifButton";
import ProfileButton from "./ProfileButton";
import { SearchOutlined } from "@ant-design/icons";

const { Header } = Layout;

export const HeaderDashboard = () => {
  return (
    <Header className="bg-white px-6 flex flex-row justify-between items-center">
      <div>
        <Input.Group compact={true}>
          <Input bordered={false} placeholder="Search...." style={{ width: "200px" }} />
          <Button icon={<SearchOutlined />} style={{ border: "none" }} />
        </Input.Group>
      </div>
      <div>
        <Space wrap size="large" className="py-1.5">
          <NotifButton />
          <ProfileButton />
        </Space>
      </div>
    </Header>
  );
};
