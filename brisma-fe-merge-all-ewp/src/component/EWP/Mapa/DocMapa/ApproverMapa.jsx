import { Collapse, Empty, Skeleton, Space } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getApprover,
  getError,
  getLoading,
  getReasonApproval,
} from "../../../../store/ducks/EWP/Mapa/Dokumen/selectors";
import Approver from "./Approver";
import ReasonCard from "./ReasonCard";
const moment = require("moment");

const { Panel } = Collapse;

function ApproverMapa({ dataApprover, dataReasonApproval, loading, error }) {
  const [approver, setapprover] = useState(null);
  const [reason, setreason] = useState([]);

  useEffect(() => setapprover(dataApprover), [dataApprover]);
  useEffect(() => setreason(dataReasonApproval), [dataReasonApproval]);

  console.log(dataApprover, dataReasonApproval);

  return (
    <div className="w-full border border-primary-blue rounded-lg">
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="right"
        bordered
        ghost
      >
        <Panel
          header={
            <span className="font-semibold text-primary-blue">
              Approver MAPA
            </span>
          }
          key="1"
        >
          {error && <Empty />}
          {!error && (
            <Skeleton active loading={approver === null}>
              <Space direction="vertical" size="large" className="w-full">
                <Approver checkers={dataApprover} />
                <div>
                  <p className="text-primary-blue underline">Reason Approval</p>
                  <div className="bg-white p-4 my-2 rounded-lg h-48 overflow-auto space-y-2">
                    {reason.map((item) => (
                      <ReasonCard
                        key={item.id}
                        nama={
                          "(" +
                          item.auditor_kode +
                          ") " +
                          item.pn_from +
                          " - " +
                          item.name_from
                        }
                        status={item.is_approved ? "Approved" : "Rejected"}
                        waktu={moment(item.createdAt).format(
                          "d MMM YYYY HH:mm"
                        )}
                        alasan={item.note}
                      />
                    ))}
                  </div>
                </div>
              </Space>
            </Skeleton>
          )}
        </Panel>
      </Collapse>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataApprover: getApprover(state),
    dataReasonApproval: getReasonApproval(state),
    loading: getLoading(state),
    error: getError(state),
  };
};

export default connect(mapStateToProps, null)(ApproverMapa);
