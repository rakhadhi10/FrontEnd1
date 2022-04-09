import { Form, Input, DatePicker, Space, Button, Typography } from "antd";
import DebounceAuditor from "../../../../../../AutoComplete/DebounceAuditor";
import moment from "moment";

export default function InputProjectInfoPat({
  onClickApproval,
  onClickFinish,
  onChange,
  current,
  form,
  onFinish,
  loading,
}) {
  const debounceOnChange = (e) => {
    console.log(e);
  };
  return (
    <>
      <Typography.Title level={2} style={{ color: "#3BAAA4", margin: 0 }}>
        PAT
      </Typography.Title>
      <Form labelCol={{ span: 5 }} form={form} onFinish={onFinish}>
        <section className="border border-primary-blue p-8 my-8 rounded-lg">
          <Form.Item
            name="nama_project"
            label="Nama Project"
            labelAlign="left"
            shouldUpdate
            initialValue={current[0].nama_project}
            rules={[{ required: true, message: "Tolong input nama project!" }]}
          >
            <Input placeholder="Nama Project" disabled />
          </Form.Item>
          <Form.Item
            name="tahun_audit"
            label="Tahun Audit"
            labelAlign="left"
            initialValue={current[0].tahun}
            rules={[{ required: true, message: "Tolong input tahun audit!" }]}
          >
            <Input placeholder="Tahun Audit" disabled />
          </Form.Item>
          <Form.Item
            name="ketua_tim_audit"
            label="Ketua Tim Audit"
            labelAlign="left"
            initialValue={current[0].kta_pn + " - " + current[0].kta}
          >
            <DebounceAuditor
              defaultValue={current[0].kta_pn + " - " + current[0].kta}
              placeholder="Ketik Nama atau PN"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item
            label="Periode Ruang Lingkup"
            labelAlign="left"
            className="m-0 p-0"
          >
            <Space size="middle">
              <Form.Item
                name="start_date"
                initialValue={moment(current[0].pelaksanaan_start)}
                className="m-0 p-0"
              >
                <DatePicker
                  defaultValue={moment(current[0].pelaksanaan_start)}
                  placeholder="Start Date"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
              <span>s/d</span>
              <Form.Item
                name="end_date"
                initialValue={moment(current[0].pelaksanaan_end)}
                className="m-0 p-0"
              >
                <DatePicker
                  defaultValue={moment(current[0].pelaksanaan_end)}
                  placeholder="End Date"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Space>
          </Form.Item>
        </section>
        <section className="p-8">
          <p>
            Ketua Tim yang anda pilih berbeda dengan Ketua Tim yang ada didalam
            PAT pada project tersebut. Anda harus meminta approver kepada
            pejabat UKA minimal eselon 2.
          </p>
          <div className="flex">
            <Form.Item
              name="nama_approval"
              label="Nama Approval"
              labelAlign="left"
              extra="Manager Audit atau Kepala Audit Intern yang berkenan untuk memberi Approval."
            >
              <DebounceAuditor
                placeholder="Ketik Nama atau PN"
                disabled={loading}
                onChange={debounceOnChange}
              />
            </Form.Item>
          </div>
        </section>
      </Form>
    </>
  );
}
