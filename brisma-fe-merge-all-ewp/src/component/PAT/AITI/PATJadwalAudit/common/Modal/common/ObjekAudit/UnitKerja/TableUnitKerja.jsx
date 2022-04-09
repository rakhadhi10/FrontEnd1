import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Popover, Select, Table, Upload } from "antd";
import { DeleteOutlined, FormOutlined, PaperClipOutlined } from "@ant-design/icons";
import confirmDelete from "../../../../../../../../utils/confirmDelete";
import { fetchRefTipeObjek } from "../../../../../../../../../store/ducks/reference/actions";
import { getRefTipeObjek } from "../../../../../../../../../store/ducks/reference/selectors";

const { Option } = Select

const TableUnitKerjaSpecialTematik = ({
  rows,
  ref_tipe_objek,
  updateRows,
  fetchRefTipeObjek,
  uploadFile,
  removeFile
}) => {
  const columns = [
    {
      title: "Object Information",
      children: [
        {
          title: "Objek",
          dataIndex: "objek",
          align: "center",
          width: "20%"
        },
        {
          title: "Tipe Objek",
          dataIndex: "tipe_objek",
          align: "center",
          width: "20%"
        },
      ]
    },
    {
      title: "Information of Assessment",
      children: [
        {
          title: "> 2 Years NA",
          dataIndex: "years",
          align: "center",
          sorter: {
            compare: (a, b) => a.years.length - b.years.length,
          },
        },
        {
          title: "Temuan Fraud",
          dataIndex: "temuanFraud",
          align: "center",
          sorter: {
            compare: (a, b) => a.temuanFraud - b.temuanFraud,
          },
        },
        {
          title: "Temuan Major",
          dataIndex: "temuanMajor",
          align: "center",
          sorter: {
            compare: (a, b) => a.temuanMajor - b.temuanMajor,
          },
        },
        {
          title: "Temuan Moderate",
          dataIndex: "temuanModerate",
          align: "center",
          sorter: {
            compare: (a, b) => a.temuanModerate - b.temuanModerate,
          },
        },
      ]
    },
    {
      title: "Deskripsi",
      dataIndex: "deskripsi",
      align: "center",
      render: (_, record) =>
        <Popover
          trigger="click"
          overlayStyle={{ width: "300px" }}
          content={
            <div>
              <Input.TextArea
                placeholder="Isi deskripsi"
                value={record.deskripsi}
                onChange={(e) => handleEditDeskripsi(record, e.target.value)}
              />
            </div>
          }
        >
          <FormOutlined className="cursor-pointer text-primary-blue" />,
        </Popover>
    },
    {
      title: "Attachments",
      dataIndex: "attachments",
      align: "center",
      render: (a, record, index) =>
        <Popover
          trigger="click"
          overlayStyle={{ width: "300px" }}
          content={
            <div className="flex flex-col items-center">
              <p>List Attachment</p>
              <Upload
                multiple
                className="flex flex-col items-center"
                fileList={a.map((u) => {
                  const [url, name] = u.split("@");
                  return {
                    url: `${url}`,
                    name,
                  }
                })}
                onRemove={(file) => removeFile(index, file.url)}
                customRequest={
                  async option => {
                    await uploadFile(index, option)
                  }
                }
              >
                <Button type="primary">Upload</Button>
              </Upload>
            </div>
          }
        >
          <PaperClipOutlined className="cursor-pointer text-primary-yellow" />,
        </Popover>
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        return (
          <DeleteOutlined
            className="cursor-pointer text-primary-red"
            onClick={confirmDelete(
              null,
              "Apakah anda yakin ingin menghapus data ini?",
              () => handleDelete(record.objek)
            )}
          />
        )
      }
    },
  ];

  useEffect(() => fetchRefTipeObjek())

  const [selectedTipeObjek, setSelectedTipeObjek] = useState("")

  const handleDelete = (objek) => {
    updateRows(rows.filter((item) => item.objek !== objek))
  };

  const handleEditDeskripsi = (record, value) => {
    const newData = [...rows];
    const index = newData.findIndex((item) => record.objek === item.objek);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...record, deskripsi: value });
    updateRows(newData)
  }

  return (
    <div className="mt-8">
      <Form
        labelAlign="left"
        labelCol={{ span: 4 }}
        className="my-4"
      >
        <div className="grid grid-cols-5">
          <div className="col-start-2 col-span-3">
            <Form.Item
              shouldUpdate
              noStyle
            >
              {({ resetFields }) => {
                return (
                  <Form.Item
                    label="Tipe Object"
                    labelAlign="left"
                    name="tipe_objek"
                  >
                    <Select placeholder="Tipe Object" onChange={(val) => {
                      setSelectedTipeObjek(val)
                      resetFields(["objek"])
                    }}>
                      {ref_tipe_objek.map(t => (<Option key={t.name} value={t.name}>{t.name}</Option>))}
                    </Select>
                  </Form.Item>
                )
              }}
            </Form.Item>
            <Form.Item
              label="Object"
              labelAlign="left"
              name="objek"
            >
              <Select placeholder="Object">
                {!selectedTipeObjek ? [] :
                  ref_tipe_objek
                    .find(t => t.name === selectedTipeObjek).stc_aiti_objek
                    .map(o => (<Option key={o.name} value={o.name}>{o.name}</Option>))
                }
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="grid grid-cols-5">
          <div className="col-start-2 col-span-3 flex justify-end">
            <Form.Item shouldUpdate noStyle>
              {({ getFieldsValue, resetFields }) => {
                const { tipe_objek, objek } = getFieldsValue()
                const canAdd = tipe_objek && objek
                return (
                  <Button
                    type="primary"
                    disabled={!canAdd}
                    onClick={() => {
                      if (rows.some(r => r.objek === objek)) return
                      const newObject = {
                        tipe_objek,
                        objek,
                        deskripsi: "",
                        attachments: []
                      }
                      updateRows([...rows, newObject])
                      resetFields([["objek"]])
                    }}
                  >
                    Tambah
                  </Button>
                )
              }}
            </Form.Item>
          </div>
        </div>
      </Form>
      <Table
        scroll={{ y: 200 }}
        size="small"
        pagination={false}
        dataSource={rows}
        columns={columns}
        bordered
      />
    </div>
  );
};

const mapDispatchToProps = {
  fetchRefTipeObjek: fetchRefTipeObjek
}

const mapStateToProps = state => ({
  ref_tipe_objek: getRefTipeObjek(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(TableUnitKerjaSpecialTematik)
