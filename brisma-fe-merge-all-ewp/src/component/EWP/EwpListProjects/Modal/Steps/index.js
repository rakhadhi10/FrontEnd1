import { Steps, Button, Modal, Form } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import InputProjectInfoNonPat from "./NonPat/InputProjectInfoNonPat";
import SelectProjectNonPat from "./NonPat/SelectProjectNonPat";
import SelectAuditSource from "./SelectAuditSource";
import Success from "../Success";
import SelectProjectPat from "./Pat/SelectProject/SelectProjectPat";
import InputProjectInfoPat from "./Pat/InputAuditInfo/InputAuditInfoPat";
import NeedApproval from "../NeedApproval";

import { createEwp } from "../../../../../store/ducks/EWP/CreateEWP/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  getError,
  getCreateError,
  getCreateLoading,
} from "../../../../../store/ducks/EWP/CreateEWP/selectors";
import withAuth from "../../../../../views/routes/hoc/withAuth";
import withRole from "../../../../../views/routes/hoc/withRole";
import { pat_content } from "../../../../../views/routes/allowedRoles";

const { confirm } = Modal;
const { Step } = Steps;

function showConfirm(fnOk = () => {}, fnCancel = () => {}) {
  confirm({
    title: "Apakah anda yakin akan melaksanakan project ini?",
    icon: <ExclamationCircleOutlined />,
    onOk() {
      fnOk();
    },
    onCancel() {
      fnCancel();
    },
  });
}

const steps = [
  {
    title: "Select Audit Source",
    content: SelectAuditSource,
  },
  {
    title: "Select Project",
    content: {
      pat: SelectProjectPat,
      nonpat: SelectProjectNonPat,
    },
  },
  {
    title: "Input Audit Info",
    content: {
      pat: InputProjectInfoPat,
      nonpat: InputProjectInfoNonPat,
    },
  },
];

const CreateProjectEwpSteps = ({ closeModal, createEwp }) => {
  const [form] = Form.useForm();

  const [current, setCurrent] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [auditSource, setAuditSource] = useState("pat");
  const [success, setSuccess] = useState(false);
  const [needApproval, setNeedApproval] = useState(false);

  const [dataSubmit, setDataSubmit] = useState([]);

  const handleOnClickApproval = (e) => {
    setNeedApproval(true);
    console.log(e);
  };

  const handleFinish = (values) => {
    if (auditSource === "pat") {
      const dataPost = {
        project_name: values.nama_project,
        info_periode_pelaksanaan_start: values.start_date.format("YYYY-MM-DD"),
        info_periode_pelaksanaan_end: values.end_date.format("YYYY-MM-DD"),
        pat_jadwal_audit_id: dataSubmit[0].pat_jadwal_audit_id,
        audit_type_kode: dataSubmit[0].kode_audit,
        audit_type_name: dataSubmit[0].tipe,
        audit_year: values.tahun_audit,
        pn_ketua_tim:
          values.ketua_tim_audit === undefined ? dataSubmit[0].kta_pn : values.ketua_tim_audit.pn,
        nama_ketua_tim:
          values.ketua_tim_audit === undefined ? dataSubmit[0].kta : values.ketua_tim_audit.nama,
        need_approved: values.nama_approval === undefined ? false : true,
        pn_approver: values.nama_approval === undefined ? "" : values.nama_approval.pn,
        nama_approver: values.nama_approval === undefined ? "" : values.nama_approval.nama,
        pn_kta_pat: dataSubmit[0].kta_pn,
        nama_kta_pat: dataSubmit[0].kta,
      };
      confirm({
        title: "Apakah anda yakin akan melaksanakan project PAT ini?",
        icon: <ExclamationCircleOutlined />,
        async onOk() {
          const postEwp = await createEwp(dataPost);
          console.log(postEwp);
          if (postEwp) {
            handlePostPatSuccess();
          } else {
            handleOnClickContinue();
          }
        },
        onCancel() {},
      });
    } else {
      const dataPost = {
        project_name: values.nama_project,
        info_periode_pelaksanaan_start: values.start_date.format("YYYY-MM-DD"),
        info_periode_pelaksanaan_end: values.end_date.format("YYYY-MM-DD"),
        pat_jadwal_audit_id: 1,
        audit_type_kode: "REG",
        audit_type_name: "reguler",
        audit_year: values.tahun_audit,
        pn_ketua_tim: values.ketua_tim_audit.pn,
        nama_ketua_tim: values.ketua_tim_audit.nama,
        need_approved: false,
        pn_approver: "",
        nama_approver: "",
        pn_kta_pat: "",
        nama_kta_pat: "",
      };
      confirm({
        title: "Apakah anda yakin akan melaksanakan project ini?",
        icon: <ExclamationCircleOutlined />,
        async onOk() {
          const postEwp = await createEwp(dataPost);
          if (postEwp) {
            handleOnClickContinue();
          } else {
            handleOnClickContinue();
          }
        },
        onCancel() {},
      });
    }
  };

  const berhasilPostNonPat = () => {
    setSuccess(true);
  };
  const handleOnClickContinue = () => {
    setCurrent(0);
    setSuccess(false);
    setNeedApproval(false);
  };
  const handlePostPatSuccess = () => {
    setCurrent(0);
    setSuccess(true);
    setNeedApproval(false);
  };

  const shouldGoNext = true;

  const next = () => {
    if (dataSubmit.length === 0 && current === 1 && auditSource === "pat") {
    } else {
      setCurrent(current + 1);
      setDisabled(!shouldGoNext);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
    setDisabled(!shouldGoNext);
  };

  const getCurrentStep = (props) => {
    if (current === 0) {
      const Component = steps[current].content;
      return <Component onChange={setAuditSource} current={auditSource} />;
    } else if (current === 1) {
      const Component = steps[current].content[auditSource];
      return <Component onChange={(e) => setDataSubmit(e)} />;
    } else {
      const Component = steps[current].content[auditSource];
      let props = { success };
      if (auditSource === "pat") {
        props = {
          ...props,
          onClickApproval: handleOnClickApproval,
        };
      }
      return (
        <Component
          {...props}
          onChange={setDataSubmit}
          form={form}
          onFinish={handleFinish}
          current={dataSubmit}
        />
      );
    }
  };

  return (
    <>
      <Steps current={current} labelPlacement="vertical">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      {!success && !needApproval && <div className="my-4 p-4 bg-white">{getCurrentStep()}</div>}
      {success && !needApproval && (
        <>
          {current === 2 && auditSource === "nonpat" && (
            <div className="my-4 p-4 bg-white">{getCurrentStep()}</div>
          )}
          <Success onClickContinue={handleOnClickContinue} />
        </>
      )}
      {needApproval && !success && <NeedApproval onClickContinue={handleOnClickContinue} />}
      <div className="mt-5 flex flex-wrap items-center justify-end">
        {!success && !needApproval && (
          <div>
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" disabled={disabled} onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                htmlType="button"
                type="primary"
                disabled={disabled}
                onClick={() => form.submit()}
              >
                Save
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    error: getError(state),
    createLoading: getCreateLoading(state),
    createError: getCreateError(state),
  };
};

const mapDispachToProps = {
  createEwp: createEwp,
};

export default compose(
  withAuth,
  withRole(pat_content),
  connect(mapStateToProps, mapDispachToProps)
)(CreateProjectEwpSteps);
