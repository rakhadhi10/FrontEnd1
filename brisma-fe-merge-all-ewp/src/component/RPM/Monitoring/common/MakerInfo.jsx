import moment from "moment";
import { Col, Collapse, Row, Space } from "antd";
import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";

const { Panel } = Collapse

export default function MakerInfo({ surat }) {
  const { logMaker, logChecker, logSigner } = surat

  return (
    <div className="w-full border border-primary-blue rounded-lg">
      <Collapse
        expandIconPosition="right"
        ghost
      >
        <Panel
          header={<span className="font-semibold text-primary-blue">Menu Information</span>}
          key="1"
        >
          <Row>
            <Col span={6}>
              <Space
                direction="vertical"
                className="w-full"
              >
                <div>
                  <p className="text-primary-blue">Maker</p>
                  {logMaker && logMaker[0] ?
                    (
                      <p>{`${logMaker[0].from.pn} - ${logMaker[0].from.nama}`}</p>
                    ) :
                    (
                      <p>-</p>
                    )
                  }
                </div>
                <div>
                  <p className="text-primary-blue">Date Created</p>
                  {logMaker && logMaker[0] ?
                    (
                      <p>{moment(logMaker[0].createdAt).format("DD/MM/YYYY")}</p>
                    ) :
                    (
                      <p>-</p>
                    )
                  }
                </div>
              </Space>
            </Col>
            <Col span={9}>
              <div>
                <p className="text-primary-blue">Checker</p>
                {logChecker && logChecker.map(l => (
                  <div className="mb-2">
                    <div className="flex flex-wrap items-center gap-4">
                      <p>{l.from.pn} - {l.from.nama}</p>
                      <p className="text-xs text-secondary-light-black">{l.note}</p>
                      <ApprovePill approved={l.is_approved} />
                    </div>
                    <p className="text-xs text-secondary-light-black">{moment(l.createdAt).format("DD MMM YYYY HH:mm")}</p>
                  </div>
                ))}
              </div>
            </Col>
            <Col span={9}>
              <div>
                <p className="text-primary-blue">Signer</p>
                {logSigner && logSigner.map(l => (
                  <div className="mb-2">
                    <div className="flex flex-wrap items-center gap-4">
                      <p>{l.from.pn} - {l.from.nama}</p>
                      <p className="text-xs text-secondary-light-black">{l.note}</p>
                      <ApprovePill approved={l.is_approved} />
                    </div>
                    <p className="text-xs text-secondary-light-black">{moment(l.createdAt).format("DD MMM YYYY HH:mm")}</p>
                  </div>
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