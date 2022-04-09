import { Form, Input, Typography, DatePicker, Button, Space } from "antd";
import DebounceAuditor from "../../../../../AutoComplete/DebounceAuditor";
import moment from "moment";

export default function InputProjectInfoNonPat({
  error,
  createLoading,
  createError,
  createEwp,
  success,
  loading,
  form,
  onFinish,
}) {
  const debounceOnChange = (e) => {
    console.log(e);
  };

  return (
    <>
      <Typography.Title level={3} style={{ color: "#FE9843" }}>
        Non PAT
      </Typography.Title>
      <Form labelCol={{ span: 5 }} form={form} onFinish={onFinish}>
        <section className="border border-primary-blue p-8 my-8 rounded-lg">
          <Form.Item
            name="nama_project"
            label="Nama Project"
            labelAlign="left"
            shouldUpdate
            rules={[{ required: true, message: "Tolong input nama project!" }]}
          >
            {success ? (
              <p>{form.getFieldValue("nama_project")}</p>
            ) : (
              <Input placeholder="Nama Project" />
            )}
          </Form.Item>
          <Form.Item
            name="tahun_audit"
            label="Tahun Audit"
            labelAlign="left"
            initialValue={new Date().getFullYear().toString()}
          >
            {success ? (
              <p>{form.getFieldValue("tahun_audit")}</p>
            ) : (
              <Input placeholder="Tahun Audit" disabled />
            )}
          </Form.Item>
          <Form.Item
            initialValue={""}
            name="ketua_tim_audit"
            label="Ketua Tim Audit"
            labelAlign="left"
            rules={[{ required: true, message: "Tolong input ketua tim!" }]}
          >
            {success ? (
              <p>{form.getFieldValue("ketua_tim_audit")}</p>
            ) : (
              <DebounceAuditor
                placeholder="Ketik Nama atau PN"
                disabled={loading}
                onChange={debounceOnChange}
              />
            )}
          </Form.Item>
          <Form.Item label="Periode Ruang Lingkup" labelAlign="left" className="m-0 p-0">
            <Space size="middle">
              <Form.Item
                name="start_date"
                className="m-0 p-0"
                initialValue={moment(new Date())}
                format="YYYY-MM-DD"
                rules={[{ required: true, message: "Tolong input periode mulai!" }]}
              >
                <DatePicker
                  placeholder="Start Date"
                  defaultValue={moment(new Date())}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
              <span>s/d</span>
              <Form.Item
                name="end_date"
                className="m-0 p-0"
                initialValue={moment(new Date())}
                format="YYYY-MM-DD"
                rules={[{ required: true, message: "Tolong input periode berakhir!" }]}
              >
                <DatePicker
                  placeholder="End Date"
                  defaultValue={moment(new Date())}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Space>
          </Form.Item>
        </section>
      </Form>
    </>
  );
}
