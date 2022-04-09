import { Button, Input, Popover, Table, Upload } from "antd";
import { DeleteOutlined, FormOutlined, PaperClipOutlined } from "@ant-design/icons";
import confirmDelete from "../../../../../utils/confirmDelete";
import { EditableRow, EditableCell } from "./EditableTable";

export default function TableUnitKerjaSpecialTematik({
  rows,
  updateRows,
  openModal,
  uploadFile,
  removeFile
}) {
  const columns = [
    {
      title: "Uker Information",
      children: [
        {
          title: "Kode-Nama Branch",
          dataIndex: "branch",
          align: "center",
          width: "20%",
          render: (branch) => {
            if (typeof branch === "object") {
              return `${branch.branch} - ${branch.brdesc}`
            }
            return branch
          }
        },
        {
          title: "Kode-Nama Orgeh",
          dataIndex: "orgeh",
          align: "center",
          width: "20%",
          render: (orgeh) => `${orgeh.child} - ${orgeh.my_name}`
        },
        {
          title: "Tipe Uker",
          dataIndex: "tipeUker",
          align: "center",
          filters: [
            { text: "Divisi", value: "Divisi" },
            { text: "PA", value: "PA" },
            { text: "KC", value: "KC" },
            { text: "KK", value: "KK" },
            { text: "Kanwil", value: "Kanwil" },
            { text: "Desk", value: "Desk" },
            { text: "KCP", value: "KCP" },
            { text: "Unit", value: "Unit" },
          ],
          onFilter: (value, record) => record.tipeUker.indexOf(value) === 0,
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
              () => handleDelete(record.branch)
            )}
          />
        )
      }
    },
  ];

  const handleDelete = (branch) => {
    updateRows(rows.filter((item) => item.branch !== branch))
  };

  const handleEditDeskripsi = (record, value) => {
    const newData = [...rows];
    const index = newData.findIndex((item) => record.branch === item.branch);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...record, deskripsi: value });
    updateRows(newData)
  }

  const test_columns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <div className="mt-8">
      <div className="flex justify-end">
        <div
          className="border border-black border-dashed rounded-lg py-1 my-2 px-8 cursor-pointer"
          onClick={openModal}
        >
          Edit Unit Kerja
        </div>
      </div>
      <Table
        scroll={{ y: 200 }}
        size="small"
        pagination={false}
        dataSource={rows}
        columns={test_columns}
        bordered
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          }
        }}
      />
    </div>
  );
};
