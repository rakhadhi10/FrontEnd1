import { compose } from "redux";
import { useState } from "react";
import { connect } from "react-redux";
import { CardInfoKkpa, KkpaLayout } from "../../../../component/EWP/EwpKkpa";
import Ckeditor from "../../../../component/CKEditor";
import { FaQuestionCircle } from "react-icons/fa";
import { Button } from "antd";
import { storeDataKriteria } from "../../../../store/ducks/EWP/KKPA/kriteria/action";
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
    title: "KRITERIA",
    link: "/",
  },
];

export function EwpKkpaKriteria({ state_kkpa_info, storeDataKriteria, state_kriteria }) {
  const { project_id, kkpa_id } = useParams()
  const { error, message, loading } = state_kriteria;
  const { kkpa_info } = state_kkpa_info;

  const [value, setValue] = useState("");

  const changeValueKriteria = (event, editor) => {
    setValue(editor.getData());
  };

  const onSave = () => {
    const kkpa_id = JSON.parse(localStorage.getItem("kkpa_id"));
    storeDataKriteria({ kkpa_id: kkpa_id.id_kkpa, kriteria: value });
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
          <p className="text-secondary-light-black text-2xl font-mulish font-bold">Kriteria</p>
          <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
        </div>
        <Ckeditor
          handleEditorChange={changeValueKriteria}
          contentData={state_kkpa_info.kkpa_info && kkpa_info.kriteria}
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
  state_kriteria: state.kriteria,
});

const mapDispatchToProps = {
  storeDataKriteria,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withAuth, withRole(pat_content), withConnect)(EwpKkpaKriteria);
