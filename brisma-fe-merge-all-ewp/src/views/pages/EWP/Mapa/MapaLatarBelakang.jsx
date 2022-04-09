import React, { useEffect } from "react";
import {
  createErrorNotification,
  createSuccessNotification,
} from "../../../../component/utils/notifications";
import { Link, useParams } from "react-router-dom";
import EWPLayout from "../../../../layouts/EwpLayout";
import { Button, Spin } from "antd";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { FaQuestionCircle } from "react-icons/fa";
import Ckeditor from "../../../../component/CKEditor";
import {
  fetchLatarBelakang,
  postLatarBelakang,
} from "../../../../store/ducks/EWP/Mapa/LatarBelakang/actions";
import { compose } from "redux";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";
import { pat_content } from "../../../routes/allowedRoles";
import { connect } from "react-redux";
import {
  getError,
  getLatarBelakang,
  getLoading,
  getSubmitError,
  getSubmitLoading,
} from "../../../../store/ducks/EWP/Mapa/LatarBelakang/selectors";

const showSuccessNotif = createSuccessNotification(
  "Latar Belakang",
  "Berhasil menyimpan latar belakang"
);
const showErrorNotif = createErrorNotification(
  "Latar Belakang",
  "Gagal menyimpan latar belakang"
);

let editor = [];

function MapaLatarBelakang({
  fetchLatarBelakang,
  postLatarBelakang,
  loading,
  error,
  submitLoading,
  submitError,
  content,
}) {
  const { project_id } = useParams();
  const breadcrumb = [
    { title: "MAPA", link: "/ewp/mapa/dashboard/" + project_id },
    { title: "Latar Belakang", link: "/ewp/mapa/latar-belakang/" + project_id },
  ];
  useEffect(
    () => fetchLatarBelakang(project_id),
    [fetchLatarBelakang, project_id]
  );

  return (
    <EWPLayout breadcrumb={breadcrumb} selectedKey="2">
      {loading && (
        <div className="text-center">
          <Spin />
        </div>
      )}
      {!loading && error && <div className="text-center">{error}</div>}
      {!loading && !error && (
        <>
          <div className="flex gap-1 mb-5">
            <Button size="small">
              <Link to={"/ewp/mapa/dashboard/" + project_id}>&lt;</Link>
            </Button>
            <Button size="small">
              <Link to={"/ewp/mapa/tujuan/" + project_id}>&gt;</Link>
            </Button>
          </div>
          <div className="px-6">
            <CardProjectEWP />
          </div>
          <div className="flex items-center gap-4 mb-4 mt-8">
            <p className="text-secondary-light-black text-3xl font-mulish font-bold">
              Latar Belakang
            </p>
            <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
          </div>
          <Ckeditor
            contentData={content}
            handleEditorReady={(ed) => (editor = ed)}
            disabled={false}
          />
          <div className="py-8 flex justify-end items-center gap-4">
            <p className="text-primary-red">{submitError}</p>
            <Button
              type="primary"
              loading={submitLoading}
              onClick={async () => {
                const success = await postLatarBelakang(
                  project_id,
                  editor.getData()
                );
                if (success) {
                  showSuccessNotif();
                  fetchLatarBelakang(project_id);
                } else {
                  showErrorNotif();
                }
              }}
            >
              Simpan
            </Button>
          </div>
        </>
      )}
    </EWPLayout>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: getLoading(state),
    error: getError(state),
    submitLoading: getSubmitLoading(state),
    submitError: getSubmitError(state),
    content: getLatarBelakang(state),
  };
};

const mapDispachToProps = {
  fetchLatarBelakang: fetchLatarBelakang,
  postLatarBelakang: postLatarBelakang,
};

export default compose(
  withAuth,
  withRole(pat_content),
  connect(mapStateToProps, mapDispachToProps)
)(MapaLatarBelakang);
