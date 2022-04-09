import { Button, Divider } from "antd";
import React from "react";
import { TableListKerugian } from "./TableListKerugian";
import NumberFormat from "react-number-format";
import { SkorDampak } from "../SkorDampak";

let dampakSkor = [
  {
    "kode": "SR",
    "nama": "Sangat Rendah",
    "score": 1,
    "color": "#2e8c3b"
  },
  {
    "kode": "R",
    "nama": "Rendah",
    "score": 2,
    "color": "#0eed2d"
  },
  {
    "kode": "SD",
    "nama": "Sedang",
    "score": 3,
    "color": "#ede90e"
  },
  {
    "kode": "T",
    "nama": "Tinggi",
    "score": 4,
    "color": "#e8c113"
  },
  {
    "kode": "ST",
    "nama": "sangat tinggi",
    "score": 5,
    "color": "#e81313"
  }
]

export const DampakFinansialCard = ({ showModal, onDelete, data }) => {
  return (
    <div className="w-full rounded-2xl bg-white border border-primary-blue py-5 px-5 mb-10">
      <Button
        type="primary"
        onClick={showModal}
        style={{ backgroundColor: "#3C64B1", borderColor: "#3C64B1" }}
      >
        Tambah Detail Kerugian
      </Button>
      <p className="font-mulish text-xs text-gray-500 mt-4 mb-2">List Kerugian</p>
      <TableListKerugian data={data.listKerugian} onDelete={onDelete} />
      <div className="flex mt-4 mb-2 font-mulish">
        <p className="w-2/12 text-primary-blue">Total Kerugian</p>
        <NumberFormat
          value={data.totalKerugian}
          displayType={"text"}
          prefix="Rp."
          suffix=",-"
          thousandSeparator={true}
          className="text-primary-red text-lg font-bold"
        />
      </div>
      <div className="flex mt-4 mb-2 font-mulish">
        <p className="w-2/12 text-primary-blue">Gross Profit</p>
        <NumberFormat
          value={data.grossProfit}
          displayType={"text"}
          prefix="Rp."
          suffix=",-"
          thousandSeparator={true}
          className="text-secondary-yellow text-lg font-bold"
        />
      </div>
      <Divider dashed className="border border-primary-blue" />
      <div className="flex mt-4 mb-2 font-mulish font-bold">
        <p className="w-3/12 text-primary-blue">Skor Dampak Kerugian</p>
        <SkorDampak skor={data.financial_impact_kode} data={dampakSkor} />
      </div>
    </div>
  );
};
