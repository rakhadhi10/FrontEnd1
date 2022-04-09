import PropTypes from "prop-types";
import { Table } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Column } = Table

export default function NotificationTable({ data }){
  return (
    <Table
      dataSource={data}
      pagination={false}
      size="small"
      tableLayout="auto"
    >
      <Column
        title="Jenis"
        dataIndex="jenis"
        key="jenis"
        align="center"
        render={(text, record) => (text)}
        filters={[]}
      />
      <Column
        title="Dari"
        dataIndex="dari"
        key="dari"
        align="center"
        render={(text, record) => (text)}
        filters={[]}
      />
      <Column
        title="Perihal"
        dataIndex="perihal"
        key="perihal"
        render={(text, record) => (text)}
        filters={[]}
      />
      <Column
        title="Read"
        dataIndex="read"
        key="read"
        align="center"
        render={(text, record) => (<MailOutlined className="cursor-pointer text-lg"/>)}
        filters={[]}
      />
    </Table>
  );
}

NotificationTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      jenis: PropTypes.any,
      dari: PropTypes.string,
      perihal: PropTypes.string,
      read: PropTypes.bool
    })
  )
}