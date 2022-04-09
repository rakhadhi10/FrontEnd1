import { Button, Form, message, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  getUserName,
  getUserPN,
} from "../../../../../store/ducks/auth/selectors";
import {
  getAuditSource,
  getSelectedJadwalAudit,
  getTahunPAT,
} from "../../../../../store/ducks/EWP/CreateEWP/selectors";
import { FormAuditInfo } from "../FormAuditInfo";
import { ApproverForm } from "./ApproverForm";
import { createEwp } from "../../../../../store/ducks/EWP/CreateEWP/actions";

function AuditInfoPAT({
  selectedJadwalAudit,
  tahun,
  auditSource,
  userPN,
  userName,
  createEWP,
  onPrev,
  onNext,
}) {
  const [bodyData, setbodyData] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    const mapSelectedData = (data) => {
      const newData = {
        project_name: data.name_kegiatan_audit,
        info_periode_pelaksanaan_start: data.pelaksanaan_start,
        info_periode_pelaksanaan_end: data.pelaksanaan_end,
        pat_jadwal_audit_id: data.id,
        audit_type_kode: data.type_audit_kode,
        audit_type_name: data.type_audit_name,
        audit_year: tahun,
        pn_ketua_tim: userPN,
        nama_ketua_tim: userName,
        pn_approver: null,
        nama_approver: null,
        pn_kta_pat: data.tim_audit.kta.pn,
        nama_kta_pat: data.tim_audit.kta.nama,
      };

      const newFormData = {
        ...newData,
        ketua_tim_audit: newData.pn_ketua_tim + " - " + newData.nama_ketua_tim,
        info_periode_pelaksanaan_start: moment(
          newData.info_periode_pelaksanaan_start
        ),
        info_periode_pelaksanaan_end: moment(
          newData.info_periode_pelaksanaan_end
        ),
      };

      form.setFieldsValue(newFormData);
      setbodyData(newData);
    };

    mapSelectedData(selectedJadwalAudit);
  }, [form, selectedJadwalAudit, tahun, userName, userPN]);

  const hanldeOnCreate = async () => {
    const {
      nama_approval,
      info_periode_pelaksanaan_start,
      info_periode_pelaksanaan_end,
    } = form.getFieldsValue();

    const newBody = {
      ...bodyData,
      pn_approver: nama_approval.pn,
      nama_approver: nama_approval.nama,
      info_periode_pelaksanaan_start: moment(
        info_periode_pelaksanaan_start
      ).toISOString(),
      info_periode_pelaksanaan_end: moment(
        info_periode_pelaksanaan_end
      ).toISOString(),
    };

    console.log(newBody);
    const failed = await createEWP(newBody);

    if (!failed) {
      onNext();
    } else {
      message.error(failed);
    }
  };

  console.log(selectedJadwalAudit.tim_audit.kta.pn);
  console.log(userPN);

  return (
    <div className="space-y-4">
      <Typography.Title level={2} style={{ color: "#3BAAA4", margin: 0 }}>
        PAT
      </Typography.Title>
      <FormAuditInfo form={form} auditSource={auditSource} />
      {userPN !== selectedJadwalAudit.tim_audit.kta.pn && (
        <ApproverForm form={form} />
      )}
      <div className="flex justify-end space-x-2">
        <Button onClick={onPrev}>Previous</Button>
        <Button type="primary" onClick={hanldeOnCreate}>
          Create EWP
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedJadwalAudit: getSelectedJadwalAudit(state),
    tahun: getTahunPAT(state),
    auditSource: getAuditSource(state),
    userPN: getUserPN(state),
    userName: getUserName(state),
  };
};

const mapDispatchToProps = {
  createEWP: createEwp,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuditInfoPAT);
