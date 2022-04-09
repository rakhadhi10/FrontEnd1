import { Button, DatePicker, Form, Input } from "antd";
import React from "react";

function FilterPickSampleFRD() {
  const [form] = Form.useForm();
  return (
    <Form form={form}>
      <div className="border rounded grid grid-cols-2 p-4">
        <div>
          <div className="flex space-x-4">
            <p className="w-1/3">Kode MBR</p>
            <Form.Item name="kode_mbr" className="w-2/3">
              <Input />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex space-x-2">
              <p>Start Date</p>
              <Form.Item name="start_date">
                <DatePicker />
              </Form.Item>
            </div>
            <div className="flex space-x-2">
              <p>End Date</p>
              <Form.Item name="end_date">
                <DatePicker />
              </Form.Item>
            </div>
          </div>
          <div className="flex space-x-4">
            <p className="w-1/3">Aktivitas</p>
            <Form.Item name="aktivitas" className="w-2/3">
              <Input />
            </Form.Item>
          </div>
          <div className="flex space-x-4">
            <p className="w-1/3">Sub Aktivitas</p>
            <Form.Item name="sub_aktivitas" className="w-2/3">
              <Input />
            </Form.Item>
          </div>
        </div>
        <div className="flex justify-end items-end">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Show
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
}

export default FilterPickSampleFRD;
