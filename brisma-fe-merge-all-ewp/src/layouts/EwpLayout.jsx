import React from "react";
import { Button, Layout } from "antd";
import NotifButton from "../component/NotifButton";
import ProfileButton from "../component/ProfileButton";
import { useParams } from "react-router";
import {
  BiBookmark,
  BiDotsVerticalRounded,
  BiBarChartSquare,
  BiBookmarkAltMinus,
  BiImport,
  BiNotepad,
  BiSpreadsheet,
} from "react-icons/bi";
import { IoLayersOutline, IoPower } from "react-icons/io5";
import { BsJournalText } from "react-icons/bs";
import { RiFileTransferLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import EWPBreadCrumb from "../component/EWP/common/EWPBreadCrumb";

const { Content, Sider } = Layout;

export const EWPLayout = ({ children, selectedKey = "1", breadcrumb }) => {
  const { project_id } = useParams();
  console.log(selectedKey);
  let navigate = useNavigate();

  return (
    <Layout>
      <header
        className="bg-primary-blue bg-opacity-5 py-4 px-12 flex flex-wrap justify-between items-center"
        style={{ borderBottom: "1px solid #DAD7D7" }}
      >
        <a href="/" className="font-lato font-bold text-primary-blue text-2xl">
          EWP
        </a>
        <div className="flex justify-center items-center gap-4">
          <NotifButton />
          <ProfileButton />
        </div>
      </header>
      <Layout>
        <Sider className="bg-secondary-light-black" width="75px">
          <div className="flex flex-col px-1 py-3 items-center text-gray-300 ">
            <button
              className={
                selectedKey === "1"
                  ? "text-primary-red hover:text-red-300 flex flex-col items-center"
                  : "hover:text-red-300 flex flex-col items-center"
              }
              onClick={() => navigate("/ewp/audit-info/" + project_id)}
            >
              <BiBookmark focusable="true" className="text-3xl" />
              <p className="text-xs text-center">Info Audit</p>
            </button>
            <BiDotsVerticalRounded className="py-1 text-3xl" />
            <button
              className={
                selectedKey === "2"
                  ? "text-primary-red hover:text-red-300 flex flex-col items-center"
                  : "hover:text-red-300 flex flex-col items-center"
              }
              onClick={() => navigate("/ewp/mapa/dashboard/" + project_id)}
            >
              <BiBarChartSquare focusable="true" className="text-3xl" />
              <p className="text-xs text-center">Mapa</p>
            </button>
            <BiDotsVerticalRounded className="py-1 text-3xl" />
            <button
              className={
                selectedKey === "3"
                  ? "text-primary-red hover:text-red-300 flex flex-col items-center"
                  : "hover:text-red-300 flex flex-col items-center"
              }
              onClick={() => navigate("/ewp/entrance/" + project_id)}
            >
              <BiImport focusable="true" className="text-3xl" />
              <p className="text-xs text-center">Entrance</p>
            </button>
            <BiDotsVerticalRounded className="py-1 text-3xl" />
            <button
              className={
                selectedKey === "4"
                  ? "text-primary-red hover:text-red-300 flex flex-col items-center"
                  : "hover:text-red-300 flex flex-col items-center"
              }
              onClick={() => navigate("/ewp/kkpa/kkpa-list/" + project_id)}
            >
              <BiNotepad focusable="true" className="text-3xl" />
              <p className="text-xs text-center">Kkpa</p>
            </button>
            <BiDotsVerticalRounded className="py-1 text-3xl" />
            <button
              className={
                selectedKey === "5"
                  ? "text-primary-red hover:text-red-300 flex flex-col items-center"
                  : "hover:text-red-300 flex flex-col items-center"
              }
              onClick={() => navigate("/ewp/project/kkpt/" + project_id)}
            >
              <BsJournalText focusable="true" className="text-3xl" />
              <p className="text-xs text-center">Kkpt</p>
            </button>
            <BiDotsVerticalRounded className="py-1 text-3xl" />
            <button
              className={
                selectedKey === "6"
                  ? "text-primary-red hover:text-red-300 flex flex-col items-center"
                  : "hover:text-red-300 flex flex-col items-center"
              }
              onClick={() => navigate("/ewp/project/exitmeeting/" + project_id)}
            >
              <BiBookmarkAltMinus focusable="true" className="text-3xl" />
              <p className="text-xs text-center">Exit</p>
            </button>
            <BiDotsVerticalRounded className="py-1 text-3xl" />
            <button
              className={
                selectedKey === "7"
                  ? "text-primary-red hover:text-red-300 flex flex-col items-center"
                  : "hover:text-red-300 flex flex-col items-center"
              }
              onClick={() =>
                navigate("/ewp/project/lha/dashboard/" + project_id)
              }
            >
              <BiSpreadsheet focusable="true" className="text-3xl" />
              <p className="text-xs text-center">LHA</p>
            </button>
            <BiDotsVerticalRounded className="py-1 text-3xl" />
            <button
              className={
                selectedKey === "8"
                  ? "text-primary-red hover:text-red-300 flex flex-col items-center"
                  : "hover:text-red-300 flex flex-col items-center"
              }
              // onClick={() =>
              //   navigate("/ewp/project/lha/dashboard/" + project_id)
              // }
            >
              <RiFileTransferLine focusable="true" className="text-3xl" />
              <p className="text-xs text-center">NAF</p>
            </button>
            <BiDotsVerticalRounded className="py-1 text-3xl" />
            <button
              className={
                selectedKey === "9"
                  ? "text-primary-red hover:text-red-300 flex flex-col items-center"
                  : "hover:text-red-300 flex flex-col items-center"
              }
              onClick={() =>
                navigate("/ewp/project/dokumen-projek/" + project_id)
              }
            >
              <IoLayersOutline focusable="true" className="text-3xl" />
              <p className="text-xs text-center">Docs</p>
            </button>
            <BiDotsVerticalRounded className="py-1 text-3xl" />
            <button
              className={
                selectedKey === "10"
                  ? "text-primary-red hover:text-red-300 flex flex-col items-center"
                  : "hover:text-red-300 flex flex-col items-center"
              }
              onClick={() =>
                navigate("/ewp/project/closed-project/" + project_id)
              }
            >
              <IoPower focusable="true" className="text-3xl" />
              <p className="text-xs text-center">Close</p>
            </button>
          </div>
        </Sider>
        <Content className="px-12">
          <nav className="flex flex-wrap justify-between items-center py-4">
            <EWPBreadCrumb breadcrumb={breadcrumb} />
            <Button>Direct Menu</Button>
          </nav>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default EWPLayout;
