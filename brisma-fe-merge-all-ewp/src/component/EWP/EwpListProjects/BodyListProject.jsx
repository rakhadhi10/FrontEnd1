import { Empty, Pagination, Result, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserFirstRole } from "../../../store/ducks/auth/selectors";
import { fetchEWPs } from "../../../store/ducks/EWP/CreateEWP/actions";
import {
  getCurrentPage,
  getError,
  getEwps,
  getLoading,
  getTotalPage,
} from "../../../store/ducks/EWP/CreateEWP/selectors";
import CardProjectEwp from "./CardProjectEwp";

function BodyListProject({
  data = [],
  loading,
  error,
  currentPage,
  totalPage,
  fetchEWPs,
  role,
  modalVisible,
}) {
  const [dataEWP, setdataEWP] = useState([]);
  useEffect(
    () => !modalVisible && fetchEWPs({ page: 1 }),
    [fetchEWPs, modalVisible]
  );
  useEffect(() => setdataEWP(data), [data]);

  const onChangePage = async (page) => {
    const filter = { page: page };
    await fetchEWPs(filter);
  };

  console.log(role);

  return (
    <div className="my-5">
      {dataEWP.length === 0 && !loading && <Empty />}
      {loading && (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      )}
      {error && (
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
        />
      )}
      {dataEWP.length > 0 && !loading && !error && (
        <div className="space-y-4">
          <div className="my-8 grid grid-cols-3 gap-8">
            {dataEWP.map((item, i) => {
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
                  disabled={item.need_approval}
                  role={role}
                />
              );
            })}
          </div>
          <div className="flex flex-row justify-center pb-10">
            <Pagination
              defaultCurrent={currentPage}
              onChange={onChangePage}
              total={totalPage * 6}
              pageSize={6}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: getEwps(state),
    loading: getLoading(state),
    error: getError(state),
    currentPage: getCurrentPage(state),
    totalPage: getTotalPage(state),
    role: getUserFirstRole(state),
  };
};

const mapDispatchToProps = {
  fetchEWPs: fetchEWPs,
};

export default connect(mapStateToProps, mapDispatchToProps)(BodyListProject);
