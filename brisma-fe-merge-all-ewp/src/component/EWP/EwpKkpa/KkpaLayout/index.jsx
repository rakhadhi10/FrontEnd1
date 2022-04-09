import { useEffect } from "react";
import EWPLayout from "../../../../layouts/EwpLayout";
import { compose } from "redux";
import { memo } from "react";
import { connect } from "react-redux";
import { fetchKkpaInfoById } from "../../../../store/ducks/EWP/KKPA/kkpaInfo/action";

const KkpaLayout = ({ title, breadcrumb, children, fetchKkpaInfoById, kkpa_id }) => {
  // const kkpa_id = JSON.parse(localStorage.getItem("kkpa_id"));

  useEffect(() => {
    // const id = kkpa_id !== null ? kkpa_id.id_kkpa : 1;

    fetchKkpaInfoById(kkpa_id);
  }, [fetchKkpaInfoById]);

  return (
    <EWPLayout selectedKey="4" breadcrumb={breadcrumb}>
      {children}
    </EWPLayout>
  );
};

const mapStateToProps = (state) => ({
  state_kkpa_list: state.kkpa_list,
  state_kkpa_info: state.kkpa_info,
  state_daftar_isi: state.daftar_isi_kkpa,
});

const mapDispatchToProps = {
  fetchKkpaInfoById,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(KkpaLayout);
