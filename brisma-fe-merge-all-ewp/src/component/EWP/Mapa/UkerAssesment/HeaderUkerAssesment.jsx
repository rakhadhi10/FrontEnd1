import { Progress } from "antd";
import React from "react";
import { connect } from "react-redux";
import {
  getBody,
  getInfoHeader,
  getLoading,
} from "../../../../store/ducks/EWP/Mapa/UkerAssesment/selectors";

function HeaderUkerAssesment({ dataBody = [], dataHeader, loading }) {
  const countUker = (uker) => {
    console.log(uker);
    const sum = dataBody.filter((item) => item.tipe_uker == uker && item.is_selected);
    console.log(sum);
    return sum.length;
  };

  const persentage = (uker) => {
    const sum = countUker(uker);
    const persent = (sum / dataBody.map((i) => i.is_selected).length) * 100;
    console.log(persent);
    return persent;
  };

  return (
    <div className="grid grid-cols-2 w-1/2 p-10">
      {!loading &&
        dataHeader.map((item) => (
          <div className="grid grid-cols-4">
            <p>{item.kode}</p>
            <div className="flex">
              <p className="pr-1">{countUker(item.kode)}</p>
              <Progress percent={persentage(item.kode)} />
            </div>
          </div>
        ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dataHeader: getInfoHeader(state),
    dataBody: getBody(state),
    loading: getLoading(state),
  };
};

export default connect(mapStateToProps, null)(HeaderUkerAssesment);
