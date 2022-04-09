import { Spin } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCommentApprovalAnalisa } from "../../../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/actions";
import {
  getDataCommentApproval,
  getErrorCommentApproval,
  getLoadingCommentApproval,
} from "../../../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/selectors";

export const CommentReasonRejectAnalisa = ({
  loadingComment,
  dataComment,
  errorComment,
  fetchComment,
  params,
}) => {
  const { project_id } = useParams();
  useEffect(
    () => fetchComment(project_id, params),
    [fetchComment, project_id, params]
  );

  return (
    <>
      {loadingComment && (
        <div className="flex justify-center">
          <Spin />
        </div>
      )}
      {!loadingComment && errorComment && (
        <p className="text-red-400">{errorComment}</p>
      )}
      {!loadingComment && !errorComment && (
        <span className="overflow-auto">{dataComment}</span>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loadingComment: getLoadingCommentApproval(state),
    errorComment: getErrorCommentApproval(state),
    dataComment: getDataCommentApproval(state),
  };
};

const mapDispatchToProps = {
  fetchComment: fetchCommentApprovalAnalisa,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentReasonRejectAnalisa);
