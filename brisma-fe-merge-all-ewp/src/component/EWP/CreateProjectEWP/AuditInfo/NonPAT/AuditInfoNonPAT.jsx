import { Button, Form, message, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getUserName,
  getUserPN,
} from "../../../../../store/ducks/auth/selectors";
import { createEwp } from "../../../../../store/ducks/EWP/CreateEWP/actions";
import {
  getAuditSource,
  getNonPATProjectType,
} from "../../../../../store/ducks/EWP/CreateEWP/selectors";
import { FormAuditInfo } from "../FormAuditInfo";

function AuditInfoNonPAT({
  auditSource,
  userName,
  userPN,
  createEWP,
  projectType,
  onPrev,
  onNext,
}) {
  const [form] = Form.useForm();
  const [bodyData, setbodyData] = useState();

  useEffect(() => {
    const newData = {
      project_name: "",
      info_periode_pelaksanaan_start: null,
      info_periode_pelaksanaan_end: null,
      audit_type_kode: projectType,
      audit_type_name: projectType === "SA" ? "Spesial Audit" : "Tematik",
      pn_ketua_tim: userPN,
      nama_ketua_tim: userName,
    };

    const newFormData = {
      ...newData,
      ketua_tim_audit: newData.pn_ketua_tim + " - " + newData.nama_ketua_tim,
    };

    form.setFieldsValue(newFormData);
    setbodyData(newData);
  }, [form, projectType, userName, userPN]);

  const hanldeOnCreate = async () => {
    const [
      project_name,
      info_periode_pelaksanaan_start,
      info_periode_pelaksanaan_end,
    ] = form.getFieldsValue();

    const newBody = {
      ...bodyData,
      project_name: project_name,
      info_periode_pelaksanaan_start: info_periode_pelaksanaan_start,
      info_periode_pelaksanaan_end: info_periode_pelaksanaan_end,
    };

    const failed = await createEWP(newBody);
    if (!failed) {
      onNext();
    } else {
      message.error(failed);
    }
  };

  return (
    <div className="space-y-4">
      <Typography.Title level={2} style={{ color: "#3BAAA4", margin: 0 }}>
        Non PAT
      </Typography.Title>
      <FormAuditInfo form={form} auditSource={auditSource} />

      <div className="flex justify-end space-x-2">
        <Button onClick={onPrev}>Previous</Button>
        <Button type="primary" onClick={() => hanldeOnCreate}>
          Create EWP
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auditSource: getAuditSource(state),
    userPN: getUserPN(state),
    userName: getUserName(state),
    projectType: getNonPATProjectType(state),
  };
};

const mapDispatchToProps = {
  createEWP: createEwp,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuditInfoNonPAT);
