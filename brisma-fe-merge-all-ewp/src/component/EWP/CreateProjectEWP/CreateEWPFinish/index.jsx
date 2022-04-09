import React from "react";
import { connect } from "react-redux";
import { getAuditSource } from "../../../../store/ducks/EWP/CreateEWP/selectors";
import CreateEWPFinishNonPAT from "./NonPAT/CreateEWPFinishNonPAT";
import CreateEWPFinishPAT from "./PAT/CreateEWPFinishPAT";

function CreateEWPFinish({ auditSource, onCancel }) {
  return (
    <>
      {auditSource === "pat" ? (
        <CreateEWPFinishPAT onCancel={onCancel} />
      ) : (
        <CreateEWPFinishNonPAT />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auditSource: getAuditSource(state),
  };
};

export default connect(mapStateToProps, null)(CreateEWPFinish);
