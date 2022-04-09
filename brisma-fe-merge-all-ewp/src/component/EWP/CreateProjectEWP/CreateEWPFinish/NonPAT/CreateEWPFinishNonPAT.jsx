import React from "react";
import { connect } from "react-redux";
import {
  getCreateData,
  getProjectData,
} from "../../../../../store/ducks/EWP/CreateEWP/selectors";
import { ProjectInfo } from "./ProjectInfo";
import { SuccessComponent } from "./SuccessComponent";

function CreateEWPFinishNonPAT({ projectData, createData }) {
  return (
    <div className="space-y-4">
      <ProjectInfo data={projectData} />
      <SuccessComponent id={createData.id.id} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    projectData: getProjectData(state),
    createData: getCreateData(state),
  };
};

export default connect(mapStateToProps, null)(CreateEWPFinishNonPAT);
