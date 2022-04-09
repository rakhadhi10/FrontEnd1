import React, { useState } from "react";
import { message, Select, Skeleton } from "antd";
import {
  getBreadcrumbAktivitasData,
  getBreadcrumbAktivitasError,
  getBreadcrumbAktivitasLoading,
} from "../../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/selectors";
import { fetchBreadcrumbAktivitas } from "../../../../../../store/ducks/EWP/Mapa/AnalisisPerencanaan/actions";
import { connect } from "react-redux";
import { useEffect } from "react";

const { Option } = Select;

function BreadCrumbAnalisaRiskComponent({
  kode,
  level,
  uker,
  handleOnChange,
  data,
  loading,
  error,
  fetchBreadcrumbAktivitas,
}) {
  const [dataBreadcrumb, setdataBreadcrumb] = useState([]);

  useEffect(() => {
    let filter = "";
    if (level == 2) {
      filter = "aktivitas:" + kode;
    } else {
      filter = "sub_aktivitas:" + kode;
    }
    fetchBreadcrumbAktivitas(filter);
  }, [fetchBreadcrumbAktivitas, kode]);
  useEffect(() => {
    setdataBreadcrumb(data);
  }, [data]);
  return (
    <>
      {loading && <Skeleton active paragraph={false} />}
      {!loading && error && message.error(error)}
      {!loading && !error && dataBreadcrumb && (
        <div className="flex space-x-4 text-gray-600 font-mulish">
          {dataBreadcrumb.map((item) => (
            <>
              <p>{uker}</p>
              <p>{" ---> "}</p>
              <p>{item.nama}</p>
              <p>{" ---> "}</p>
              <Select size="small" style={{ width: "250px" }} onChange={handleOnChange}>
                {item.mtd_sub_aktivitas.map((obj, i) => (
                  <Option key={i} value={obj.kode}>
                    {obj.nama}
                  </Option>
                ))}
              </Select>
            </>
          ))}
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    data: getBreadcrumbAktivitasData(state),
    loading: getBreadcrumbAktivitasLoading(state),
    error: getBreadcrumbAktivitasError(state),
  };
};

const mapDispachToProps = {
  fetchBreadcrumbAktivitas: fetchBreadcrumbAktivitas,
};

export default connect(mapStateToProps, mapDispachToProps)(BreadCrumbAnalisaRiskComponent);
