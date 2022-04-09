import { Button, notification } from "antd";
import React, { useState, useEffect, memo } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { SmileOutlined } from '@ant-design/icons';
import { CardInfoKKPT, TableKontrol, KkptLayout } from "../../../../component/EWP/EWPKKPT";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import EWPLayout from "../../../../layouts/EwpLayout";
import { compose } from "redux";
import { connect } from "react-redux";
import { getControlList, updateKkptControl } from "../../../../store/ducks/EWP/Kkpt/kkptcontrol/action"
import { useParams } from "react-router";

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
    title: "Kontrol",
    link: "/ewp/project/kkpt/kontrol",
  },
];

function KKPTKontrol({ stateKkptControl, getDataControl, setControlUpdate }) {
  const { project_id, kkpt_id } = useParams();
  const [kontrolData, setkontrolData] = useState([]);
  const { data, loading, eror, message, loadingUpdate, messageUpdate, errorUpdate } = stateKkptControl
  useEffect(() => {
    (async () => {
      getDataControl(kkpt_id)
    })();
  }, [kkpt_id])

  const onChangeCheck = (e, controlCode) => {

    e.target.checked ? setkontrolData(state => [...state, controlCode])
      : setkontrolData(state => kontrolData.filter(val => val !== controlCode))
  }

  const onUpdateControl = async () => {
    let dataUpdated = {
      kkpt_id,
      controls: kontrolData
    }

    let response = await setControlUpdate(dataUpdated)

    if (response === "success") {
      notification.open({
        message: 'Notification Title',
        description: "Berhasil memilih kondisi",
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      });
      setkontrolData([])
    }

  }


  return (
    <KkptLayout title={"EWP"} selectedKey="5" breadcrumb={breadcrumb} kkpt_id={kkpt_id}>
      <div className="flex gap-1 pb-5">
        <Button size="small">&lt;</Button>
        <Button size="small">&gt;</Button>
      </div>
      <div className="grid grid-cols-2 gap-6 px-6">
        <CardProjectEWP />
        <CardInfoKKPT />
      </div>
      <div className="flex items-center gap-4 mb-4 mt-8">
        <p className="text-secondary-light-black text-3xl font-mulish font-bold">Kontrol</p>
        <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
      </div>
      <div className="bg-white border border-primary-blue rounded-xl px-5 py-5 mb-6">
        <TableKontrol data={data} onChange={onChangeCheck} />
        <div className="my-5 flex justify-end">

          <Button onClick={onUpdateControl} type="primary">Save</Button>
        </div>
      </div>
    </KkptLayout>
  );
}

const mapStateToProps = (state) => ({
  stateKkptControl: state.kkpt_control,
});

const mapDispatchToProps = {
  getDataControl: getControlList,
  setControlUpdate: updateKkptControl,

};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(KKPTKontrol);
