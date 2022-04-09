import { Button, Input, Popover, Table, Upload } from "antd";
import { DeleteOutlined, FormOutlined, PaperClipOutlined } from "@ant-design/icons";
import confirmDelete from "../../../../../../../../utils/confirmDelete";
import { EditableCell, EditableRow } from "../../../../../../../common/PATJadwalAudit/Modal/ObjekAudit/EditableTable";

const TableUnitKerjaReguler = ({
  rows,
  updateRowBranch,
  openRegulerModal,
  uploadFile,
  removeFile
}) => {
  const columns = [
    {
      title: "Uker Information",
      children: [
        {
          title: "Kode-Nama Branch",
          dataIndex: "branch",
          align: "center",
          width: "20%",
          render: (val) => typeof val === "object" ? `${val.branch} - ${val.brdesc}` : val
        },
        {
          title: "Kode-Nama Orgeh",
          dataIndex: "orgeh",
          align: "center",
          editable: true,
          width: "20%",
          render: (val) => typeof val === "object" ? `${val.child} - ${val.my_name}` : val
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
    const newRows = rows.filter((item) => item.branch !== branch)
    updateRowBranch(newRows)
  };

  const handleSave = (row) => {
    const newRows = [...rows];
    const index = newRows.findIndex((item) => row.branch === item.branch);
    const item = newRows[index];
    newRows.splice(index, 1, { ...item, ...row });
    updateRowBranch(newRows)
  };

  const handleEditDeskripsi = (record, value) => {
    const newRows = [...rows];
    const index = newRows.findIndex((item) => record.branch === item.branch);
    const item = newRows[index];
    newRows.splice(index, 1, { ...item, ...record, deskripsi: value });
    updateRowBranch(newRows)
  }

  const mapColumns = col => {
    if (!col.children && !col.editable) {
      return col;
    }
    const newCol = {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    };
    if (col.children) {
      newCol.children = col.children.map(mapColumns);
    }
    return newCol;
  };

  const test_columns = columns.map(mapColumns);

  return (
    <div>
      <div className="flex justify-end">
        <div
          className="border border-black border-dashed rounded-lg py-1 my-2 px-8 cursor-pointer"
          onClick={openRegulerModal}
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

export default TableUnitKerjaReguler;
