import { Collapse, Space } from "antd";
import { dateToLogFormat } from "../../../../../utils/momentHelpers";
import CheckerStatus from "./CheckerStatus";
import ReasonCard from "./ReasonCard";
import SignerStatus from "./SignerStatus";

const { Panel } = Collapse

export default function StatusApprover({ title, checkers, signers, logs }) {
  return (
    <div className="w-full border border-primary-blue rounded-lg">
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="right"
        bordered
        ghost
      >
        <Panel
          header={<span className="font-semibold text-primary-blue">{title}</span>}
          key="1"
        >
          <Space
            direction="vertical"
            size="large"
            className="w-full"
          >
            <CheckerStatus checkers={checkers} />
            <SignerStatus signers={signers} />
            <div>
              <p className="text-primary-blue underline">Reason Approval</p>
              <div className="bg-white p-4 my-2 rounded-lg h-48 overflow-auto space-y-2">
                {logs.map((log, idx) => (
                  <ReasonCard
                    key={log.id}
                    nama={log.from ? `(${log.from.jabatan}) ${log.from.nama}` : "Undefined"}
                    status={log.is_approved ? "Approved" : "Rejected"}
                    waktu={log.createdAt ? dateToLogFormat(log.createdAt) : dateToLogFormat()}
                    alasan={log.note}
                  />
                ))}
              </div>
            </div>
          </Space>
        </Panel>
      </Collapse>
    </div>
  );
}