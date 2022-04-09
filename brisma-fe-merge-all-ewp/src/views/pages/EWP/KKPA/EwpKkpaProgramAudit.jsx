import { CardInfoKkpa, KkpaLayout } from "../../../../component/EWP/EwpKkpa";
import Ckeditor from "../../../../component/CKEditor";
import { Button } from "antd";
import { FaQuestionCircle } from "react-icons/fa";
import { compose } from "redux";
import { connect } from "react-redux";
import { storeDataProgramAudit } from "../../../../store/ducks/EWP/KKPA/programaudit/action";
import { useState } from "react";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";
import { pat_content } from "../../../routes/allowedRoles";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { useParams } from "react-router-dom";
const breadcrumb = [
  {
    title: "BRISMA",
    link: "/dashboard",
  },
  {
    title: "EWP",
    link: "/",
  },
  {
    title: "20210011",
    link: "/",
  },
  {
    title: "KKPA",
    link: "/",
  },
  {
    title: "PROGRAM AUDIT",
    link: "/",
  },
];

export function EwpKkpaProgramAudit({
  state_kkpa_info,
  state_program_audit,
  storeDataProgramAudit,
}) {
  const { project_id, kkpa_id } = useParams()
  const { error, message, loading } = state_program_audit;
  const { kkpa_info } = state_kkpa_info;
  const [value, setValue] = useState("");

  const changeValueAuddit = (event, editor) => {
    setValue(editor.getData());
  };

  const onSave = () => {

    storeDataProgramAudit({ kkpa_id, program_audit: value });
  };

  return (
    <KkpaLayout breadcrumb={breadcrumb} kkpa_id={kkpa_id}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <CardProjectEWP />
        </div>
        <div>
          <CardInfoKkpa />
        </div>
      </div>
      <div className="py-4">
        <div className="flex items-center gap-4 mb-4 mt-8">
          <p className="text-secondary-light-black text-2xl font-mulish font-bold">Program Audit</p>
          <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
        </div>
        <Ckeditor
          handleEditorChange={changeValueAuddit}
          contentData={state_kkpa_info.kkpa_info && kkpa_info.program_audit}
        />
        {error ? message : message}
        <div className="py-4 flex justify-end">
          <Button onClick={onSave} type="primary">
            Save
          </Button>
        </div>
      </div>
    </KkpaLayout>
  );
}

const mapStateToProps = (state) => ({
  state_kkpa_info: state.kkpa_info,
  state_program_audit: state.program_audit,
});

const mapDispatchToProps = {
  storeDataProgramAudit,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withAuth, withRole(pat_content), withConnect)(EwpKkpaProgramAudit);
