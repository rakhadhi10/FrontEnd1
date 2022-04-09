import {
  CardInfoKkpa,
  Approver,
  CommentKkpa,
  ModalApprovalKkpaList,
  KkpaLayout,
} from "../../../../component/EWP/EwpKkpa";
import { DownOutlined } from "@ant-design/icons";
import { Button, Tree } from "antd";
import Ckeditor from "../../../../component/CKEditor";
import { compose } from "redux";
import { connect } from "react-redux";
import { memo, useEffect, useState, useCallback } from "react";
import { fetchKkpaInfoById } from "../../../../store/ducks/EWP/KKPA/kkpaInfo/action";
import { fetchDaftarIsi } from "../../../../store/ducks/EWP/KKPA/daftarisi/action";
import { fetchContent } from "../../../../store/ducks/EWP/KKPA/contentlist/action";
import { fetchAllDataComment } from "../../../../store/ducks/EWP/KKPA/comment/action";
import { fetchKkpaList } from "../../../../store/ducks/EWP/KKPA/KkpaList/action";
import { useNavigate, useParams } from "react-router-dom";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";
import { pat_content } from "../../../routes/allowedRoles";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import EwpLayout from "../../../../layouts/EwpLayout";

const { TreeNode } = Tree;
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
    title: "KKPA LIST",
    link: "/",
  },
];

function EwpKkpaList({
  state_kkpa_list,
  state_kkpa_info,
  state_content,
  state_daftar_isi,
  fetchKkpaInfoById,
  fetchContent,
  fetchDaftarIsi,
  fetchKkpaList,
  getComment,
}) {
  const params = useParams()
  const navigate = useNavigate();
  const kkpa_id = JSON.parse(localStorage.getItem("kkpa_id"));
  const id_kkpa = kkpa_id !== null ? kkpa_id.id_kkpa : 1;

  const [show, setShow] = useState(false);
  const [showApprove, setShowAprove] = useState(false);

  const modalClose = useCallback(() => {
    setShow(false);
    setShowAprove(false);
  }, []);

  useEffect(() => {
    fetchKkpaInfoById(id_kkpa)
    fetchKkpaList(params.project_id); //hardcode id mapa 1
    fetchDaftarIsi();
    fetchContent(id_kkpa, 1);
    getComment(id_kkpa, 1); //1 bab
  }, []);

  const onSelect = (selectedKeys, info) => {
    if (info.node.id_kkpa !== undefined) {
      fetchKkpaInfoById(info.node.id_kkpa);
      fetchContent(info.node.id_kkpa, 1); //1 adalah id bab daftar isi yaitu program audit
      getComment(info.node.id_kkpa, 1); //1 adalah id bab daftar isi yaitu program audit
    }
  };

  const onClickDaftarIsi = (id_bab) => {
    fetchContent(id_kkpa, id_bab);
    getComment(id_kkpa, id_bab);
  };

  return (
    <EwpLayout breadcrumb={breadcrumb}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <CardProjectEWP />
        </div>
        <div>
          <CardInfoKkpa />
        </div>
      </div>
      <div className="flex  gap-1 mt-10">
        <div className="w-1/2">
          <div className="border border-primary-blue py-3 px-2 rounded-lg h-full">
            <div className="flex  justify-between">
              <p className="text-lg text-primary-blue font-semibold">List KKPA</p>
              <p className="underline text-md text-primary-yellow">Filter</p>
            </div>
            <div className="bg-white py-2 px-3">
              <p className="text-primary-yellow mb-2">Filtered By </p>
              <ul className="list-disc px-10">
                <li>Uker KC A</li>
                <li>Aktivitas Perkreditan</li>
                <li>Sub Major AKD1</li>
              </ul>
            </div>
            <Tree
              className="mt-5"
              showLine
              defaultExpandedKeys={["1-1-1-1-1-1"]}
              defaultSelectedKeys={["1-1-1-1-1-1"]}
              switcherIcon={<DownOutlined style={{ fontSize: "13px", fontWeight: "bold" }} />}
              onSelect={onSelect}
              treeData={state_kkpa_list.data}
            ></Tree>
          </div>
        </div>
        <div className="w-full">
          <div className="flex gap-1">
            <div className="w-72 ">
              <div className="border border-primary-blue rounded-lg h-full">
                <div className="border-b border-primary-blue">
                  <p className="text-lg text-primary-blue px-2 py-1 font-semibold">Daftar Isi</p>
                </div>
                <div className="px-3 py-3">
                  <div className="flex flex-col">
                    {state_daftar_isi.data.map((value, key) => (
                      <div key={key}>
                        {value.title}
                        {value.subTitle.map((subValue, keyValue) => (
                          <button
                            onClick={() => onClickDaftarIsi(subValue.id)}
                            key={keyValue}
                            className="px-5 cursor-pointer underline"
                          >
                            {subValue.name}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              {/* Components Approver */}
              <Approver />
              {/* Components Approver */}
            </div>
          </div>
          <div className="border border-primary-blue py-2 px-5 rounded-lg mt-5 w-full bg-white ">
            <CommentKkpa idkkpa={id_kkpa} />
            <Ckeditor contentData={state_content.data} />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Button
          onClick={() => setShowAprove(true)}
          className="float-right bg-primary-green text-white "
        >
          Send Approval
        </Button>
        <div className="flex place-content-center mb-10">
          <div>
            <Button onClick={() => setShow(true)} className="bg-red-500 mr-5 text-white">
              NA
            </Button>
            <Button onClick={() => navigate(`/ewp/kkpa/${params.project_id}/${id_kkpa}`)} className="bg-blue-500 text-white">
              Edit
            </Button>
          </div>
        </div>
      </div>
      <ModalApprovalKkpaList show={show} reject={true} cancelModal={modalClose} />
      <ModalApprovalKkpaList show={showApprove} cancelModal={modalClose} />
    </EwpLayout>
  );
}

const mapStateToProps = (state) => ({
  state_kkpa_list: state.kkpa_list,
  state_kkpa_info: state.kkpa_info,
  state_daftar_isi: state.daftar_isi_kkpa,
  state_content: state.content_kkpa,
});

const mapDispatchToProps = {
  fetchKkpaInfoById,
  fetchContent,
  fetchDaftarIsi,
  fetchKkpaList,
  getComment: fetchAllDataComment,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withAuth, withRole(pat_content), withConnect, memo)(EwpKkpaList);
