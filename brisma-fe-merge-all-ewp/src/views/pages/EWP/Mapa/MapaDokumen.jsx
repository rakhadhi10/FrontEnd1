import { Button, message, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { compose } from "redux";
import EWPLayout from "../../../../layouts/EwpLayout";
import withAuth from "../../../routes/hoc/withAuth";
import withMapaStatus from "../../../routes/hoc/withMapaStatus";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import ApproverMapa from "../../../../component/EWP/Mapa/DocMapa/ApproverMapa";
import TindasanSPA from "../../../../component/EWP/Mapa/DocMapa/TindasanSPA";
import DaftarIsiDokumenMapa from "../../../../component/EWP/Mapa/DocMapa/DaftarIsiDokumenMapa";
import BaseContent from "../../../../component/EWP/Mapa/DocMapa/BaseContent";
import { fetchMapaDokumen } from "../../../../store/ducks/EWP/Mapa/Dokumen/actions";
import { connect } from "react-redux";
import {
  getApprover,
  getError,
} from "../../../../store/ducks/EWP/Mapa/Dokumen/selectors";
import { Link, useParams } from "react-router-dom";
import { ActionButton } from "../../../../component/EWP/Mapa/DocMapa/ActionButton";

function MapaDokumen({ error, fetchMapaDokumen, status }) {
  const [currentContent, setcurrentContent] = useState({
    key: "",
    title: "",
    params: {},
  });
  const { project_id } = useParams();

  useEffect(
    () => fetchMapaDokumen(project_id, {}),
    [fetchMapaDokumen, project_id]
  );

  const onClickMenu = (node, params) => {
    setcurrentContent({ ...node, params });
  };

  const breadcrumb = [
    { title: "MAPA", link: "/ewp/mapa/dashboard/" + project_id },
    {
      title: "Dokumen",
      link: "/ewp/mapa/doc/" + project_id,
    },
  ];

  return (
    <EWPLayout selectedKey="2" breadcrumb={breadcrumb}>
      {error && message.error(error)}
      <div className="flex gap-1 mb-5">
        <Button size="small">
          <Link to={"/ewp/mapa/anggaran/" + project_id}>&lt;</Link>
        </Button>
      </div>
      <div className="px-6">
        <CardProjectEWP />
      </div>
      <div className="mt-16">
        <Typography.Title level={3}>Doc Mapa</Typography.Title>
      </div>
      <section className="grid grid-cols-2 items-start gap-4 mb-8">
        <ApproverMapa />
        <TindasanSPA />
      </section>
      <section className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <DaftarIsiDokumenMapa onClickMenu={onClickMenu} />
        </div>
        <div className="col-span-3">
          <BaseContent currentContent={currentContent} />
        </div>
      </section>
      <section className="grid grid-cols-4 gap-4 pb-8 my-8">
        <div />
        {status && <ActionButton status={status} />}
      </section>
    </EWPLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    error: getError(state),
    status: getApprover(state) !== null ? getApprover(state).status : "",
  };
};

const mapDispatchToProps = {
  fetchMapaDokumen: fetchMapaDokumen,
};

export default compose(
  withAuth,
  withMapaStatus,
  connect(mapStateToProps, mapDispatchToProps)
)(MapaDokumen);
