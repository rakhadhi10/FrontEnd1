import { DatePicker, Form, Input, Space } from "antd";
import React from "react";

export const FormAuditInfo = ({ form, auditSource }) => {
  return (
    <div>
      <Form labelCol={{ span: 5 }} form={form}>
        <Form.Item
          name="project_name"
          label="Nama Project"
          labelAlign="left"
          shouldUpdate
          rules={[{ required: true, message: "Tolong input nama project!" }]}
        >
          <Input placeholder="Nama Project" disabled={auditSource === "pat"} />
        </Form.Item>
        <Form.Item
          name="audit_year"
          label="Tahun Audit"
          labelAlign="left"
          rules={[{ required: true, message: "Tolong input tahun audit!" }]}
        >
          <Input placeholder="Tahun Audit" disabled />
        </Form.Item>
        <Form.Item
          name="ketua_tim_audit"
          label="Ketua Tim Audit"
          labelAlign="left"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Periode Ruang Lingkup"
          labelAlign="left"
          className="m-0 p-0"
        >
          <Space size="middle">
            <Form.Item
              name="info_periode_pelaksanaan_start"
              className="m-0 p-0"
            >
              <DatePicker placeholder="Start Date" format="YYYY-MM-DD" />
            </Form.Item>
            <span>s/d</span>
            <Form.Item name="info_periode_pelaksanaan_end" className="m-0 p-0">
              <DatePicker placeholder="End Date" format="YYYY-MM-DD" />
            </Form.Item>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};
