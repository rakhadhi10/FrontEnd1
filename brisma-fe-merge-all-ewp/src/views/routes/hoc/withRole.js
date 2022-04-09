import { connect } from "react-redux";
import { Navigate } from "react-router";
import { getUserRoleCodes } from "../../../store/ducks/auth/selectors";

export const withRole = (allowedRoles) => (WrappedComponent) => {
	const RoleComponent = ({ userRoles, ...rest }) => {
    const allowed = allowedRoles.some((r) => userRoles.includes(r));
		return allowed ? <WrappedComponent {...rest} /> : <Navigate to="/login" />;
	};
	const mapStateToProps = (state) => ({
		userRoles: getUserRoleCodes(state),
	});
	return connect(mapStateToProps)(RoleComponent);
}

export default withRole;
