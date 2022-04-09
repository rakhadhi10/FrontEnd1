import React, { useState } from "react";
import { Button, Table, Input, Popconfirm, Form, Select, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DebounceAuditee from "../../../../AutoComplete/DebounceAuditee";
import DebounceAuditor from "../../../../AutoComplete/DebounceAuditor";

const EditableCell = ({
  type,
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const getInputNode = () => {
    if (inputType === "nama") {
      if (type === "auditee") {
        return (
          <DebounceAuditee
            placeholder="Ketik Nama atau PN"
            className="w-full m-0"
          />
        )
      } else {
        return (
          <DebounceAuditor
            placeholder="Ketik Nama atau PN"
            className="w-full m-0"
          />
        )
      }
    }
    if (inputType === "posisi") return (
      <Select>
        <Select.Option value="Auditee">
          Auditee
        </Select.Option>
        <Select.Option value="Auditor">
          Auditor
        </Select.Option>
      </Select>
    )
    else return <Input />
  }

  const inputNode = getInputNode()

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TableAssign = ({ type, addButtonLabel = "Add", data, updateData, setEditing }) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const add = () => {
    if (editingKey) return
    const key = data.length
    updateData(prev => {
      const copy = [...prev]
      copy.unshift({
        key,
        nama: "",
        posisi: "",
        deskripsi: "",
        new: true,
      })
      return copy
    })
    form.setFieldsValue({
      nama: "",
      posisi: "",
      deskripsi: "",
    });
    setEditingKey(key)
    setEditing(true)
  }

  const edit = (record) => {
    form.setFieldsValue({
      nama: "",
      posisi: "",
      deskripsi: "",
      ...record,
    });
    setEditingKey(record.key);
    setEditing(true)
  };

  const cancel = (record) => {
    if (record.new) deleteRow(record.key)
    setEditingKey("");
    setEditing(false)
  };

  const deleteRow = (key) => {
    const newData = data.filter(a => a.key !== key)
    updateData(newData);
  }

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        updateData(newData);
        setEditingKey("");
        setEditing(false)
      } else {
        newData.push(row);
        updateData(newData);
        setEditingKey("");
        setEditing(false)
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "PN - Nama",
      dataIndex: "nama",
      width: "25%",
      editable: true,
      align: "center",
      render: (obj) => typeof obj === "object" && `${obj.pn} - ${obj.nama}`
    },
    {
      title: "Posisi/Jabatan",
      dataIndex: "posisi",
      width: "15%",
      editable: true,
      align: "center",
    },
    {
      title: "Deskripsi Tugas",
      dataIndex: "deskripsi",
      width: "40%",
      editable: true,
    },
    {
      title: (
        <span
          className="
          py-2 px-4 
          cursor-pointer hover:text-blue-500 hover:border-blue-500
          text-primary-blue border border-dashed border-primary-blue rounded-lg
          "
          onClick={add}
        >
          &#43;	{addButtonLabel}
        </span>
      ),
      align: "center",
      dataIndex: "actions",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="flex justify-center">
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record)}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>Cancel</a>
            </Popconfirm>
          </div>
        ) : (
          <div className="flex justify-center gap-2">
            <Button
              ghost
              disabled={editingKey !== ""}
              icon={<EditOutlined className="text-primary-blue" />}
              onClick={() => edit(record)}
            />
            <Button
              ghost
              disabled={editingKey !== ""}
              icon={<DeleteOutlined className="text-primary-red" />}
              onClick={() => deleteRow(record.key)}
            />
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        type,
        inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};

export default TableAssign;