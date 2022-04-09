import React from "react";
import { connect } from "react-redux";
import { getAuditSource } from "../../../../store/ducks/EWP/CreateEWP/selectors";
import AuditInfoPAT from "./PAT/AuditInfoPAT";

function AuditInfo({ auditSource, onPrev, onNext }) {
  return (
    <>
      {auditSource === "pat" ? (
        <AuditInfoPAT onNext={onNext} onPrev={onPrev} />
      ) : (
        ""
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auditSource: getAuditSource(state),
  };
};

export default connect(mapStateToProps, null)(AuditInfo);
