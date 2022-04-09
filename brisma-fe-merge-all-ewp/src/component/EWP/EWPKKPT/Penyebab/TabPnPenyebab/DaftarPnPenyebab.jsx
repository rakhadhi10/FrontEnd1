import React from "react";
import { Button, DatePicker, Form, Input, Radio } from "antd";

export const DaftarPnPenyebab = ({ handleOnSave }) => {
  const [form] = Form.useForm();

  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      'tglLahir': fieldsValue['tglLahir'].format('YYYY-MM-DD'),
    };
    handleOnSave(values);
    form.resetFields();
  };


  return (
    <Form form={form} className="font-mulish text-primary-blue" onFinish={onFinish}>
      <div className="flex">
        <p className="w-1/12">PN</p>
        <Form.Item name="pn" className="w-11/12">
          <Input />
        </Form.Item>
      </div>
      <div className="flex">
        <p className="w-1/12">Nama</p>
        <Form.Item name="nama" className="w-11/12">
          <Input />
        </Form.Item>
      </div>
      <div className="flex">
        <p className="w-1/12">Jabatan</p>
        <Form.Item name="jabatan" className="w-11/12">
          <Input />
        </Form.Item>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex">
          <p className="w-2/12">Tempat</p>
          <Form.Item name="tempat" className="w-10/12">
            <Input />
          </Form.Item>
        </div>
        <div className="flex">
          <p className="w-2/12">Tgl Lahir</p>
          <Form.Item name="tglLahir" className="w-10/12">
            <DatePicker />
          </Form.Item>
        </div>
      </div>
      <div className="flex">
        <p className="w-1/12">Jenis Kelamin</p>
        <Form.Item name="jenisKelamin" className="w-11/12">
          <Radio.Group>
            <Radio value="Laki-laki">Laki-laki</Radio>
            <Radio value="Perempuan">Perempuan</Radio>
          </Radio.Group>
        </Form.Item>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex">
          <p className="w-2/12">Job Grade</p>
          <Form.Item name="jobGrade" className="w-10/12">
            <Input />
          </Form.Item>
        </div>
        <div className="flex">
          <p className="w-2/12">Person Grade</p>
          <Form.Item name="personGrade" className="w-10/12">
            <Input />
          </Form.Item>
        </div>
      </div>
      <div className="flex">
        <p className="w-1/12">MKE</p>
        <Form.Item name="mke" className="w-11/12">
          <Input />
        </Form.Item>
      </div>
      <div className="flex">
        <p className="w-1/12">MKJ</p>
        <Form.Item name="mkj" className="w-11/12">
          <Input />
        </Form.Item>
      </div>
      <div className="flex">
        <p className="w-1/12">Status Perkawinan</p>
        <Form.Item name="statusPerkawinan" className="w-11/12">
          <Input />
        </Form.Item>
      </div>
      <div className="flex justify-end py-4">
        <Button
          type="primary"
          style={{ backgroundColor: "#3C64B1", borderColor: "#3C64B1" }}
          htmlType="submit"
        >
          Save
        </Button>

      </div>
    </Form>
  );
};
