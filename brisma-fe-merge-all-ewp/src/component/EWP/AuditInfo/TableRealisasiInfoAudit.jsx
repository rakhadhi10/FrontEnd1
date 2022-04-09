import { Table } from "antd";
import React, { useEffect } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchJadwalAudit } from "../../../store/ducks/EWP/Mapa/JadwalAudit/actions";
import {
  getData,
  getLoading,
} from "../../../store/ducks/EWP/Mapa/JadwalAudit/selectors";
import { remapJadwalAuditMapa } from "../../utils/mapData";

function TableRealisasiInfoAudit({ data, loading, fetchJadwalAudit }) {
  const { project_id } = useParams();
  useEffect(() => fetchJadwalAudit(project_id), [fetchJadwalAudit, project_id]);
  const columns = [
    {
      key: 1,
      title: "Keterangan",
      dataIndex: "keterangan",
    },

    {
      key: 4,
      title: "Start Date",
      dataIndex: "real_start",
      render: (_, record) =>
        record.real_start && (
          <Moment date={record.real_start} format="DD-MMMM-YYYY" locale="id" />
        ),
    },
    {
      key: 5,
      title: "End Date",
      dataIndex: "real_end",
      render: (_, record) =>
        record.real_end && (
          <Moment date={record.real_end} format="DD-MMMM-YYYY" locale="id" />
        ),
    },
  ];

  return (
    <Table
      dataSource={remapJadwalAuditMapa(data)}
      columns={columns}
      size="small"
      loading={loading}
      pagination={false}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    data: getData(state),
    loading: getLoading(state),
  };
};

const mapDispachToProps = {
  fetchJadwalAudit: fetchJadwalAudit,
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(TableRealisasiInfoAudit);
