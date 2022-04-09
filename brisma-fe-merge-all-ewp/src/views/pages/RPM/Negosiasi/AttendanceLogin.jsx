import { Typography } from "antd";
import AttendanceLoginForm from "../../../../component/RPM/Negosiasi/AttendanceLoginForm";

export default function AttendanceLogin(props) {
  return (
    <div className="md:grid md:grid-cols-2">
      <section className="bg-primary-blue bg-opacity-5 px-10 py-10 w-full h-screen space-y-10 sm:w-5/6">
        <div className="pt-8">
          <Typography.Title level={2} style={{ margin: 0 }}>
            Login Attendance
          </Typography.Title>
        </div>
        <div className="py-4 overflow-hidden">
          {/* <SummaryCard 
            project_id="20210011"
            project_name="AIWBanjarmasin_Reg_KCJakarta_simatupang_Okt_2021"
            type="Reguler"
            kta="Test"
            ma="Test"
            ata={["Test", "Test", "Test"]}
          /> */}
        </div>
        <AttendanceLoginForm />
      </section>
      <div className="relative hidden bg-white w-full sm:flex sm:justify-center sm:items-center">
        <div className="absolute top-20 flex justify-center">
          <a href="/" className="font-lato font-bold text-primary-blue text-2xl">
            LOGO
          </a>
        </div>
        <img src="/attendance-login.png" alt="" />
      </div>
    </div>
  );
}