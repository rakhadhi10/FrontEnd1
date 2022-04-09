import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Form, Input, Select } from "antd";

const { Option } = Select;

export const SearchListProject = ({ onFinish, onFinishFailed }) => {
  return (
    <Card>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <div className="grid grid-cols-3 gap-x-8">
          <div>
            <Form.Item name="name">
              <Input placeholder="Project Name" />
            </Form.Item>
            <Form.Item name="id" className="m-0">
              <Input placeholder="Project ID" />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="statusDokumen">
              <Select placeholder="Status Dokumen" allowClear>
                <Option key={1} value="Open">
                  Open
                </Option>
                <Option key={2} value="Assign To">
                  Assign To
                </Option>
                <Option key={3} value="Negosiasi Rekomendasi">
                  Negosiasi Rekomendasi
                </Option>
              </Select>
            </Form.Item>
            <Form.Item name="statusPersetujuan" className="m-0">
              <Select placeholder="Status Persetujuan" allowClear>
                <Option key={1} value="Open">
                  Open
                </Option>
                <Option key={2} value="Assign To">
                  Assign To
                </Option>
                <Option key={3} value="Negosiasi Rekomendasi">
                  Negosiasi Rekomendasi
                </Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex justify-start items-end">
            <Button type="primary">
              Search
            </Button>
          </div>
        </div>
      </Form>
    </Card>
  );
};

SearchListProject.propTypes = {
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func,
};

SearchListProject.defaultProps = {
  onFinish: (values) => console.log("Success:", values),
  onFinishFailed: (error) => console.log("Failed:", error),
};
