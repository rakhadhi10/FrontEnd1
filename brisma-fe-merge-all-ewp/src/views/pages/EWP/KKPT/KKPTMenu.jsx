import { Avatar, Button } from "antd";
import React from "react";
import EWPLayout from "../../../../layouts/EwpLayout";
import { CardInfoKKPT } from "../../../../component/EWP/EWPKKPT";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { FileOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function KKPTMenu() {
  const { project_id } = useParams();




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

  return (
    <EWPLayout selectedKey="5" breadcrumb={breadcrumb}>
      <div className="flex gap-1 pb-5">
        <Button size="small">&lt;</Button>
        <Button size="small">&gt;</Button>
      </div>
      <div className="grid grid-cols-2 gap-6 px-6">
        <CardProjectEWP />
        <CardInfoKKPT />
      </div>

      <div className="flex justify-center mt-8 gap-20 items-center text-center">
        <div>
          <Link to={`/ewp/project/kkpt/dokumen/${project_id}`} >
            <Avatar
              size={64}
              icon={
                <FileOutlined
                  style={{ verticalAlign: "middle" }}
                  className="text-secondary-light-black"
                />
              }
            />
          </Link>
          <p>KKPT</p>
        </div>
        <div>
          <Link to={`/ewp/project/kkpt/merge/${project_id}`}>
            <Avatar
              size={64}
              icon={
                <SnippetsOutlined
                  style={{ verticalAlign: "middle" }}
                  className="text-secondary-light-black"
                />
              }
            />
          </Link>
          <p>KKPT Merge</p>
        </div>
      </div>
    </EWPLayout>
  );
}
