import { Button } from "antd";
import React from "react";
import { CardInfoKKPT, CardProjectKkpt, KkptLayout } from "../../../../component/EWP/EWPKKPT";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import EWPLayout from "../../../../layouts/EwpLayout";
import { useParams } from "react-router";

const kkptProjectList = [
  {
    title: "Kppt Info",
    link: "/ewp/project/kkpt/info-kkpt",
    img: "/pat-project-1.png",
    status: "filled",
  },
  {
    title: "Kondisi",
    link: "/ewp/project/kkpt/kondisi",
    img: "/pat-project-1.png",
    status: "filled",
  },
  {
    title: "Worksheet",
    link: "/ewp/project/kkpt/worksheet",
    img: "/pat-project-1.png",
    status: "filled",
  },
  {
    title: "Kontrol",
    link: "/ewp/project/kkpt/kontrol",
    img: "/pat-project-1.png",
    status: "filled",
  },
  {
    title: "Kriteria",
    link: "/ewp/project/kkpt/kriteria",
    img: "/pat-project-1.png",
    status: "filled",
  },
  {
    title: "Penyebab",
    link: "/ewp/project/kkpt/penyebab",
    img: "/pat-project-1.png",
    status: "filled",
  },
  {
    title: "Dampak",
    link: "/ewp/project/kkpt/dampak",
    img: "/pat-project-1.png",
    status: "filled",
  },
  {
    title: "Likehood",
    link: "/ewp/project/kkpt/likehood",
    img: "/pat-project-1.png",
    status: "filled",
  },
  {
    title: "Kategori Temuan",
    link: "/ewp/project/kkpt/kategori",
    img: "/pat-project-1.png",
    status: "filled",
  },
  {
    title: "Rekomendasi",
    link: "/ewp/project/kkpt/rekomendasi",
    img: "/pat-project-1.png",
    status: "filled",
  },
];

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

export default function KKPTListProject() {
  const { project_id, kkpt_id } = useParams();


  return (
    <KkptLayout selectedKey="5" title="EWP" breadcrumb={breadcrumb} kkpt_id={kkpt_id}>
      <div className="flex gap-1 pb-5">
        <Button size="small">&lt;</Button>
        <Button size="small">&gt;</Button>
      </div>
      <div className="grid grid-cols-2 gap-6 px-6">
        <CardProjectEWP />
        <CardInfoKKPT />
      </div>
      <div className="grid grid-cols-4 gap-8 my-6">
        {kkptProjectList.map((item) => (
          <CardProjectKkpt
            title={item.title}
            status={item.status}
            img={item.img}
            link={item.link}
            id_kkpt={kkpt_id}
            project_id={project_id}
          />
        ))}
      </div>
    </KkptLayout>
  );
}
