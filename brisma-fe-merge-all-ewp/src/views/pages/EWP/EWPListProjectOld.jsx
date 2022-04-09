import React, { useState, useEffect } from "react";
import AppLayout from "../../../layouts/AppLayout";
import { Button, Select, Pagination } from "antd";
import FilterForm from "../../../component/EWP/EwpListProjects/FilterForm";
import CardProjectEwp from "../../../component/EWP/EwpListProjects/CardProjectEwp";
import CreateProjectEwpModal from "../../../component/EWP/EwpListProjects/Modal";
import { list_projects } from "../../routes/allowedRoles";
import withAuth from "../../routes/hoc/withAuth";
import withRole from "../../routes/hoc/withRole";
import { fetchEWPs, disabledEwp } from "../../../store/ducks/EWP/CreateEWP/actions";
import { getError, getLoading, getEwps } from "../../../store/ducks/EWP/CreateEWP/selectors";
import { connect } from "react-redux";
import { compose } from "redux";

const EWPListProject = ({ disabledEwp, dataEwp, fetchEWPs, loading, error }) => {
  const onFinish = (values) => {};
  const onFinishFailed = (error) => {};
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);

  useEffect(() => fetchEWPs(), [fetchEWPs]);
  const onDisabled = async (e, id) => {
    await disabledEwp(e, id);
  };

  return (
    <AppLayout title="EWP">
      <CreateProjectEwpModal
        visible={modalVisible}
        handleCancel={closeModal}
        handleOk={closeModal}
      />
      {/*Filter Section*/}
      <div className="p-6 my-4 bg-white">
        <FilterForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
      </div>
      {/*Create Project EWP and Sort*/}
      <div className="py-4 flex justify-between items-center">
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Create Project EWP
        </Button>
        <Select className="w-48" placeholder="Sort by" allowClear />
      </div>
      {/*Card Project EWP*/}
      <section className="my-8 grid grid-cols-3 gap-8">
        {dataEwp.map((item, i) => {
          return (
            <CardProjectEwp
              key={i}
              id={item.id}
              project_id={item.project_id}
              start_date={item.info_periode_pelaksanaan_start}
              end_date={item.info_periode_pelaksanaan_end}
              project_name={item.project_name}
              type={item.audit_type_name}
              tim_audit={item.info_team_audit}
              progress={item.progress}
              addendum={item.addendum}
              status_name={item.status_name}
              status_dokumen={item.status_dokumen}
              status_persetujuan={item.status_persetujuan}
              status_project={item.status_project}
              onDisabled={onDisabled}
            />
          );
        })}
      </section>
      {/* pagination*/}
      <div className="flex flex-row justify-center pb-10">
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </AppLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state),
    error: getError(state),
    dataEwp: getEwps(state),
  };
};

const mapDispachToProps = {
  fetchEWPs: fetchEWPs,
  disabledEwp: disabledEwp,
};

export default compose(
  withAuth,
  withRole(list_projects),
  connect(mapStateToProps, mapDispachToProps)
)(EWPListProject);
