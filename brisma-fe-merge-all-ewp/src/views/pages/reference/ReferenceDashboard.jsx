import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "antd";
import withAuth from "../../routes/hoc/withAuth";
import { getUserRoleCodes } from "../../../store/ducks/auth/selectors";
// import { ADMIN_STANDAR_AUDIT, SUPER_ADMIN } from "../../routes/allowedRoles";

function ReferenceDashboard({ user_roles }) {
  return (
    <Card
      className="flex flex-col justify-start border-secondary-gray "
      style={{ overflow: "hidden", borderRadius: "10px", width: "100%", height: "100%" }}
    >
      {/* {[SUPER_ADMIN, ADMIN_STANDAR_AUDIT].some((r) => user_roles.includes(r)) &&
          <Link to="/reference/create-pat">
            <Card
              hoverable
              className="flex flex-col justify-start border-secondary-light-black hover:border-primary-blue font-mulish text-secondary-light-black hover:text-primary-blue"
            >
              <p className="text-lg font-bold uppercase">Create PAT - ADMIN STANDAR AUDIT</p>
              <p className="text-sm font-light">Perencanaan Audit Tahunan</p>
            </Card>
          </Link>
        } */}
      <Link to="/reference/create-pat">
        <Card
          hoverable
          className="flex flex-col justify-start border-secondary-light-black hover:border-primary-blue font-mulish text-secondary-light-black hover:text-primary-blue"
        >
          <p className="text-lg font-bold uppercase">Create PAT - ADMIN STANDAR AUDIT</p>
          <p className="text-sm font-light">Perencanaan Audit Tahunan</p>
        </Card>
      </Link>
    </Card>
  );
}

const mapStateToProps = state => ({ user_roles: getUserRoleCodes(state) })

export default compose(
  withAuth,
  connect(mapStateToProps)
)(ReferenceDashboard)