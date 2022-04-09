import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { compose } from "redux";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import AddendumWarning from "../../../../component/EWP/Mapa/Dashboard/AddendumWarning";
import CardMenu from "../../../../component/EWP/Mapa/Dashboard/CardMenu";
import EWPLayout from "../../../../layouts/EwpLayout";
import { fetchDashboard } from "../../../../store/ducks/EWP/Mapa/Dashboard/actions";
import {
  getError,
  getLoading,
  getMapaInfo,
} from "../../../../store/ducks/EWP/Mapa/Dashboard/selectors";
import { pat_content } from "../../../routes/allowedRoles";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";

function MapaDashboard({ fetchDashboard, mapaInfo, loading }) {
  const { project_id } = useParams();
  const navigate = useNavigate();
  const handleClickCard = (dataCard) => {
    navigate("/ewp/mapa/" + dataCard);
  };
  useEffect(() => fetchDashboard(project_id), [fetchDashboard, project_id]);

  const mapStatus = (sudah = false) => {
    if (sudah) {
      return "sudah";
    } else {
      return "belum";
    }
  };

  const menu = [
    {
      title: "Latar Belakang",
      description: "Latar belakang memorandum analisis perencanaan audit",
      status: mapStatus(mapaInfo.latar_belakang),
      image: "/pat-project-1.png",
      url: `latar-belakang/${project_id}`,
    },
    {
      title: "Tujuan",
      description: "Tujuan memorandum analisis perencanaan audit",
      status: mapStatus(mapaInfo.tujuan),
      image: "/pat-project-2.png",
      url: `tujuan/${project_id}`,
    },
    {
      title: "Sumber Informasi",
      description: "Sumber Informasi memorandum analisis perencanaan audit",
      status: mapStatus(mapaInfo.sumber_informasi),
      image: "/pat-project-2.png",
      url: `sumber-informasi/${project_id}`,
    },
    {
      title: "Tim Audit",
      description: "Tim Audit memorandum analisis perencanaan audit",
      status: mapStatus(mapaInfo.tim_audit),
      image: "/pat-project-4.png",
      url: `tim-audit/${project_id}`,
    },
    {
      title: "Uker Assesment",
      description: "Uker Assesment memorandum analisis perencanaan audit",
      status: mapStatus(mapaInfo.uker_assesment),
      image: "/pat-project-3.png",
      url: `uker-assesment/${project_id}`,
    },
    {
      title: "Analisis Perencanaan",
      description: "Analisis Perencanaan memorandum analisis perencanaan audit",
      status: mapStatus(mapaInfo.analisis_perencanaan),
      image: "/pat-project-3.png",
      url: `analisis-perencanaan/${project_id}`,
    },

    {
      title: "Penugasan",
      description: "Penugasan memorandum analisis perencanaan audit",
      status: mapStatus(mapaInfo.penugasan),
      image: "/pat-project-5.png",
      url: "penugasan/" + project_id,
    },
    {
      title: "Jadwal Audit",
      description: "Jadwal audit memorandum analisis perencanaan audit",
      status: mapStatus(mapaInfo.jadwal_audit),
      image: "/pat-project-6.png",
      url: "jadwal/" + project_id,
    },
    {
      title: "Anggaran",
      description: "Angaran dari Perencanaan Audit Tahunan",
      status: mapStatus(mapaInfo.anggaran),
      image: "/pat-project-7.png",
      url: "anggaran/" + project_id,
    },
    {
      title: "Doc MAPA",
      description: "Generate & View Doc PAT dari Perencanaan Audit Tahunan",
      status: mapStatus(mapaInfo.doc_mapa),
      image: "/pat-project-8.png",
      url: "doc/" + project_id,
    },
  ];

  const breadcrumb = [
    { title: "MAPA", link: "/ewp/mapa/dashboard/" + project_id },
  ];
  return (
    <EWPLayout breadcrumb={breadcrumb} selectedKey="2">
      <div className="px-6">
        <CardProjectEWP />
      </div>
      <div className="grid grid-cols-4 gap-8 my-6">
        {menu.map((item) => {
          const { title, description, status, image, url } = item;
          return (
            <CardMenu
              handleClicked={handleClickCard}
              title={title}
              url={url}
              description={description}
              status={status}
              image={image}
            />
          );
        })}
      </div>
      <AddendumWarning disabled={true} />
    </EWPLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state),
    error: getError(state),
    mapaInfo: getMapaInfo(state),
  };
};

const mapDispachToProps = {
  fetchDashboard: fetchDashboard,
};

export default compose(
  withAuth,
  withRole(pat_content),
  connect(mapStateToProps, mapDispachToProps)
)(MapaDashboard);
