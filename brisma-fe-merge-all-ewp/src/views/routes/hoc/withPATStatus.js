import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingAuth from "../../../component/LoadingAuth";
import { fetchStatus } from "../../../store/ducks/PATProject/actions";
import {
  getAllStatus,
  getLoading,
  getError,
} from "../../../store/ducks/PATProject/selectors";

export default function withPATStatus(WrappedComponent) {
  const PATStatus = ({ fetchStatus, error, loading, status, ...rest }) => {
    const { pat_id } = useParams();
    useEffect(() => fetchStatus(pat_id), [fetchStatus, pat_id]);
    if (!loading && status)
      return <WrappedComponent {...rest} status={status} />;
    if (error && !loading) return <div>{error}</div>;
    return <LoadingAuth text="Checking PAT Status" />;
  };
  const mapStateToProps = (state) => ({
    status: getAllStatus(state),
    loading: getLoading(state),
    error: getError(state),
  });
  const mapDispatchToProps = {
    fetchStatus: fetchStatus,
  };
  return connect(mapStateToProps, mapDispatchToProps)(PATStatus);
}
