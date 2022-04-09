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
  fetchSumberInformasi,
  postSumberInformasi,
} from "../../../../store/ducks/EWP/Mapa/SumberInformasi/actions";
import {
  getError,
  getLoading,
  getSubmitError,
  getSubmitLoading,
  getSumberInformasi,
} from "../../../../store/ducks/EWP/Mapa/SumberInformasi/selectors";
import { pat_content } from "../../../routes/allowedRoles";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";

const showSuccessNotif = createSuccessNotification(
  "SumberInformasi",
  "Berhasil menyimpan SumberInformasi"
);
const showErrorNotif = createErrorNotification(
  "SumberInformasi",
  "Gagal menyimpan SumberInformasi"
);

let editor = null;

function MapaSumberInformasi({
  fetchSumberInformasi,
  postSumberInformasi,
  loading,
  error,
  submitLoading,
  submitError,
  content,
}) {
  const { project_id } = useParams();
  const breadcrumb = [
    { title: "MAPA", link: "/ewp/mapa/dashboard/" + project_id },
    {
      title: "Sumber Informasi",
      link: "/ewp/mapa/sumber-informasi/" + project_id,
    },
  ];
  useEffect(
    () => fetchSumberInformasi(project_id),
    [fetchSumberInformasi, project_id]
  );
  return (
    <EWPLayout breadcrumb={breadcrumb} selectedKey="2">
      <div className="flex gap-1 mb-5">
        <Button size="small">
          <Link to={"/ewp/mapa/tujuan/" + project_id}>&lt;</Link>
        </Button>
        <Button size="small">
          <Link to={"/ewp/mapa/tim-audit/" + project_id}>&gt;</Link>
        </Button>
      </div>
      <div className="px-6">
        <CardProjectEWP />
      </div>
      <div className="flex items-center gap-4 mb-4 mt-8">
        <p className="text-secondary-light-black text-3xl font-mulish font-bold">
          Sumber Informasi
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
                const success = await postSumberInformasi(
                  project_id,
                  editor.getData()
                );
                if (success) {
                  showSuccessNotif();
                  fetchSumberInformasi(project_id);
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
    content: getSumberInformasi(state),
  };
};

const mapDispachToProps = {
  fetchSumberInformasi: fetchSumberInformasi,
  postSumberInformasi: postSumberInformasi,
};

export default compose(
  withAuth,
  withRole(pat_content),
  connect(mapStateToProps, mapDispachToProps)
)(MapaSumberInformasi);
