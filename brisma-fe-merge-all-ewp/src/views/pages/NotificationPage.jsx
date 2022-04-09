import { Typography } from "antd";
import NotificationTable from "../../component/Notification/NotificationTable";
import AppLayout from "../../layouts/AppLayout";
import withAuth from "../routes/hoc/withAuth";

export function NotificationPage(props){
  return (
    <AppLayout title="PAT">
      <div className="mt-16">
        <Typography.Title level={3} className="font-mulish">
          Notifications
        </Typography.Title>
      </div>
      <NotificationTable data={[...Array(5)].map((_, idx) => {
        return {
          jenis: idx + 1,
          dari: `Nama ${idx + 1}`,
          perihal: `Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint ${idx + 1}`,
          read: false
        }
      })} />
    </AppLayout>
  );
}

export default withAuth(NotificationPage)