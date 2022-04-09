import React from "react";
import { connect } from "react-redux";
import { getAuditSource } from "../../../../store/ducks/EWP/CreateEWP/selectors";
import NonPAT from "./NonPAT";
import PAT from "./PAT";

function SelectProject({ auditSource, onNext, onPrev }) {
  return (
    <>
      {auditSource === "pat" ? (
        <PAT onNext={onNext} onPrev={onPrev} />
      ) : (
        <NonPAT onNext={onNext} onPrev={onPrev} />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auditSource: getAuditSource(state),
  };
};

export default connect(mapStateToProps, null)(SelectProject);
