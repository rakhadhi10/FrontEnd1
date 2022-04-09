import React, { useEffect, useState } from "react";
import { Form, Tag, Select, Input, Button, Cascader } from "antd";
import { EditOutlined } from "@ant-design/icons";

const penyebab1 = [
  { key: 1, value: "1-Penyebab 1 A", label: "Penyebab 1 A" },
  { key: 2, value: "2-Penyebab 1 B", label: "Penyebab 1 B" },
  { key: 3, value: "3-Penyebab 1 C", label: "Penyebab 1 C" },
];
const penyebab2 = [
  { key: 1, value: "1-Penyebab 2 A", label: "Penyebab 2 A" },
  { key: 2, value: "2-Penyebab 2 B", label: "Penyebab 2 B" },
  { key: 3, value: "3-Penyebab 2 C", label: "Penyebab 2 C" },
];
const penyebab3 = [
  { key: 1, value: "1-Penyebab 3 A", label: "Penyebab 3 A" },
  { key: 2, value: "2-Penyebab 3 B", label: "Penyebab 3 B" },
  { key: 3, value: "3-Penyebab 3 C", label: "Penyebab 3 C" },
];
const penyebab4 = [
  { key: 1, value: "1-Penyebab 4 A", label: "Penyebab 4 A" },
  { key: 2, value: "2-Penyebab 4 B", label: "Penyebab 4 B" },
  { key: 3, value: "3-Penyebab 4 C", label: "Penyebab 4 C" },
];
const penyebab5 = [
  { key: 1, value: "1-Penyebab 5 A", label: "Penyebab 5 A" },
  { key: 2, value: "2-Penyebab 5 B", label: "Penyebab 5 B" },
  { key: 3, value: "3-Penyebab 5 C", label: "Penyebab 5 C" },
];

const options = [
  {
    value: '1',
    label: 'Penyebab 1 A',
    children: [
      {
        value: '1-1',
        label: 'Penyebab 1 B',
        children: [
          {
            value: '1-1-1',
            label: 'Penyebab 1 C',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Penyebab 2 A',
    children: [
      {
        value: '2-1',
        label: 'Penyebab 2 B',
        children: [
          {
            value: '2-1-1',
            label: 'Penyebab 2 C',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Penyebab 3 A',
    children: [
      {
        value: '3-1',
        label: 'Penyebab 3 B',
        children: [
          {
            value: '3-1-1',
            label: 'Penyebab 3 C',
          },
        ],
      },
    ],
  },
];


const { Option } = Select;
const { TextArea } = Input;

export const FormPenyebab = ({ showModal, onSave, value, dataPenyebabList }) => {

  const [form] = Form.useForm();
  const [penyebabHistory, setpenyebabHistory] = useState({
    total_selected: 0,
    data_selected: []
  });


  useEffect(() => form.setFieldsValue({ pn: value }));



  const handleOnSave = () => {

    const formData = form.getFieldsValue(["desc"]);
    let desc = formData.desc

    const namaPenyebab = penyebabHistory.data_selected.map((item) => item);

    const newData = {
      penyebab_kode: namaPenyebab[penyebabHistory.data_selected.length - 1].value,
      penyebab_name: namaPenyebab[penyebabHistory.data_selected.length - 1].label,
      desc
    };

    onSave(newData);
    setpenyebabHistory(state => ({
      total_selected: 0,
      data_selected: []
    }));
    form.resetFields();
  };


  function onChange(value, selectedOptions) {

    // console.log(value[value.length - 1]);
    setpenyebabHistory(state => ({
      total_selected: value.length !== undefined ? value.length : 0,
      data_selected: selectedOptions
    }))

  }


  return (
    <Form form={form}>
      <div>
        <div className="flex gap-3 items-center">
          <p className="font-mulish text-primary-blue flex-wrap w-1/12">Penyebab History</p>
          <div className="py-3 px-2 bg-gray-100 rounded-lg w-11/12 ">
            {
              penyebabHistory.data_selected.map((item, key) => {

                return (
                  <Tag key={key} color={key + 1 === penyebabHistory.total_selected ? "red" : "#AAAAAA"}>
                    {item.label}
                  </Tag>
                )
              })}
          </div>
        </div>
        <div className="flex gap-3 py-4">
          <p className="font-mulish text-primary-blue flex-wrap w-1/12">Penyebab List</p>
          <Cascader allowClear={false} options={dataPenyebabList} className="w-80" size="large" onChange={onChange} placeholder="Please select" />
          {/* <Form.Item name="listPenyebab">
            <div className="flex flex-wrap gap-3 w-11/12">
              <Select onChange={handleOnSelected} style={{ width: "250px" }}>
                {penyebab1.map((item, key) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
              <Select onChange={handleOnSelected} style={{ width: "250px" }}>
                {penyebab2.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
              <Select onChange={handleOnSelected} style={{ width: "250px" }}>
                {penyebab3.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
              <Select onChange={handleOnSelected} style={{ width: "250px" }}>
                {penyebab4.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
              <Select onChange={handleOnSelected} style={{ width: "250px" }}>
                {penyebab5.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </div>
          </Form.Item> */}
        </div>

        <div className="flex gap-3">
          <p className="font-mulish text-primary-blue flex-wrap w-1/12">Deskripsi</p>
          <Form.Item name="desc" className="w-11/12">
            <TextArea rows={4} placeholder="Masukan deskripsi" />
          </Form.Item>
        </div>
        <div className="flex gap-3">
          <p className="font-mulish text-primary-blue flex-wrap w-1/12">Pn</p>
          <Form.Item name="pn" className="w-11/12">
            <Input
              placeholder="Pn...."
              readOnly
              suffix={
                <Button
                  icon={<EditOutlined style={{ color: "#FFF" }} />}
                  style={{ backgroundColor: "#6BB669" }}
                  onClick={showModal}
                />
              }
            />
          </Form.Item>
        </div>
        <div className="flex justify-end py-4">
          <Button
            type="primary"
            style={{ backgroundColor: "#3C64B1", borderColor: "#3C64B1" }}
            onClick={handleOnSave}
          >
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
};
