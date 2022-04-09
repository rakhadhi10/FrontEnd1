import { Button, Form, Input, Select } from "antd";
import React from "react";
import { connect } from "react-redux";
import { fetchPats } from "../../../../../store/ducks/EWP/CreateEWP/actions";
import { getTahunPAT } from "../../../../../store/ducks/EWP/CreateEWP/selectors";

const { Option } = Select;

function FilterForm({ tahun, fetchPAT }) {
  const [form] = Form.useForm();

  const onFinish = async () => {
    const bodyForm = form.getFieldsValue();
    const params = { ...bodyForm, tahun: tahun };
    await fetchPAT(params);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <div className="flex space-x-2 ">
        <Form.Item name="name" className="m-0 p-0 flex-1">
          <Input placeholder="Project Name" allowClear />
        </Form.Item>
        <Form.Item name="tipe" className="m-0 p-0 flex-1">
          <Select allowClear>
            <Option value="REG">Reguler Audit</Option>
            <Option value="SA">Special Audit</Option>
            <Option value="TA">Tematik</Option>
          </Select>
        </Form.Item>
        <Form.Item name="audit" className="m-0 p-0 flex-1">
          <Select allowClear>
            <Option value="notaudited">Not Audited</Option>
            <Option value="audited">Audited</Option>
          </Select>
        </Form.Item>
        <Form.Item className="m-0 p-0">
          <Button type="primary" htmlType="submit" disabled={tahun === 0}>
            Filter
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return {
    tahun: getTahunPAT(state),
  };
};

const mapDispatchToProps = {
  fetchPAT: fetchPats,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);
