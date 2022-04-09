import React from "react";
import { connect } from "react-redux";
import { getCreateData } from "../../../../../store/ducks/EWP/CreateEWP/selectors";
import { Approved } from "./Approved";
import { NeedApproval } from "./NeedApproval";

function CreateEWPFinishPAT({ createData, onCancel }) {
  return (
    <>
      {createData.need_approved ? (
        <NeedApproval onCancel={onCancel} />
      ) : (
        <Approved id={createData.id.id} />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    createData: getCreateData(state),
  };
};

export default connect(mapStateToProps, null)(CreateEWPFinishPAT);
