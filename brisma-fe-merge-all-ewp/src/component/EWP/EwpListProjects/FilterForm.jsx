import { Button, Form, Input, Select } from "antd";
import { connect } from "react-redux";
import { fetchEWPs } from "../../../store/ducks/EWP/CreateEWP/actions";
import { getLoading } from "../../../store/ducks/EWP/CreateEWP/selectors";

const { Option } = Select;

function FilterForm({ fetchEWPs, loading }) {
  const [form] = Form.useForm();

  const onFinish = async () => {
    const formValues = form.getFieldsValue();
    const filters = {
      ...formValues,
      page: 1,
    };
    await fetchEWPs(filters);
  };

  return (
    <Form
      name="basic"
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      className="grid grid-cols-3 gap-8"
    >
      <div>
        <Form.Item name="project_id">
          <Input placeholder="Project ID" />
        </Form.Item>
        <Form.Item name="project_name" style={{ marginBottom: "0" }}>
          <Input placeholder="Project Name" />
        </Form.Item>
      </div>
      <div>
        <Form.Item name="status_dokumen" style={{ minWidth: "180px" }}>
          <Select placeholder="Status Dokumen" allowClear>
            <Option value="1">Draft</Option>
            <Option value="2">Waiting</Option>
            <Option value="3">Final</Option>
          </Select>
        </Form.Item>
        <Form.Item name="status_persetujuan" style={{ marginBottom: "0", minWidth: "180px" }}>
          <Select placeholder="Status Persetujuan" allowClear>
            <Option value="1">Maker Draft</Option>
            <Option value="2">Waiting Checker AIW</Option>
            <Option value="3">Done</Option>
          </Select>
        </Form.Item>
      </div>
      <div>
        <Form.Item name="status_approve">
          <Select placeholder="Status Approve" allowClear>
            <Option value="1">Maker Draft</Option>
            <Option value="2">Waiting Checker AIW</Option>
            <Option value="3">Done</Option>
          </Select>
        </Form.Item>
        <Form.Item style={{ marginBottom: "0" }} shouldUpdate>
          {({ getFieldsValue }) => {
            const { project_id, project_name, tahun, status_dokumen, status_persetujuan } =
              getFieldsValue();
            const isAnyFilled =
              project_id || project_name || tahun || status_dokumen || status_persetujuan;
            return (
              <Button type="primary" htmlType="submit" disabled={!isAnyFilled} loading={loading}>
                Search
              </Button>
            );
          }}
        </Form.Item>
      </div>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state),
  };
};

const mapDispachToProps = {
  fetchEWPs: fetchEWPs,
};

export default connect(mapStateToProps, mapDispachToProps)(FilterForm);
