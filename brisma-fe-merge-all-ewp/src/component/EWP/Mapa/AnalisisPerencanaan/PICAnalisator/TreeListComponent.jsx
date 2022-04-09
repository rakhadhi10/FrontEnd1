import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Spin, Table } from "antd";
import { remapAPAPIC } from "../../../../../component/utils/mapData";
import { connect } from "react-redux";
import {
  getData,
  getError,
  getLoading,
} from "../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/selectors";
import { fetchAnalisisPerencanaan } from "../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/actions";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import CreateSetAuditorModal from "./modal/CreateSetAuditorModal";

function TreeListComponent({ fetchAnalisisPerencanaan, error, loading, data }) {
  const { project_id } = useParams();
  const [modalData, setmodalData] = useState({
    visible: false,
    uker_id: "",
    uker: "",
  });

  const showModal = (curId, curUker) => {
    setmodalData({ visible: true, uker_id: curId, uker: curUker });
  };

  const handleCancel = () => {
    fetchAnalisisPerencanaan(project_id);
    setmodalData({ visible: false, uker_id: "", uker: "" });
  };

  useEffect(
    () => fetchAnalisisPerencanaan(project_id),
    [fetchAnalisisPerencanaan, project_id]
  );
  console.log(remapAPAPIC(data));
  const columns = [
    {
      title: "Uker",
      dataIndex: "uker",
      key: "uker",
      render: (text, record) => {
        if (record.level === 1) {
          return (
            <div className="flex flex-row gap-3">
              <div className="w-32">{record.uker}</div>
              <div>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  size="small"
                  onClick={() => showModal(record.uker_id, record.uker)}
                />
              </div>
            </div>
          );
        } else {
          let tcol =
            record.level === 2 ? "text-primary-blue" : "text-primary-green";
          return (
            <div className="flex flex-row grap-3">
              <div className="w-36">{record.uker}</div>
              <div className={tcol}>
                <UserOutlined style={{ fontSize: 20 }} /> &nbsp;{" "}
                {record.auditor}
              </div>
            </div>
          );
        }
      },
    },
  ];

  return (
    <>
      {loading && (
        <div className="text-center">
          <Spin />
        </div>
      )}
      {error && !loading && <p className="text-red-600">{error}</p>}
      {!error && !loading && (
        <>
          {console.log(loading)}
          <CreateSetAuditorModal
            visible={modalData.visible}
            uker_id={modalData.uker_id}
            uker={modalData.uker}
            handleCancel={handleCancel}
          />
          <Table
            columns={columns}
            dataSource={remapAPAPIC(data)}
            pagination={false}
            showHeader={false}
          />
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state),
    error: getError(state),
    data: getData(state),
  };
};

const mapDispachToProps = {
  fetchAnalisisPerencanaan: fetchAnalisisPerencanaan,
};

export default connect(mapStateToProps, mapDispachToProps)(TreeListComponent);
