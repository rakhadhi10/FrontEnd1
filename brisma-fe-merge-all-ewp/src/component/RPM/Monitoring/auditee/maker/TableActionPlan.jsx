import { useState } from "react";
import { connect } from "react-redux";
import { Button, Table, Input, Popconfirm, Form, Typography, Upload } from "antd";
import { EditOutlined, DeleteOutlined, PaperClipOutlined } from "@ant-design/icons";
import ConfirmSubmit from "../../common/maker/ConfirmSubmit";
import STATUS from "../../../../../utils/rpmStatus";
import { approveActionPlanMaker, uploadFile } from "../../../../../store/ducks/RPMAuditee/actions";
import { createErrorNotification, createSuccessNotification } from "../../../../utils/notifications";

const uploadCell = ({ value, onChange, uploadFile }) => {
  const [url, name] = !value ? [] : value.split("@")
  if (url && name) {
    return (
      <Upload
        showUploadList={false}
        customRequest={
          async option => {
            const { error, data } = await uploadFile(option)
            if (!error) onChange(data)
          }
        }
      >
        <p className="underline">{name}</p>
      </Upload>
    )
  }
  else {
    return (
      <Upload
        showUploadList={false}
        customRequest={
          async option => {
            const { error, data } = await uploadFile(option)
            if (!error) onChange(data)
          }
        }
      >
        <Button icon={<PaperClipOutlined className="text-primary-blue" />} ghost />
      </Upload>
    )
  }
}

const UploadCell = connect(null, { uploadFile: uploadFile })(uploadCell)

const EditableCell = ({
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
    if (inputType === "attachment") return (
      <UploadCell />
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
              required: inputType === "attachment",
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

const TableActionPlan = ({
  id,
  nama,
  rekomendasi_kkpt,
  project_rpm_id,
  kkpt_id,
  status_kode,
  lampiran = [],
  submit,
}) => {
  const disabled = status_kode !== STATUS.PENDING_MAKER_AUDITEE
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [data, setData] = useState(lampiran)
  const [submitted, setSubmitted] = useState(false)

  const isEditing = (record) => record.key === editingKey;

  const mapData = !data ? [] : data.map((d, idx) => ({
    ...d,
    key: d.key || String(idx),
  }))

  const add = () => {
    if (editingKey) return
    const key = `new${Math.random()}`
    setData(prev => {
      const copy = [...prev]
      copy.unshift({
        key,
        attachment: "",
        deskripsi: "",
      })
      return copy
    })
    form.setFieldsValue({
      attachment: "",
      deskripsi: "",
    });
    setEditingKey(key)
  }

  const edit = (record) => {
    form.setFieldsValue({
      attachment: "",
      deskripsi: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = (record) => {
    if (record.key.includes("new")) deleteRow(record)
    setEditingKey("");
  };

  const deleteRow = (record) => {
    const delIdx = data.findIndex(a => {
      if (a.key) return a.key === record.key
      else return a.attachment === record.attachment
    })
    const newData = [...data]
    newData.splice(delIdx, 1)
    console.log({ record, newData, delIdx })
    setData(newData);
  }

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...mapData];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row, key: String(Math.random()) });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Lampiran",
      dataIndex: "attachment",
      width: "40%",
      editable: true,
      align: "center",
      render: (val) => {
        const [url, name] = val ? val.split("@") : []
        if (url && name) {
          return (
            <a className="underline" href={url} target="_blank" rel="noreferrer" >{name}</a>
          )
        }
        else {
          return <p className="text-primary-red">URL not valid</p>
        }
      }
    },
    {
      title: "Deskripsi",
      dataIndex: "deskripsi",
      width: "40%",
      editable: true,
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "actions",
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        const isNotOnMaker = status_kode !== STATUS.PENDING_MAKER_AUDITEE
        const disabled = editingKey !== "" || isNotOnMaker || submitted
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
              disabled={disabled}
              icon={<EditOutlined className={!disabled && "text-primary-blue"} />}
              onClick={() => edit(record)}
            />
            <Button
              ghost
              disabled={disabled}
              icon={<DeleteOutlined className={!disabled && "text-primary-red"} />}
              onClick={() => deleteRow(record)}
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
        inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <div className="flex flex-col gap-4">
        <Table
          bordered
          size="small"
          pagination={false}
          dataSource={mapData}
          rowClassName="editable-row"
          columns={mergedColumns}
          scroll={{ y: 200 }}
          locale={{
            emptyText: (
              <span className="text-black">
                Anda belum mengunggah lampiran, untuk mengunggah lampiran, klik tombol “Tambah Lampiran” di bawah tabel ini.
              </span>)
          }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
        />
        <MakerActions
          statusDisabled={disabled || submitted}
          editingKey={editingKey}
          add={add}
          submit={
            async () => {
              const success = await submit(
                project_rpm_id,
                kkpt_id,
                rekomendasi_kkpt,
                {
                  id: id,
                  nama: nama
                },
                mapData
              )
              if (success) {
                setSubmitted(true)
                createSuccessNotification("Action Plan", "Berhasil submit action plan")()
              } else {
                createErrorNotification("Action Plan", "Gagal submit action plan")()
              }

              return success
            }
          }
        />
      </div>
    </Form>
  );
};

const MakerActions = ({ statusDisabled, editingKey, add, submit }) => {
  return (
    <div className="flex justify-end items-center gap-4">
      <p
        hidden={statusDisabled || editingKey}
        onClick={() => add()}
        style={{
          color: "#3C64B1",
          border: "1px dashed #A9C6FF",
          borderRadius: "10px",
          padding: "0.3rem 0.5rem",
          cursor: "pointer",
        }}
      >
        &#43; Tambah Lampiran
      </p>
      <Button
        type="primary"
        style={{ borderRadius: "10px" }}
        disabled={statusDisabled || editingKey}
        onClick={
          () => ConfirmSubmit(async () => {
            const success = await submit()
            return success
          })
        }
      >
        Submit
      </Button>
    </div>
  )
}

const mapDispatchToProps = {
  submit: approveActionPlanMaker,
}

export default connect(null, mapDispatchToProps)(TableActionPlan);