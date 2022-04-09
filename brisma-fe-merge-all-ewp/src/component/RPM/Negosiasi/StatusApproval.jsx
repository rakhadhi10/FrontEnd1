import moment from "moment";
import { Col, Collapse, Row } from "antd";
import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";

const { Panel } = Collapse

export default function StatusApproval({ status = {} }) {
  const { kta, ma, kai } = status

  return (
    <div className="w-full border border-primary-blue rounded-lg">
      <Collapse
        defaultActiveKey="1"
        expandIconPosition="right"
        ghost
      >
        <Panel
          header={<span className="font-semibold text-primary-blue">Status Approval</span>}
          key="1"
        >
          <Row>
            <Col span={6}>
              <div>
                <p className="text-primary-blue">Ketua Tim Audit</p>
                {kta && kta.map(l => (
                  <>
                    <div className="flex flex-wrap items-center gap-4">
                      <p>{l.from.pn} - {l.from.nama}</p>
                      <p className="text-xs text-secondary-light-black">{l.note}</p>
                      <ApprovePill approved={l.is_approved} />
                    </div>
                    <p className="text-xs text-secondary-light-black">{moment(l.createdAt).format("DD MMM YYYY HH:mm")}</p>
                  </>
                ))}
              </div>
            </Col>
            <Col span={6}>
              <div>
                <p className="text-primary-blue">MA</p>
                {ma && ma.map(l => (
                  <>
                    <div className="flex flex-wrap items-center gap-4">
                      <p>{l.from.pn} - {l.from.nama}</p>
                      <p className="text-xs text-secondary-light-black">{l.note}</p>
                      <ApprovePill approved={l.is_approved} />
                    </div>
                    <p className="text-xs text-secondary-light-black">{moment(l.createdAt).format("DD MMM YYYY HH:mm")}</p>
                  </>
                ))}
              </div>
            </Col>
            <Col span={6}>
              <div>
                <p className="text-primary-blue">Kepala Audit Intern</p>
                {kai && kai.map(l => (
                  <>
                    <div className="flex flex-wrap items-center gap-4">
                      <p>{l.from.pn} - {l.from.nama}</p>
                      <p className="text-xs text-secondary-light-black">{l.note}</p>
                      <ApprovePill approved={l.is_approved} />
                    </div>
                    <p className="text-xs text-secondary-light-black">{moment(l.createdAt).format("DD MMM YYYY HH:mm")}</p>
                  </>
                ))}
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