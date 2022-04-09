import { compose } from "redux";
import { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Checkbox, Table, Button, notification } from "antd";
import {
  CardInfoKkpa,
  CardInformation,
  KkpaLayout,
  TitleQuestion,
} from "../../../../component/EWP/EwpKkpa";
import { CheckOutlined } from "@ant-design/icons";
import Ckeditor from "../../../../component/CKEditor";
import { FaQuestionCircle } from "react-icons/fa";
import { fetchAllDataRefControl } from "../../../../store/ducks/EWP/KKPA/refriskcontrol/action";
import { savePengujianControlKkpa } from "../../../../store/ducks/EWP/KKPA/kkpapengujiancontrol/action";
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
    title: "PENGUJIAN KONTROL",
    link: "/",
  },
];



export function EwpKkpaPengujianKontrol({ state_ref_control, fetchAllDataRefControl, state_kkpa_info, savePengujianControlKkpa }) {
  const { project_id, kkpa_id } = useParams()
  const [check, setcheck] = useState(false);
  const [keterangan, setKeterangan] = useState("");
  const [kontrolData, setKontrolData] = useState([]);
  const akd = state_kkpa_info.info_kkpa && state_kkpa_info.info_kkpa.risk_issue.kode;
  const ketPengujianControl = state_kkpa_info.kkpa_info && state_kkpa_info.kkpa_info.pengujian_control_desc

  useEffect(() => {
    fetchAllDataRefControl(akd)
    setKeterangan(ketPengujianControl)
  }, [akd]);

  function onChange(e, value, index) {

    e.target.checked ? setKontrolData(state => [...state, value.kode])
      : setKontrolData(state => kontrolData.filter(val => val !== value.kode))
  }



  const columnsControl = [
    {
      title: "Kode",
      dataIndex: "kode",
      key: "kode",
      align: "center",
    },
    {
      title: "Key",
      dataIndex: "keya",
      key: "keya",
      align: "center",
      render: (value) => {

        if (value === "check") {
          return <CheckOutlined className="text-primary-green" />;
        }
        return "";
      },
    },
    {
      title: "Deskripsi",
      dataIndex: "deskripsi",
      key: "deskripsi",
      align: "center",
    },
    {
      title: "Tidak Efektif",
      dataIndex: "tidak_efektif",
      key: "tidak_efektif",
      align: "center",
      render: (text, value, index) => {
        if (value.unefective) {
          return <Checkbox defaultChecked={false} checked={true} disabled />;
        } else {
          return <Checkbox defaultChecked={false} onChange={(e) => onChange(e, value, index)}></Checkbox>;
        }
      },
    },
  ];

  const changeValueKeterangan = (event, editor) => {
    setKeterangan(editor.getData());
  };

  const onSave = async () => {
    let tempSave = {
      "kkpa_id": kkpa_id,
      "pengujian_control_desc": keterangan,
      "pengujian_control_unefective": kontrolData.length === 0 ? null : kontrolData
    }

    let res = await savePengujianControlKkpa(tempSave)
    if (res === "success") {
      notification["success"]({
        message: 'Success',
        description:
          'Berhasil melakukan proses pengujian control',
      });
      // setKontrolData([])
    }
  }

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
      <div className="flex items-center gap-4 mt-6">
        <p className="text-secondary-light-black text-3xl font-mulish font-bold">
          Pengujian Control
        </p>
        <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
      </div>
      <div className="my-10">
        <CardInformation title="Program Audit" status="sample" />
        <div className="flex flex-col md:flex-row lg:flex-row justify-between space-x-3 mt-5">
          <div className="w-4/6">
            <div className="bg-white border border-primary-blue rounded-xl p-10 h-screen">
              <Ckeditor
                handleEditorChange={changeValueKeterangan}
                contentData={ketPengujianControl === null ? "" : ketPengujianControl}
              />
              <Button onClick={onSave} type="primary" className="mt-5">Save</Button>
            </div>
          </div>
          <div className="w-4/12">
            <div className="bg-white border border-primary-blue rounded-xl p-3 h-screen">
              <div className="space-y-5 h-full overflow-x-scroll">
                <div>
                  <div className="space-y-3 mb-3">
                    <TitleQuestion title="Control" />
                    <Table

                      pagination={false}
                      size="small"
                      dataSource={state_ref_control.data}
                      columns={columnsControl}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </KkpaLayout>
  );
}

const mapStateToProps = (state) => ({
  state_kkpa_info: state.kkpa_info,
  state_ref_control: state.ref_risk_control,
});

const mapDispatchToProps = {
  fetchAllDataRefControl,
  savePengujianControlKkpa
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withAuth, withRole(pat_content), withConnect, memo)(EwpKkpaPengujianKontrol);
