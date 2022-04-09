import { DesktopOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { compose } from "redux";
import CardProjectEWP from "../../../../../component/EWP/common/CardProjectEWP";
import EWPLayout from "../../../../../layouts/EwpLayout";
import { pat_content } from "../../../../routes/allowedRoles";
import withAuth from "../../../../routes/hoc/withAuth";
import withRole from "../../../../routes/hoc/withRole";
import SetAuditorPenugasan from "./SetAuditorPenugasan";
import SummaryPenugasan from "./SummaryPenugasan";

function MapaPenugasan() {
  const [steps, setsteps] = useState("");
  const { project_id } = useParams();
  const breadcrumb = [
    { title: "MAPA", link: "/ewp/mapa/dashboard/" + project_id },
    {
      title: "Penugasan",
      link: "/ewp/mapa/penugasan/" + project_id,
    },
  ];

  return (
    <EWPLayout breadcrumb={breadcrumb} selectedKey="2">
      <div className="flex gap-1">
        <Button size="small">
          <Link to={"/ewp/mapa/analisis-perencanaan/" + project_id}>&lt;</Link>
        </Button>
        <Button size="small">
          <Link to={"/ewp/mapa/jadwal/" + project_id}>&gt;</Link>
        </Button>
      </div>
      <div className="m-6">
        <CardProjectEWP />
      </div>
      <div className="flex justify-center items-center space-x-4 mb-8">
        <div>
          <div
            onClick={() => setsteps("pic")}
            className={
              steps === "pic"
                ? "bg-primary-yellow hover:bg-primary-yellow rounded-full h-14 w-14 flex items-center justify-center mx-auto"
                : " bg-primary-gray hover:bg-primary-yellow rounded-full h-14 w-14 flex items-center justify-center mx-auto"
            }
          >
            <UserAddOutlined style={{ fontSize: "20px" }} />
          </div>
          <p className={steps === "pic" ? "text-primary-yellow" : "text-black"}>
            Set Auditor
          </p>
        </div>
        <div className="text-primary-gray">-------------</div>
        <div>
          <div
            onClick={() => setsteps("summary")}
            className={
              steps === "summary"
                ? "bg-primary-yellow hover:bg-primary-yellow rounded-full h-14 w-14 flex items-center justify-center mx-auto"
                : " bg-primary-gray hover:bg-primary-yellow rounded-full h-14 w-14 flex items-center justify-center mx-auto"
            }
          >
            <DesktopOutlined style={{ fontSize: "20px" }} />
          </div>
          <p
            className={
              steps === "summary" ? "text-primary-yellow" : "text-black"
            }
          >
            Summary
          </p>
        </div>
      </div>
      <div>
        {steps === "pic" ? (
          <SetAuditorPenugasan />
        ) : steps === "summary" ? (
          <SummaryPenugasan />
        ) : (
          ""
        )}
      </div>
    </EWPLayout>
  );
}

export default compose(withAuth, withRole(pat_content))(MapaPenugasan);
