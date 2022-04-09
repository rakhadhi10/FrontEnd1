import React from "react";
import { Card } from "antd";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import withAuth from "../../routes/hoc/withAuth";
import { getUserRoleCodes } from "../../../store/ducks/auth/selectors";
// import { AUDITOR, ADMIN_UKA, SUPER_ADMIN } from "../../routes/allowedRoles";

function PATDashboard({ user_roles }) {
  return (
    <Card
      className="flex flex-col justify-start border-secondary-gray "
      style={{ overflow: "hidden", borderRadius: "10px", width: "100%", height: "100%" }}
    >
      {/* {[SUPER_ADMIN, AUDITOR, ADMIN_UKA].some((r) => user_roles.includes(r)) &&
          <Link to="/pat/projects">
            <Card
              hoverable
              className="flex flex-col justify-start border-secondary-light-black hover:border-primary-blue font-mulish text-secondary-light-black hover:text-primary-blue"
            >
              <p className="text-lg font-bold uppercase">PAT - AUDITOR</p>
              <p className="text-sm font-light">Perencanaan Audit Tahunan</p>
            </Card>
          </Link>
        } */}
      <Link to="/pat/projects">
        <Card
          hoverable
          className="flex flex-col justify-start border-secondary-light-black hover:border-primary-blue font-mulish text-secondary-light-black hover:text-primary-blue"
        >
          <p className="text-lg font-bold uppercase">PAT - AUDITOR</p>
          <p className="text-sm font-light">Perencanaan Audit Tahunan</p>
        </Card>
      </Link>
    </Card>
  );
}

const mapStateToProps = state => ({
  user_roles: getUserRoleCodes(state)
})

export default compose(
  withAuth,
  connect(mapStateToProps)
)(PATDashboard)