import { Button, Card, Form, Input, notification } from "antd";
import React, { useState, memo } from "react";

import { CardInfoKKPT, KkptLayout } from "../../../../component/EWP/EWPKKPT";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { FaQuestionCircle } from "react-icons/fa";
import Ckeditor from "../../../../component/CKEditor";
import { saveKondisiKkptTry } from "../../../../store/ducks/EWP/Kkpt/kkptkondisisave/action"
import { saveKelemahanKkptTry } from "../../../../store/ducks/EWP/Kkpt/kkptkelemahanPI/action"
import { compose } from "redux";
import { connect } from "react-redux";
import { useParams } from "react-router";
const { TextArea } = Input;

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
    title: "Kondisi",
    link: "/ewp/project/kkpt/kondisi",
  },
];

function KKPTKondisi({ stateKkptDetail, stateKkptKondisiSave, saveKondisiKkptTry, stateKkptKelemahanSave, saveKelemahanKkptTry }) {
  const { project_id, kkpt_id } = useParams();
  const { message, loading } = stateKkptKondisiSave;
  const stateKPI = stateKkptKelemahanSave;
  const [kpi, setkpi] = useState();
  const [form] = Form.useForm();
  const [kondisiData, setKondisi] = useState("SSSSS");

  const changeValueKondisi = (event, editor) => {
    setKondisi(editor.getData());
  };

  const onSaveKondisi = async () => {
    let dataSaveKondisi = {
      id: Number(kkpt_id),
      kondisi: kondisiData
    }

    let status = await saveKondisiKkptTry(dataSaveKondisi)
    if (status === "success") {
      notification['success']({
        message: 'SuccessFully',
        description:
          'Berhasil melakukan Insert kondisi',
      });

    }
  };

  const onSaveKPI = async () => {
    const value = form.getFieldValue();
    let dataTempKpi = {
      id: Number(kkpt_id),
      kpi: value.kelemahanPengendalianIntern
    }
    let status = await saveKelemahanKkptTry(dataTempKpi)
    if (status === "success") {
      notification['success']({
        message: 'SuccessFully',
        description:
          'Berhasil melakukan Insert KPI',
      });

    }
  };

  return (
    <KkptLayout title={'KKPT KONDISI'} breadcrumb={breadcrumb} kkpt_id={kkpt_id}>
      <div className="flex gap-1 pb-5">
        <Button size="small">&lt;</Button>
        <Button size="small">&gt;</Button>
      </div>
      <div className="grid grid-cols-2 gap-6 px-6">
        <CardProjectEWP />
        <CardInfoKKPT />
      </div>
      <div className="flex items-center gap-4 mb-4 mt-8">
        <p className="text-secondary-light-black text-3xl font-mulish font-bold">Kondisi</p>
        <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
      </div>
      <Card>
        <div className="py-4">
          <p className="text-secondary-light-black text-xl font-mulish font-bold">Kondisi</p>
          <Ckeditor handleEditorChange={changeValueKondisi} contentData={stateKkptDetail.data !== null ? stateKkptDetail.data.kkpt.kondisi : null} />

          <div className="py-4">
            <Button loading={loading} onClick={onSaveKondisi} type="primary">Save</Button>

          </div>
        </div>
        <div className="py-4 gap-4">
          <p className="text-secondary-light-black text-xl font-mulish font-bold">
            Kelemahan Pengendalian Intern
          </p>
          {
            stateKkptDetail.data !== null &&
            <Form form={form} initialValues={{
              ['kelemahanPengendalianIntern']: stateKkptDetail.data.kkpt.kpi
            }}>
              <Form.Item name="kelemahanPengendalianIntern">
                <TextArea placeholder="Kelemahan Pengendalian Intern" rows={5} />
              </Form.Item>
              <Button loading={stateKPI.loading} onClick={onSaveKPI} type="primary" >
                Save
              </Button>

            </Form>
          }
        </div>

      </Card>
    </KkptLayout>
  );
}

const mapStateToProps = (state) => ({
  stateKkptKondisiSave: state.kkpt_kondisi_save,
  stateKkptKelemahanSave: state.kkpt_kelemahan_save,
  stateKkptDetail: state.kkpt_detail
});

const mapDispatchToProps = {
  saveKondisiKkptTry,
  saveKelemahanKkptTry
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(KKPTKondisi);
