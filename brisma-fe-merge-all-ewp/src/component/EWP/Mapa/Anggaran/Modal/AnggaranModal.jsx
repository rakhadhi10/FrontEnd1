import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";

const { Option } = Select;

export const AnggaranModal = ({
  visible,
  onCancel,
  data = {},
  onSave,
  isEdit,
  submitLoading,
  updateLoading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    isEdit ? form.setFieldsValue({ ...data, tanggal: moment(data.tanggal) }) : form.resetFields();
  }, [data]);

  const handleOnSave = () => {
    const amount = form.getFieldValue("amount");
    const body = form.getFieldsValue();
    console.log(body);
    onSave({ ...body, amount: parseInt(amount) }, isEdit);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      centered
      maskClosable={false}
      footer={
        <div className="flex justify-end space-x-4">
          <Button onClick={onCancel}>Back</Button>
          <Button
            type="primary"
            onClick={handleOnSave}
            loading={isEdit ? updateLoading : submitLoading}
          >
            Save
          </Button>
        </div>
      }
      title={
        <p className="text-2xl text-gray-500 font-mulish font-bold text-center">Anggaran MAPA</p>
      }
      width="1000px"
    >
      <Form form={form} className="space-y-2">
        <div className="grid grid-cols-12">
          <p className="col-span-3">Tipe Anggaran</p>
          <div className="col-span-9">
            <Form.Item name="tipe_anggaran_name">
              <Input disabled={isEdit} style={{ width: 250 }} />
            </Form.Item>
          </div>
        </div>
        <div className="grid grid-cols-12 pt-4">
          <p className="col-span-3">Biaya</p>
          <div className="col-span-9">
            <Form.Item name="amount">
              <InputNumber type="number" prefix="Rp. " controls={false} style={{ width: 250 }} />
            </Form.Item>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <p className="col-span-3">Tanggal</p>
          <div className="col-span-9">
            <Form.Item name="tanggal" normalize={(value) => moment(value)}>
              <DatePicker style={{ width: 250 }} />
            </Form.Item>
          </div>
        </div>
        <div>
          <p>Keterangan</p>
          <Form.Item name="deskripsi">
            <Input.TextArea rows={3} />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
