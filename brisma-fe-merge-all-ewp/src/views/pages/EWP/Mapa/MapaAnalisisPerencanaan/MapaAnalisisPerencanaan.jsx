import React, { useState } from "react";
import { Button } from "antd";
import { EWPLayout } from "../../../../../layouts/EwpLayout";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FaQuestionCircle } from "react-icons/fa";
import { DesktopOutlined, UserAddOutlined } from "@ant-design/icons";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import CardProjectEWP from "../../../../../component/EWP/common/CardProjectEWP";
import { Link, useParams } from "react-router-dom";

function MapaAnalisisPerencanaan() {
  const [steps, setSteps] = useState("pic");
  const { project_id } = useParams();

  const breadcrumb = [
    { title: "MAPA", link: "/ewp/mapa/dashboard/" + project_id },
    {
      title: "Analisis Perencanaan",
      link: "/ewp/mapa/analisis-perencanaan/" + project_id,
    },
  ];

  return (
    <EWPLayout selectedKey="2" breadcrumb={breadcrumb}>
      <div className="flex gap-1 mb-5">
        <Button size="small">
          <Link to={"/ewp/mapa/uker-assesment/" + project_id}>&lt;</Link>
        </Button>
        <Button size="small">
          <Link to={"/ewp/mapa/penugasan/" + project_id}>&gt;</Link>
        </Button>
      </div>
      <div className="px-6">
        <CardProjectEWP />
      </div>
      <div className="flex items-center gap-4 mb-5 mt-8">
        <p className="text-secondary-light-black text-3xl font-mulish font-bold">
          Analisis Perencanaan
        </p>
        <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
      </div>
      <div className="p-5">
        <div className="block md:flex lg:flex justify-center content-center">
          <div>
            <div
              onClick={() => setSteps("pic")}
              className={
                steps === "pic"
                  ? "bg-primary-yellow  cursor-pointerhover:bg-primary-yellow rounded-full h-14 w-14 flex items-center justify-center mx-auto"
                  : " bg-primary-gray cursor-pointer hover:bg-primary-yellow rounded-full h-14 w-14 flex items-center justify-center mx-auto"
              }
            >
              <UserAddOutlined style={{ fontSize: "20px" }} />
            </div>
            <p>PIC Analisator</p>
          </div>
          <div className="text-primary-gray">-------------</div>
          <div>
            <div
              onClick={() => setSteps("analizing")}
              className={
                steps === "analizing"
                  ? "bg-primary-yellow cursor-pointer hover:bg-primary-yellow rounded-full h-14 w-14 flex items-center justify-center mx-auto"
                  : " bg-primary-gray cursor-pointer hover:bg-primary-yellow rounded-full h-14 w-14 flex items-center justify-center mx-auto"
              }
            >
              <DesktopOutlined style={{ fontSize: "20px" }} />
            </div>
            <p>Analizing</p>
          </div>
          <div className="text-primary-gray">-------------</div>
          <div>
            <div
              onClick={() => setSteps("summary")}
              className={
                steps === "summary"
                  ? "bg-primary-yellow cursor-pointer hover:bg-primary-yellow rounded-full h-14 w-14 flex items-center justify-center mx-auto"
                  : " bg-primary-gray cursor-pointer hover:bg-primary-yellow rounded-full h-14 w-14 flex items-center justify-center mx-auto"
              }
            >
              <DesktopOutlined style={{ fontSize: "20px" }} />
            </div>
            <p>Summary</p>
          </div>
        </div>
        <div className="bg-white p-10 mt-5">
          {steps === "summary" ? (
            <Step3 />
          ) : steps === "pic" ? (
            <Step1 />
          ) : steps === "analizing" ? (
            <Step2 />
          ) : (
            ""
          )}
        </div>
      </div>
    </EWPLayout>
  );
}

export default MapaAnalisisPerencanaan;
