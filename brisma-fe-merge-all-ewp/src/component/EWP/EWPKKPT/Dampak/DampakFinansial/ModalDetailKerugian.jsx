import { Modal, Form, InputNumber, Input, Radio, Button } from "antd";
import React, { useState } from "react";

const { TextArea } = Input;

export const ModalDetailKerugian = ({ onSave, onCancel, visible }) => {
  const [form] = Form.useForm();
  const [radioChecked, setradioChecked] = useState("Potensial Loss");

  const handleOnSave = () => {
    const newData = form.getFieldsValue();
    onSave(newData);
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      centered
      visible={visible}
      width={1000}
      onCancel={onCancel}
      footer={null}
      title={[
        <p className="text-2xl text-gray-500 font-mulish font-bold text-center">Tambah Kerugian</p>,
      ]}
    >
      <Form form={form}>
        <div className="flex gap-4 justify-center">
          <p className="w-2/12 text-primary-blue">Jumlah Kerugian:</p>
          <Form.Item name="jumlah_kerugian" className="w-7/12">
            <InputNumber
              formatter={(value) => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\Rp.\s?|(,*)/g, "")}
              style={{ width: "70%" }}
            />
          </Form.Item>
        </div>
        <div className="flex gap-4 justify-center">
          <p className="w-2/12 text-primary-blue">Jenis Kerugian:</p>
          <Form.Item name="jenis_kerugian" className="w-7/12">
            <Radio.Group onChange={(e) => setradioChecked(e.target.value)} value={radioChecked}>
              <Radio value="Actual Loss">Actual Loss</Radio>
              <Radio value="Potensial Loss">Potensial Loss</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="flex gap-4 justify-center">
          <p className="w-2/12 text-primary-blue">Keterangan:</p>
          <Form.Item name="keterangan" className="w-7/12">
            <TextArea rows={4} />
          </Form.Item>
        </div>
        <div className="flex justify-end mt-6">
          <Button
            type="primary"
            style={{ backgroundColor: "#3C64B1", borderColor: "#3C64B1" }}
            onClick={handleOnSave}
          >
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
