import PropTypes from "prop-types";
import { Button, Form, Input, Select } from "antd";
import { connect } from "react-redux";
import { fetchProjects, updateFilterForm } from "../../../../store/ducks/PATListProjects/actions";

const { Option } = Select;

const mapDispatchToProps = {
  fetchProjects: fetchProjects,
  updateFilterForm: updateFilterForm
}

export default connect(null, mapDispatchToProps)(FilterForm)

export function FilterForm({ fetchProjects, updateFilterForm }) {
  return (
    <Form
      name="list_projects_filter"
      className="flex justify-start gap-8"
      onFinish={fetchProjects}
      onValuesChange={(_, val) => updateFilterForm(val)}
    >
      <div className="grid grid-cols-3 w-full gap-8">
        <div>
          <Form.Item name="project_name">
            <Input placeholder="Project Name" />
          </Form.Item>
          <Form.Item name="tahun" style={{ marginBottom: "0" }}>
            <Input placeholder="Tahun" />
          </Form.Item>
        </div>
        <div>
          <Form.Item name="status_document" style={{ minWidth: "180px" }}>
            <Select placeholder="Status Dokumen" allowClear>
              <Option value="1">Draft</Option>
              <Option value="2">Pending Checker</Option>
              <Option value="3">Pending Signer</Option>
              <Option value="4">Pending Maker PSA</Option>
              <Option value="5">Pending Checker SKAI</Option>
              <Option value="6">Pending Signer SKAI</Option>
              <Option value="7">Final</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status_persetujuan" style={{ marginBottom: "0", minWidth: "180px" }}>
            <Select placeholder="Status Persetujuan" allowClear>
              <Option value="101">Draft</Option>
              <Option value="102">Pending Checker</Option>
              <Option value="103">Pending Signer</Option>
              <Option value="104">Pending Maker PSA</Option>
              <Option value="105">Pending Checker SKAI</Option>
              <Option value="106">Pending Signer SKAI</Option>
              <Option value="107">Final</Option>
              <Option value="202">Tolak Checker</Option>
              <Option value="203">Tolak Signer</Option>
              <Option value="204">Tolak Maker PSA</Option>
              <Option value="205">Tolak Checker SKAI</Option>
              <Option value="206">Tolak Signer SKAI</Option>
            </Select>
          </Form.Item>
        </div>
        <div>
          <Form.Item />
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          {/* <Form.Item style={{ marginBottom: "0" }} shouldUpdate>
            {({ getFieldsValue }) => {
              const { project_name, tahun, status_document, status_persetujuan } = getFieldsValue();
              const isAnyFilled = project_name || tahun || status_document || status_persetujuan;
              return (
                <Button type="primary" htmlType="submit" disabled={!isAnyFilled}>
                  Search
                </Button>
              );
            }}
          </Form.Item> */}
        </div>
      </div>
    </Form>
  );
}

FilterForm.propTypes = {
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func,
};

FilterForm.defaultProps = {
  onFinish: (values) => console.log("Success:", values),
  onFinishFailed: (error) => console.log("Failed:", error),
};
