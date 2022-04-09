import { Button, notification } from "antd";
import React, { useState, memo } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import Ckeditor from "../../../../component/CKEditor";
import { CardInfoKKPT, KkptLayout } from "../../../../component/EWP/EWPKKPT";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { compose } from "redux";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { saveKriteriaKkptTry } from "../../../../store/ducks/EWP/Kkpt/kkptkriteriasave/action"


const breadcrumb = [
  {
    title: "BRISMA",
    link: "/",
  },
  {
    title: "EWP",
    link: "/dashboard",
  },
  {
    title: "20210011",
    link: "/ewp/project",
  },
  {
    title: "KKPT",
    link: "/ewp/project/kkpt",
  },
  {
    title: "Kriteria",
    link: "/ewp/project/kkpt/kriteria",
  },
];

function KKPTKriteria({ stateKkptDetail, stateKkptKriteriaSave, saveKriteriaKkptTry }) {
  const { message, loading } = stateKkptKriteriaSave;
  const { project_id, kkpt_id } = useParams();

  const [kriteriaData, setKriteria] = useState("");

  const changeValueKriteria = (event, editor) => {
    setKriteria(editor.getData());
  };

  const onSaveKriteria = async () => {
    let dataSaveKriteria = {
      id: Number(kkpt_id),
      kriteria: kriteriaData
    }



    let status = await saveKriteriaKkptTry(dataSaveKriteria)
    if (status === "success") {
      notification['success']({
        message: 'SuccessFully',
        description:
          'Berhasil melakukan Insert Kriteria',
      });
    }
  }

  return (
    <KkptLayout title={'KRITERIA KKPT'} breadcrumb={breadcrumb} kkpt_id={kkpt_id} >
      <div className="flex gap-1 pb-5">
        <Button size="small">&lt;</Button>
        <Button size="small">&gt;</Button>
      </div>
      <div className="grid grid-cols-2 gap-6 px-6">
        <CardProjectEWP />
        <CardInfoKKPT />
      </div>
      <div className="flex items-center gap-4 mb-4 mt-8">
        <p className="text-secondary-light-black text-3xl font-mulish font-bold">Kriteria</p>
        <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
      </div>
      <div className="bg-white border border-primary-blue rounded-xl px-5 py-5 mb-6">
        <Ckeditor handleEditorChange={changeValueKriteria} contentData={stateKkptDetail.data !== null ? stateKkptDetail.data.kkpt.kriteria : null} />
        <div className="py-4 flex justify-end">
          <Button loading={loading} onClick={onSaveKriteria} type="primary">Save</Button>
        </div>
      </div>
    </KkptLayout>
  );
}
const mapStateToProps = (state) => ({
  stateKkptKriteriaSave: state.kkpt_kriteria_save,
  stateKkptDetail: state.kkpt_detail

});

const mapDispatchToProps = {
  saveKriteriaKkptTry
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(KKPTKriteria);
