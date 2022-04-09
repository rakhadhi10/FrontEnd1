import { Layout } from "antd";
import React from "react";
import { BreadCrumb } from "../component/BreadCrumb";
import { HeaderDashboard } from "../component/HeaderDashboard";
import { SidebarDashboard } from "../component/SidebarDashboard";

const { Content, Footer } = Layout;
const LayoutDashboard = ({ children }) => {
  return (
    <Layout className="h-auto">
      <SidebarDashboard />
      <Layout>
        <HeaderDashboard />
        <Content className="py-5 px-9">
          <BreadCrumb />
          {children}
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutDashboard;
