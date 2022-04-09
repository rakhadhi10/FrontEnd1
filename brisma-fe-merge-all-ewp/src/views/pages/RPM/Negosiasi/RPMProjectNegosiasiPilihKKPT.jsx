import { Pagination, Select, Spin } from "antd";
import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { KKPTCard } from "../../../../component/RPM";
import RPMNegosiasiBreadcrumb from "../../../../component/RPMNegosiasiBreadcrumb";
import AppLayout from "../../../../layouts/AppLayout";
import { fetchKKPTNego } from "../../../../store/ducks/RPMNegosiasi/actions";
import { getKKPTNego, getKKPTNegoError, getKKPTNegoLoading } from "../../../../store/ducks/RPMNegosiasi/selectors";

function RPMProjectNegosiasiPilihKKPT(props) {
  let navigate = useNavigate();
  let { id } = useParams();
  const { fetchKKPTNego, loading, error, data } = props

  useEffect(() => fetchKKPTNego(id), [fetchKKPTNego, id])

  const onClickCard = (kkpt_id) => {
    navigate(`/rpm/negosiasi/${id}/kkpt/${kkpt_id}`);
  };

  if (loading) return (
    <AppLayout title="RPM">
      <div className="flex justify-center"><Spin /></div>
    </AppLayout>
  );

  if (error && !loading) return (
    <AppLayout title="RPM">
      <div className="flex justify-center">{error}</div>
    </AppLayout>
  );

  return (
    <AppLayout title="RPM" breadcrumb={RPMNegosiasiBreadcrumb}>
      <div className="flex justify-between my-10">
        <p className="text-xl font-bold font-mulish text-secondary-light-black ">Pilih KKPT</p>
        <Select placeholder="Sort by" allowClear style={{ width: "200px" }} />
      </div>
      <div className="mx-16 space-y-4 my-8">
        {
          data && data.map(d => (
            <KKPTCard onClick={() => onClickCard(d.kkpt_id)} key={d.kkpt_id} {...d} />
          ))
        }
      </div>
      <div className="flex justify-center my-10">
        <Pagination />
      </div>
    </AppLayout>
  );
}

const mapDispatchToProps = {
  fetchKKPTNego: fetchKKPTNego
}

const mapStateToProps = state => ({
  loading: getKKPTNegoLoading(state),
  error: getKKPTNegoError(state),
  data: getKKPTNego(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(RPMProjectNegosiasiPilihKKPT)