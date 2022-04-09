import React, { useContext, useState, useRef } from "react";
import { Select, Form, InputNumber } from "antd";
import DebounceOrgeh from "../../../../../AutoComplete/DebounceOrgeh";

const EditableContext = React.createContext(null);

const { Option } = Select;
const ukerdata = [
  { uker: "Divisi" },
  { uker: "PA" },
  { uker: "KC" },
  { uker: "KK" },
  { uker: "Kanwil" },
  { uker: "Desk" },
  { uker: "KCP" },
  { uker: "Unit" },
];

export const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  typeInput,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  const toggleEdit = () => {
    setEditing(!editing);
    if (
      record[dataIndex] === "Input Nama" ||
      record[dataIndex] === "Input Kode" ||
      record[dataIndex] === "Pilih Tipe"
    ) {
      form.setFieldsValue(null);
    } else if (record[dataIndex] === "Isi Temuan") {
      form.setFieldsValue({ [dataIndex]: "0" });
    } else {
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    }
  };

  // useEffect(() => {
  //   if (editing) {
  //     inputRef.current.focus();
  //   }
  // }, [editing]);

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  const inputNode =
    typeInput === "number" ? (
      <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
    ) : typeInput === "uker" ? (
      <Select ref={inputRef} onPressEnter={save} onBlur={save}>
        {ukerdata.map((item) => (
          <Option key={item.uker} value={item.uker}>
            {item.uker}
          </Option>
        ))}
      </Select>
    ) : typeInput === "years" ? (
      <Select ref={inputRef} onPressEnter={save} onBlur={save}>
        <Option value="Yes">Yes</Option>
        <Option value="No">No</Option>
      </Select>
    ) : (
      <DebounceOrgeh ref={inputRef} onBlur={save} />
    );

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          () => ({
            validator(_, value) {
              if (typeof value === "object") return Promise.resolve()
              return Promise.reject("Please select from the provided options")
            },
          }),
        ]}
      >
        {inputNode}
      </Form.Item>
    ) : (
      <div
        style={{
          padding: "5px 12px",
          cursor: "pointer",
          border: "1px solid #d9d9d9",
          borderRadius: "2px"
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
