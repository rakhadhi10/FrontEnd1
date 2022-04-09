import { Button } from "antd";
import { FaQuestionCircle } from "react-icons/fa";
import React, { useEffect } from "react";
import { compose } from "redux";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";
import { pat_content } from "../../../routes/allowedRoles";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import EWPLayout from "../../../../layouts/EwpLayout";
import HeaderUkerAssesment from "../../../../component/EWP/Mapa/UkerAssesment/HeaderUkerAssesment";
import TableUkerAssesment from "../../../../component/EWP/Mapa/UkerAssesment/TableUkerAssesment";
import { Link, useParams } from "react-router-dom";
import { fetchUkerAssesment } from "../../../../store/ducks/EWP/Mapa/UkerAssesment/actions";
import { connect } from "react-redux";

function MapaUkerAssesment({ fetchUkerAssesment }) {
  const { project_id } = useParams();
  const breadcrumb = [
    { title: "MAPA", link: "/ewp/mapa/dashboard/" + project_id },
    { title: "Uker Assesment", link: "/ewp/mapa/uker-assesment/" + project_id },
  ];

  useEffect(
    () => fetchUkerAssesment(project_id),
    [project_id, fetchUkerAssesment]
  );

  return (
    <EWPLayout breadcrumb={breadcrumb} selectedKey="2">
      <div className="flex gap-1 mb-5">
        <Button size="small">
          <Link to={"/ewp/mapa/tim-audit/" + project_id}>&lt;</Link>
        </Button>
        <Button size="small">
          <Link to={"/ewp/mapa/analisis-perencanaan/" + project_id}>&gt;</Link>
        </Button>
      </div>
      <div className="px-6">
        <CardProjectEWP />
      </div>
      <div className="flex items-center gap-4 mb-4 mt-8">
        <p className="text-secondary-light-black text-3xl font-mulish font-bold">
          Uker Assesment
        </p>
        <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
      </div>
      <div className="bg-white">
        <HeaderUkerAssesment />
      </div>
      <div className="items-center  bg-white p-10 mb-20">
        <TableUkerAssesment />
      </div>
    </EWPLayout>
  );
}

const mapDispatchToProps = {
  fetchUkerAssesment: fetchUkerAssesment,
};

export default compose(
  withAuth,
  withRole(pat_content),
  connect(null, mapDispatchToProps)
)(MapaUkerAssesment);
