import React, { useState } from 'react';
import { Table, Popconfirm, Form, Typography } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import { validateAuditor } from '../../../utils/validators';
import DebounceAuditor from '../../../AutoComplete/DebounceAuditor';
import { updateMakers } from '../../../../store/ducks/PATListProjects/actions';
import { connect } from 'react-redux';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          rules={[
            () => ({
              validator(rule, value) {
                return validateAuditor(rule, value)
              },
            }),
          ]}
          style={{ margin: 0, padding: 0 }}
        >
          <DebounceAuditor
            placeholder="Ketik Nama atau PN"
          />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TableMakers = ({ data, kategori, updateMakers }) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.pn === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.pn);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const { pn } = await form.validateFields();
      updateMakers(kategori, editingKey, pn)
      setEditingKey("")
      // const newData = [...data];
      // const index = newData.findIndex((item) => key === item.key);

      // if (index > -1) {
      //   // const item = newData[index];
      //   // newData.splice(index, 1, { ...item, ...row });
      //   setEditingKey('');
      // } else {
      //   // newData.push(row);
      //   setEditingKey('');
      // }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Personal Number',
      dataIndex: 'pn',
      align: "center",
      width: "20%",
      editable: true,
    },
    {
      title: 'Nama Maker',
      dataIndex: 'nama',
      align: "center",
      width: "60%",
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Typography.Link>
                Cancel
              </Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            <EditOutlined className="text-lg text-black" />
          </Typography.Link>
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
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        ghost
        size="small"
        rowClassName="editable-row"
        dataSource={data}
        columns={mergedColumns}
        pagination={false}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
      />
    </Form>
  );
};

const mapDispatchToProps = {
  updateMakers: updateMakers
}

export default connect(null, mapDispatchToProps)(TableMakers);