import PropTypes from "prop-types";
import { Table, Typography } from "antd";

const { Column } = Table;

export default function TableCardJadwalAudit({ data }) {
  return (
    <Table
      dataSource={data}
      pagination={false}
      size="small"
      tableLayout="auto"
      rowClassName={(record, index) => {
        if (index === data.length - 1) return "text-lg font-bold";
      }}
    >
      <Column
        title=""
        dataIndex="name"
        key="name"
        render={(text, record) => (
          <Typography.Text type="secondary" className="text-xs font-light font-mulish capitalize">
            {text}
          </Typography.Text>
        )}
      />
      <Column
        className="text-center"
        title={() => <div className="text-center text-xs font-light font-mulish">Existing</div>}
        dataIndex="existing"
        key="existing"
        render={(text, record) => (
          <span className="text-xs font-light font-mulish text-primary-blue">
            {text}
          </span>
        )}
      />
      <Column
        className="text-center"
        title={() => <div className="text-center text-xs font-light font-mulish">Target</div>}
        dataIndex="target"
        key="target"
        render={(text, record) => (
          <span className="text-xs font-light font-mulish text-primary-green">
            {text}
          </span>
        )}
      />
      <Column
        className="text-center"
        title={() => <div className="text-center text-xs font-light">Percentage</div>}
        dataIndex="percent"
        key="percent"
        render={(text, record) => (
          <Typography.Text type="secondary" className="font-mulish text-xs font-light">
            {text}%
          </Typography.Text>
        )}
      />
    </Table>
  );
}

TableCardJadwalAudit.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      existing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      target: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ),
};

TableCardJadwalAudit.defaultProps = {
  data: [],
};
