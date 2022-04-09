import { Button, Form, Input } from "antd";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import { loginAttendance } from "../../../store/ducks/RPMNegosiasi/actions";
import { createErrorNotification, createSuccessNotification } from "../../utils/notifications";

const showSuccessNotif = createSuccessNotification("Login Attendance", "Berhasil login attendance")

function AttendanceLoginForm({ loginAttendance }) {
  const { id } = useParams()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  return (
    <Form
      form={form}
      layout="vertical"
    >
      <Form.Item name="pn" label="Personal Number" >
        <Input placeholder="Personal Number" />
      </Form.Item>
      <Form.Item name="password" label="Password">
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          loading={loading}
          onClick={async () => {
            setLoading(true)
            const { pn, password } = form.getFieldsValue()
            const error = await loginAttendance(pn, password, id)
            if (error) {
              createErrorNotification("Login Attendance", error)()
            } else {
              showSuccessNotif()
            }
            setLoading(false)
          }}
        >
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapDispatchToProps = {
  loginAttendance: loginAttendance
}

export default connect(null, mapDispatchToProps)(AttendanceLoginForm)
