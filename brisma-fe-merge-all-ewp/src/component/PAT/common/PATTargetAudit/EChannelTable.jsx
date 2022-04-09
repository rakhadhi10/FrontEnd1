import PropTypes from "prop-types";
import { Table, Typography } from "antd";

const { Column } = Table;

export default function EChannelTable({ data }) {
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
        render={(text, record) => <Typography.Text type="secondary">{text}</Typography.Text>}
      />
      <Column
        className="text-center"
        title={() => <div className="text-center">E-Channel Existing</div>}
        dataIndex="existing"
        key="existing"
        render={(text, record) => (
          <span className="font-semibold" style={{ color: "#3C64B1" }}>
            {text}
          </span>
        )}
      />
      <Column
        className="text-center"
        title={() => <div className="text-center">E-Channel Audit</div>}
        dataIndex="audit"
        key="audit"
        render={(text, record) => (
          <span className="font-semibold" style={{ color: "#C99A40" }}>
            {text}
          </span>
        )}
      />
      <Column
        className="text-center"
        title={() => <div className="text-center">%</div>}
        dataIndex="percent"
        key="percent"
        render={(text, record) => (
          <Typography.Text type="secondary" className="text-sm font-normal">
            {text}%
          </Typography.Text>
        )}
      />
    </Table>
  );
}

EChannelTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      existing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      audit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ),
};

EChannelTable.defaultProps = {
  data: [],
};
