import { Modal, Button, Form, Select, Input, AutoComplete } from "antd";
import React, { useEffect, useState } from "react";

const { Option } = Select;
const { TextArea } = Input;




export const ModalCreateRekomendasi = ({ visible, handleCancel, handleSave, value }) => {
  const [form] = Form.useForm();
  const [valueAuto, setValueAuto] = useState('');
  const [options, setOptions] = useState([]);

  const mockVal = (num) => ({
    value: `${num} - Name`,
    label: <p>{num} - Name</p>
  });


  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(1), mockVal(2), mockVal(3)],
    );
  };


  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  useEffect(() => {

    if (value !== null) {
      form.setFieldsValue({
        tipeRekomendasi: `${value.tipe_rekomendasi_kode}-${value.tipe_rekomendasi_name}`,
        uraian: value.desc,
        ukerTujuan: value.ref_uker_tujuan_branch_name
      });
    }
  }, [value]);

  const onCloseandBlur = () => {
    form.resetFields();
    handleCancel();
  };


  const onFinish = (fieldsValue) => {
    let tipeRekomendasi = fieldsValue.tipeRekomendasi.split("-")
    const values = {
      "tipe_rekomendasi_kode": tipeRekomendasi[0],
      "tipe_rekomendasi_name": tipeRekomendasi[1],
      "desc": fieldsValue.uraian,
      "ref_uker_tujuan_branch_kode": 94,
      "ref_uker_tujuan_branch_name": "KC Sumedang",
      "ref_uker_tujuan_orgeh": null,
      "ref_uker_tujuan_orgeh_name": null

    };
    console.log(values)
    if (value !== null) {
      handleSave(values, "UPDATE")
    } else {
      handleSave(values, "CREATE")
    }
    form.resetFields();
  };


  return (
    <Modal
      visible={visible}
      onCancel={onCloseandBlur}
      footer={null}
      title={
        <p className="text-2xl text-gray-500 font-mulish font-bold text-center">
          Create Rekomendasi KKPT
        </p>
      }
      width="1000px"
    >
      <Form form={form} onFinish={onFinish}>
        <div className="flex flex-col justify-center gap-5">
          <div className="flex justify-center">
            <p className="w-2/12">Tipe Rekomendasi</p>
            <Form.Item rules={[
              {
                required: true,
                message: 'Silahkan pilih tipe rekomendasi',
              },
            ]} name="tipeRekomendasi" style={{ width: "350px" }}>
              <Select placeholder="Pilih Tipe Rekomendasi" >
                <Option key="Corrective" value="1-Corrective">
                  Corrective
                </Option>
                <Option key="Preventive" value="2-Preventive">
                  Preventive
                </Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex justify-center">
            <p className="w-2/12">Uker Tujuan</p>
            <Form.Item rules={[
              {
                required: true,
                message: 'Silahkan Cari Uker Tujuan Anda',
              },
            ]} name="ukerTujuan" style={{ width: "350px" }}>
              {/* <Input placeholder="Search by kode or id" /> */}
              <AutoComplete
                options={options}
                style={{ width: 200 }}
                onSelect={onSelect}
                onSearch={onSearch}
                placeholder="Search by kode or id"
              />
            </Form.Item>
          </div>
          <div className="flex justify-center">
            <p className="w-2/12">Uraian</p>
            <Form.Item rules={[
              {
                required: true,
                message: 'Masukan Deskripsi',
              },
            ]} name="uraian" style={{ width: "350px" }}>
              <TextArea placeholder="Deskripsi" rows={4} />
            </Form.Item>
          </div>
          <div className="flex justify-end">
            <Button htmlType="submit" type="primary" >
              Save
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
