import moment from "moment";
import { Col, Collapse, Row, Space } from "antd";
import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";

const { Panel } = Collapse

export default function StatusApprovalBeritaAcara({ log = [] }) {
  return (
    <div className="w-full border border-primary-blue rounded-lg">
      <Collapse
        defaultActiveKey="1"
        expandIconPosition="right"
        ghost
      >
        <Panel
          header={<span className="font-semibold text-primary-blue">Approver Status</span>}
          key="1"
        >
          <Row>
            <Col span={24}>
              <div>
                <Space direction="vertical">
                  {log && log.map(l => (
                    <div>
                      <div className="flex flex-wrap items-center gap-4">
                        <p>{l.from.pn} - {l.from.nama}</p>
                        <p className="text-xs text-secondary-light-black">{l.note}</p>
                        <ApprovePill approved={l.is_approved} />
                      </div>
                      <p className="text-xs text-secondary-light-black">{moment(l.createdAt).format("DD MMM YYYY HH:mm")}</p>
                    </div>
                  ))}
                </Space>
              </div>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </div>
  );
}

const ApprovePill = (props) => {
  const { approved } = props

  return (
    <div className="flex items-center justify-start gap-2">
      <span
        className="text-xs rounded-md flex items-center gap-1"
        style={{
          backgroundColor: approved ? "#3C8231" : "#D6330F",
          color: "white",
          padding: "0.1rem 0.2rem"
        }}
      >
        {approved ? <CheckCircleOutlined /> : <StopOutlined />}
        <p>{approved ? "Approved" : "Rejected"}</p>
      </span>
    </div>
  )
}