import { Button, Layout } from "antd";
import NotifButton from "../component/NotifButton";
import PATBreadcrumb from "../component/PATBreadcrumb";
import ProfileButton from "../component/ProfileButton";

const { Content } = Layout;

export default function AppLayout({
  children,
  title = "LOGO",
  breadcrumb: Breadcrumb = PATBreadcrumb
}) {
  return (
    <Layout className="min-h-screen">
      <header
        className="bg-primary-blue bg-opacity-5 py-4 px-12 flex flex-wrap justify-between items-center"
        style={{ borderBottom: "1px solid #DAD7D7" }}
      >
        <a href="/" className="font-lato font-bold text-primary-blue text-2xl">
          {title}
        </a>
        <div className="flex justify-center items-center gap-4">
          <NotifButton />
          <ProfileButton />
        </div>
      </header>
      <Content className="px-12">
        <nav className="flex flex-wrap justify-between items-center py-4">
          <Breadcrumb />
          <Button>Direct Menu</Button>
        </nav>
        {children}
      </Content>
    </Layout>
  );
}
