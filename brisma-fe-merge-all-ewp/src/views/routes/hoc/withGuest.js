import { connect } from "react-redux";
import { Navigate } from "react-router";
import LoadingAuth from "../../../component/LoadingAuth";
import { getRefreshLoading, getToken, getUser } from "../../../store/ducks/auth/selectors";

export default function withGuest(WrappedComponent) {
	const Auth = ({ isAuthenthicated, loading, ...rest }) => {
    if (loading) return (
      <LoadingAuth />
    )
		return !isAuthenthicated ? (
			<WrappedComponent {...rest} />
		) : (
			<Navigate to="/dashboard" />
		);
	};
	const mapStateToProps = (state) => ({
		isAuthenthicated: getUser(state) && getToken(state),
		loading: getRefreshLoading(state),
	});
	return connect(mapStateToProps)(Auth);
}
