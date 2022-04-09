import { Button, Table } from "antd";
import React from "react";
import { connect } from "react-redux";
import { getCatatan } from "../../../../../store/ducks/EWP/Mapa/Dokumen/selectors";
import { Excel } from "antd-table-saveas-excel";

function TableCatatanMapa({ catatan }) {
  const columns = [
    { title: "BAB", dataIndex: "bab" },
    { title: "Keterangan", dataIndex: "keterangan" },
  ];

  const remapCatatan = (data) => {
    let temp = [];
    data.map((item, idx) => temp.push({ ...item, key: idx }));
    return temp;
  };

  const handleDownload = () => {
    const excel = new Excel();
    excel
      .addSheet("catatan")
      .addColumns(columns)
      .addDataSource(remapCatatan(catatan))
      .saveAs("Catatan-Mapa.xlsx");
  };

  return (
    <div className="space-y-4">
      <Table columns={columns} dataSource={remapCatatan(catatan)} />
      <Button type="primary" onClick={handleDownload}>
        Download as Excel
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    catatan: getCatatan(state),
  };
};

export default connect(mapStateToProps, null)(TableCatatanMapa);
