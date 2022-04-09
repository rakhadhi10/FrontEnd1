import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Popconfirm, Table, Typography } from "antd";
import { useState } from "react";
import moment from "moment";
import ConfirmRekomendasi from "./ConfirmRekomendasi";
import ConfirmSubmit from "./ConfirmSubmit";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { addNegosiasi } from "../../../store/ducks/RPMNegosiasi/actions";
import { useEffect } from "react";
import { createErrorNotification, createSuccessNotification } from "../../utils/notifications";

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
    if (inputType === "batas_waktu") return (
      <DatePicker
        format="DD/MM/YYYY"
        defaultPickerValue={moment().endOf('day')}
        disabledDate={(current) => {
          return current && current <= moment().endOf('day')
        }}
      />
    )
    return <Input />
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

const TableMeetingRincian = ({ data = [], isOnKTA, addNegosiasi, fetchActionPlanNego }) => {
  const { id, kkpt_id } = useParams()
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [submitted, setSubmitted] = useState(false)

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      action_plan: "",
      batas_waktu: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const addActionPlan = (rekomendasi_id) => {
    if (editingKey) return
    const rekomendasi = mockData.find(r => String(r.id) === String(rekomendasi_id))
    const action_length = rekomendasi.action_plan.length
    const id = `${action_length + 1}new`
    setMockData(prev => {
      const copy = [...prev]
      const r = copy.find(r => String(r.id) === String(rekomendasi_id))
      r.action_plan.unshift({
        id: id,
        nama: "",
        batas_waktu: moment().format(),
      })
      return copy
    })
    form.setFieldsValue({
      action_plan: "",
      batas_waktu: "",
    });
    setEditingKey(`${rekomendasi_id},${action_length + 1}new`)
  }

  const addRekomendasi = () => {
    if (editingKey) return
    ConfirmRekomendasi((rekomendasi) => {
      const new_rek_id = `new${mockData.length + 1}`
      const new_act_id = `new${mockData.reduce((p, c) => p += c.action_plan.length, 0) + 1}`
      setMockData(prev => ([
        {
          id: new_rek_id,
          nama: rekomendasi,
          action_plan: [
            {
              id: new_act_id,
              nama: "",
              batas_waktu: moment().format()
            }
          ]
        },
        ...prev
      ]))
      form.setFieldsValue({
        action_plan: "",
        batas_waktu: "",
      });
      setEditingKey(`${new_rek_id},${new_act_id}`)
      return true
    })
  }

  const cancel = (record) => {
    if (record.key.includes("new")) deleteActionPlan(record, true)
    setEditingKey("");
  };

  const deleteActionPlan = (record, newRow) => {
    const [rekomendasi_id, action_plan_id] = record.key.split(",")
    const filterMockData = mockData.filter(r => String(r.id) !== String(rekomendasi_id))
    const targetRekomendasi = mockData.find(r => String(r.id) === String(rekomendasi_id))
    targetRekomendasi.action_plan = targetRekomendasi.action_plan.filter(a => {
      let id = a.id
      if (newRow) id = String(a.id).split(",")[0]
      return String(id) !== String(action_plan_id)
    })
    setMockData([targetRekomendasi, ...filterMockData])
  }

  const save = async (record) => {
    try {
      const row = await form.validateFields();
      const [rekomendasi_id, action_plan_id] = record.key.split(",")
      const newMockData = [...mockData];
      const index = newMockData.findIndex((item) => String(item.id) === String(rekomendasi_id));

      if (index > -1) {
        const rekomendasi = newMockData[index];

        const actionIndex = rekomendasi.action_plan.findIndex(a => {
          let id = a.id
          if (String(a.id).includes("new")) id = String(a.id).split(",")[0]
          return String(id) === String(action_plan_id)
        })
        const targetActionPlan = rekomendasi.action_plan[actionIndex]

        // if (targetActionPlan.id && String(targetActionPlan.id).includes("new")) {
        //   targetActionPlan.id = String(targetActionPlan.id).split(",")[0]
        // }
        targetActionPlan.nama = row.action_plan
        targetActionPlan.batas_waktu = moment(row.batas_waktu).format()
        rekomendasi.action_plan.splice(actionIndex, 1, { ...targetActionPlan })

        newMockData.splice(index, 1, { ...rekomendasi });
        setMockData(newMockData);
      }
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const [mockData, setMockData] = useState(data)
  useEffect(() => setMockData(data), [data])

  const mappedData = mockData.map(d => {
    return d.action_plan ? d.action_plan.map((a, idx) => ({
      key: `${d.id},${a.id}`,
      rekomendasi: {
        ...d,
        head: idx === 0,
      },
      action_plan: a.nama,
      batas_waktu: moment(a.batas_waktu),
    })) : []
  }).flat().sort((a, b) => a.rekomendasi.id - b.rekomendasi.id)

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      align: "center",
      render: (a, b, idx) => idx + 1
    },
    {
      title: "Rekomendasi",
      dataIndex: "rekomendasi",
      // editable: true,
      render: (r, rec) => {
        const obj = {
          props: { rowSpan: r.head ? rec.rekomendasi.action_plan.length : 0 },
          children: (
            <div>
              <p>{r.nama}</p>
              <div className="my-4" hidden={!isOnKTA || submitted}>
                <span
                  onClick={() => addActionPlan(r.id)}
                  className="
                    cursor-pointer select-none
                    px-2 py-1 
                  text-primary-blue border border-dashed border-primary-blue rounded-lg 
                  hover:text-blue-400 hover:border-blue-400
                  "
                >
                  &#43;	Tambah Action Plan
                </span>
              </div>
            </div>
          )
        }
        return obj
      },
    },
    {
      title: "Action Plan",
      dataIndex: "action_plan",
      editable: true,
      render: (text, idx) => {
        return text
      }

    },
    {
      title: "Batas Waktu",
      dataIndex: "batas_waktu",
      editable: true,
      align: "center",
      render: (m) => m.format("DD MMMM YYYY")
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="flex justify-center">
            <Typography.Link
              onClick={() => save(record)}
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
          <div className="flex justify-center items-center space-x-4">
            <Button
              disabled={!isOnKTA || submitted}
              icon={<EditOutlined className={(!submitted && isOnKTA) && "text-primary-blue"} />}
              onClick={() => edit(record)}
            />
            <Button
              disabled={!isOnKTA || submitted}
              icon={< DeleteOutlined className={(!submitted && isOnKTA) && "text-primary-red"} />}
              onClick={() => {
                deleteActionPlan(record)
              }}
            />
          </div >
        )
      }
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
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <span
          hidden={submitted || !isOnKTA}
          onClick={() => addRekomendasi()}
          className="
            cursor-pointer select-none
            px-2 py-1 
          text-primary-blue border border-dashed border-primary-blue rounded-lg 
          hover:text-blue-400 hover:border-blue-400
          "
        >
          &#43;	Tambah Rekomendasi
        </span>
      </div>
      <Form form={form} component={false}>
        <Table
          dataSource={mappedData}
          columns={mergedColumns}
          pagination={false}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
        />
      </Form>
      <div className="flex justify-end my-10">
        <Button
          type="primary"
          disabled={submitted || !isOnKTA}
          onClick={() => {
            ConfirmSubmit(async () => {
              const success = await addNegosiasi(id, kkpt_id, mockData)
              if (success) {
                setSubmitted(true)
                createSuccessNotification("Negosiasi", "Berhasil mengirim rincian negosiasi")()
                fetchActionPlanNego(id, kkpt_id)
              }
              else createErrorNotification("Negosiasi", "Gagal mengirim rincian negosiasi")()
              return success
            })
          }}
        >
          Request Approval
        </Button>
      </div>
    </div>
  )
};

const mapDispatchToProps = {
  addNegosiasi: addNegosiasi
}

export default connect(null, mapDispatchToProps)(TableMeetingRincian)
