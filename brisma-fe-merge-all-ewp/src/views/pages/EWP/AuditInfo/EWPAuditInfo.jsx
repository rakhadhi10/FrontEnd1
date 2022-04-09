import React from "react";
import { EWPLayout } from "../../../../layouts/EwpLayout";
import { Typography } from "antd";
import { compose } from "redux";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";
import { pat_content } from "../../../routes/allowedRoles";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import FormInfoAudit from "../../../../component/EWP/AuditInfo/FormInfoAudit";
import { useParams } from "react-router-dom";

function EwpAuditInfo() {
  const { project_id } = useParams();
  const breadcrumb = [
    { title: "Info Audit", link: "/ewp/project/audit-info/" + project_id },
  ];

  return (
    <EWPLayout selectedKey="1" breadcrumb={breadcrumb}>
      <div className="px-6">
        <CardProjectEWP />
      </div>
      <div>
        <Typography.Title className="mt-10" level={3}>
          Info Audit
        </Typography.Title>
        <div className="rounded-lg bg-white border p-8 mb-8">
          <FormInfoAudit />
        </div>
      </div>
    </EWPLayout>
  );
}

export default compose(withAuth, withRole(pat_content))(EwpAuditInfo);
