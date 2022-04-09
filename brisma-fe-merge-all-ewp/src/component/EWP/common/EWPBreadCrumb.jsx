import { Breadcrumb, Skeleton } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCurrentEWPId,
  getCurrentProjectId,
  getCurrentProjectLoading,
} from "../../../store/ducks/EWP/CreateEWP/selectors";

function EWPBreadCrumb({ loading, project_id, id, breadcrumb = [] }) {
  const listBreadcrumb = [
    { title: "BRISMA", link: "/dashboard" },
    { title: "EWP", link: "/ewp/project" },
    { title: project_id, link: "/ewp/audit-info/" + id },
    ...breadcrumb,
  ];

  return (
    <Skeleton active loading={loading} paragraph={false}>
      <Breadcrumb separator=">>">
        {listBreadcrumb.map((item) => (
          <Breadcrumb.Item>
            <Link to={item.link}>{item.title}</Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </Skeleton>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: getCurrentProjectLoading(state),
    project_id: getCurrentProjectId(state),
    id: getCurrentEWPId(state),
  };
};

export default connect(mapStateToProps, null)(EWPBreadCrumb);
