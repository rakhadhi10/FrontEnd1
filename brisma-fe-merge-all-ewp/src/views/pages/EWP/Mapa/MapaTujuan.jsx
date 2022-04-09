import { Button, Spin } from "antd";
import React, { useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { compose } from "redux";
import Ckeditor from "../../../../component/CKEditor";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import {
  createErrorNotification,
  createSuccessNotification,
} from "../../../../component/utils/notifications";
import EWPLayout from "../../../../layouts/EwpLayout";
import {
  fetchTujuan,
  postTujuan,
} from "../../../../store/ducks/EWP/Mapa/Tujuan/actions";
import {
  getError,
  getLoading,
  getSubmitError,
  getSubmitLoading,
  getTujuan,
} from "../../../../store/ducks/EWP/Mapa/Tujuan/selectors";
import { pat_content } from "../../../routes/allowedRoles";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";

const showSuccessNotif = createSuccessNotification(
  "Tujuan",
  "Berhasil menyimpan Tujuan"
);
const showErrorNotif = createErrorNotification(
  "Tujuan",
  "Gagal menyimpan Tujuan"
);

let editor = null;

function MapaTujuan({
  fetchTujuan,
  postTujuan,
  loading,
  error,
  submitLoading,
  submitError,
  content,
}) {
  const { project_id } = useParams();
  useEffect(() => fetchTujuan(project_id), [fetchTujuan, project_id]);
  const breadcrumb = [
    { title: "MAPA", link: "/ewp/mapa/dashboard/" + project_id },
    { title: "Tujuan", link: "/ewp/mapa/tujuan/" + project_id },
  ];

  return (
    <EWPLayout breadcrumb={breadcrumb} selectedKey="2">
      <div className="flex gap-1 mb-5">
        <Button size="small">
          <Link to={"/ewp/mapa/latar-belakang/" + project_id}>&lt;</Link>
        </Button>
        <Button size="small">
          <Link to={"/ewp/mapa/sumber-informasi/" + project_id}>&gt;</Link>
        </Button>
      </div>
      <div className="px-6">
        <CardProjectEWP />
      </div>
      <div className="flex items-center gap-4 mb-4 mt-8">
        <p className="text-secondary-light-black text-3xl font-mulish font-bold">
          Tujuan
        </p>
        <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
      </div>
      {loading && (
        <div className="text-center">
          <Spin />
        </div>
      )}
      {!loading && error && <div className="text-center">{error}</div>}
      {!loading && !error && (
        <>
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
                const success = await postTujuan(project_id, editor.getData());
                if (success) {
                  showSuccessNotif();
                  fetchTujuan(project_id);
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
    content: getTujuan(state),
  };
};

const mapDispachToProps = {
  fetchTujuan: fetchTujuan,
  postTujuan: postTujuan,
};

export default compose(
  withAuth,
  withRole(pat_content),
  connect(mapStateToProps, mapDispachToProps)
)(MapaTujuan);
