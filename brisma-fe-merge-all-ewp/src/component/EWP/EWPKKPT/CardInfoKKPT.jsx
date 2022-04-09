import { Card, Divider } from "antd";
import { memo } from "react";

import { compose } from "redux";
import { connect } from "react-redux";

const CardInfoKKPT = ({ stateKkptDetail }) => {

  return (
    <Card style={{ overflow: "hidden", borderRadius: "10px" }}>
      <div className="flex flex-row items-center">
        <p className="text-primary-blue font-bold font-mulish">Info KKPT</p>
        <Divider type="vertical" />
        <div className="font-mulish font-light">
          <p className="text-red-800 font-bold">Exemplar No : {stateKkptDetail.data !== null ? stateKkptDetail.data.kkpt.exemplar_no : null}</p>
          <p>
            [{stateKkptDetail.data !== null ? stateKkptDetail.data.auditor.posisi.toUpperCase() : null}] {stateKkptDetail.data !== null ? stateKkptDetail.data.auditor.pn : null} - {stateKkptDetail.data !== null ? stateKkptDetail.data.auditor.name : null}
          </p>
          <p>{stateKkptDetail.data !== null ? stateKkptDetail.data.risk_issue.kode : null} - {stateKkptDetail.data !== null ? stateKkptDetail.data.risk_issue.name : null} </p>
          <p>{stateKkptDetail.data !== null ? stateKkptDetail.data.sub_major.kode : null} - {stateKkptDetail.data !== null ? stateKkptDetail.data.sub_major.name : null}</p>
          <p>{stateKkptDetail.data !== null ? stateKkptDetail.data.sub_aktivitas.name : null}</p>
          <p>{stateKkptDetail.data !== null ? stateKkptDetail.data.aktivitas.name : null}</p>
          <p>{stateKkptDetail.data !== null ? stateKkptDetail.data.uker.name : null}</p>
        </div>
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => ({

  stateKkptDetail: state.kkpt_detail

});



const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(CardInfoKKPT);
