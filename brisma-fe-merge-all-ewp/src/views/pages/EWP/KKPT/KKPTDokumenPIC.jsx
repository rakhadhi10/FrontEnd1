import { Button, Typography, notification } from "antd";
import { useState, memo, useEffect, useCallback } from "react";
import {
  ApproverCard,
  CardInfoKKPT,
  CommentDrawer,
  DaftarIsi,
  ListKKPT,
  ModalApprovalKkptList,
  ModalNa,
  CommentKkpt
} from "../../../../component/EWP/EWPKKPT";
import EwpLayout from "../../../../layouts/EwpLayout";
import { MessageOutlined } from "@ant-design/icons";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { compose } from "redux";
import { connect } from "react-redux";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";
import { pat_content } from "../../../routes/allowedRoles";
import { fetchKkptList } from '../../../../store/ducks/EWP/Kkpt/kkptlistaktivitas/action'
import { fetchBabKkpt } from '../../../../store/ducks/EWP/Kkpt/refbab/action'
import { fetchKkptDetail } from '../../../../store/ducks/EWP/Kkpt/kkptdetail/action'
import { fetchAllDataComment } from '../../../../store/ducks/EWP/Kkpt/kkptcomment/action'
import { approvalKkpt, naKkpt } from '../../../../store/ducks/EWP/Kkpt/kkptapproval/action'
import { getDataDocKkpt, setContentDoc } from '../../../../store/ducks/EWP/Kkpt/kkptdata/action'
import { useParams, useNavigate } from "react-router";
import Ckeditor from "../../../../component/CKEditor";

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
];

export function KKPTDokumenPIC({ stateKkptList, stateRefBab, stateKkptDetail, fetchKkptList, fetchBabKkpt, fetchKkptDetail, approvalKkpt, naKkpt, kkptApproval, getDataComment, getDataDocKkpt, setContentDoc, documentState }) {
  const { loadingApproval, loadingNa } = kkptApproval
  const { project_id } = useParams();
  const navigate = useNavigate();

  const kkpt_id = JSON.parse(localStorage.getItem("kkpt_id"));
  const id_kkpt_first = kkpt_id !== null || undefined ? kkpt_id.id_kkpt : 1;
  let id_kkpt = stateKkptDetail.data !== null && stateKkptDetail.data.kkpt.id

  const [commentVisible, setCommentVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [showNa, setShowNa] = useState(false);

  const modalClose = useCallback(() => {
    setShow(false);
    setShowNa(false)
  }, []);

  const handleOnClickCommentButton = () => {
    setCommentVisible(!commentVisible);
  };


  useEffect(() => {
    (async () => {
      fetchKkptList(project_id)
      fetchBabKkpt()
      fetchKkptDetail(id_kkpt_first)
      getDataComment(id_kkpt_first, 2)
      getDataDocKkpt(id_kkpt_first)
    })()
  }, [])

  const onApprovalKkpt = async () => {
    let res = await approvalKkpt(id_kkpt)
    console.log(res)
    if (res === "success") {
      notification['success']({
        message: 'SuccessFully',
        description:
          'Berhasil melakukan approval',
      });
    } else {
      notification['error']({
        message: 'Unsuccessfull',
        description:
          'Gagal melakukan approval, terjadi kesalahan',
      });
    }

  }

  const onNaKkpt = async (keterangan) => {
    if (keterangan === "") {
      return notification['warning']({
        message: 'Perhatian',
        description:
          'Alasan NA Di Perlukan',
      });
    }
    let dataTempNa = {
      kkpt_id: id_kkpt,
      is_na_desc: keterangan
    }
    let res = await naKkpt(dataTempNa)
    if (res === "success") {
      notification['success']({
        message: 'SuccessFully',
        description:
          'Berhasil melakukan NA',
      });
    } else {
      notification['error']({
        message: 'Unsuccessfull',
        description:
          'Gagal melakukan NA, terjadi kesalahan',
      });
    }
  }

  const propsAproverCard = {
    dataLog: stateKkptDetail.data !== null ? stateKkptDetail.data.kkpt_log_persetujuan : [],
    dataAuditor: stateKkptDetail.data !== null ? stateKkptDetail.data.tim_audit : false
  }

  const contentDocument = (type_bab) => {
    console.log(type_bab)
    if (type_bab !== "Kategori Temuan") {
      setContentDoc(type_bab)
    }

  }

  return (
    <EwpLayout breadcrumb={breadcrumb} selectedKey="5">
      <div className="flex gap-1 pb-5">
        <Button size="small">&lt;</Button>
        <Button size="small">&gt;</Button>
      </div>
      <div className="grid grid-cols-2 gap-6 px-6">
        <CardProjectEWP />
        <CardInfoKKPT />
      </div>
      <div className="grid grid-cols-12 mt-10 gap-4 mb-8">
        <div className="col-span-3">
          <ListKKPT listData={stateKkptList.data} />
        </div>
        <div className="col-span-9 grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <DaftarIsi setContent={contentDocument} databab={stateRefBab.data} />
          </div>
          <div className="col-span-9">
            <ApproverCard {...propsAproverCard} />
          </div>
          <div
            className="relative bg-white border border-primary-blue rounded-lg p-4 col-span-12 overflow-auto"
          >
            <div className="absolute right-8 top-8">
              {/* <Button
                size="large"
                shape="circle"
                style={{ backgroundColor: "#E8B912" }}
                icon={<MessageOutlined className="text-2xl" />}
                onClick={handleOnClickCommentButton}
              /> */}
              <CommentKkpt idkkpt={id_kkpt} />
            </div>
            <div className="text-center">
              <Typography.Title level={1}>{documentState.title}</Typography.Title>
              <Ckeditor contentData={documentState.data} />
            </div>
            {/* <CommentDrawer visible={commentVisible} onClickClose={() => setCommentVisible(false)} /> */}

          </div>
        </div>

      </div>

      <div className="mt-5">
        <Button
          loading={loadingApproval}
          onClick={() => setShow(true)}
          className="float-right bg-primary-green text-white "
        >
          Send Approval
        </Button>
        <div className="flex place-content-center mb-10">
          <div>
            <Button
              loading={loadingNa}
              onClick={() => setShowNa(true)}
              className="bg-red-500 mr-5 text-white">
              NA
            </Button>
            <Button onClick={() => navigate(`/ewp/project/kkpt/project/${project_id}/${id_kkpt}`)} className="bg-blue-500 text-white">
              Edit
            </Button>
          </div>
        </div>
      </div>
      <ModalApprovalKkptList loadingApproval={loadingApproval} onApproval={onApprovalKkpt} show={show} reject={true} cancelModal={modalClose} />
      <ModalNa loadingNa={loadingNa} onNa={onNaKkpt} show={showNa} reject={true} cancelModal={modalClose} />
    </EwpLayout>
  );
}


const mapStateToProps = (state) => ({
  stateKkptList: state.kkpt_list,
  stateRefBab: state.ref_bab_kkpt,
  stateKkptDetail: state.kkpt_detail,
  kkptApproval: state.kkpt_approval_na,
  documentState: state.kkpt_data
});

const mapDispatchToProps = {
  fetchKkptList,
  fetchBabKkpt,
  fetchKkptDetail,
  approvalKkpt,
  naKkpt,
  getDataComment: fetchAllDataComment,
  getDataDocKkpt,
  setContentDoc
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withAuth, withRole(pat_content), withConnect, memo)(KKPTDokumenPIC);