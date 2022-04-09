import { Layout } from "antd";
import React, { useState } from "react";
import { BreadCrumb } from "../../component/BreadCrumb";
import { HeaderDashboard } from "../../component/HeaderDashboard";
import { SidebarDashboard } from "../../component/SidebarDashboard";
import DashboardPage from "./DashboardPage";
import { EWPDashboard } from "./EWP/EWPDashboard";
import PATDashboard from "./PAT/PATDashboard";
import RPMMonitoringDashboard from "./RPM/Monitoring/RPMMonitoringDashboard";
import ReferenceDashboard from "./reference/ReferenceDashboard";

const { Content, Footer } = Layout;

export default function PortalDashboard() {
  const [content, setcontent] = useState(<DashboardPage />);

  const onChangeMenu = (key) => {
    switch (key) {
      case "1":
        setcontent(<DashboardPage />);
        break;
      case "2":
        setcontent(<PATDashboard />);
        break;
      case "3":
        setcontent(<EWPDashboard />);
        break;
      case "4":
        setcontent(<RPMMonitoringDashboard />);
        break;
      case "7":
        setcontent(<ReferenceDashboard />)
        break;
      default:
        break;
    }
  };

  return (
    <Layout className="h-auto">
      <SidebarDashboard onClickMenu={onChangeMenu} />
      <Layout>
        <HeaderDashboard />
        <Content className="py-5 px-9">
          <BreadCrumb />
          {content}
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
}
