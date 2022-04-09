import React from "react";
import { Input, Button } from "antd";
import { SkorDampak } from "./SkorDampak";

const { TextArea } = Input;

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

export const KesimpulanDampakCard = ({ kesimpulanValue, skorDampak, onSave, getValueKeterangan }) => {

  return (
    <div className="w-full rounded-2xl bg-white border border-primary-blue py-5 px-5 mb-10">
      <div className="flex gap-4 mb-3">
        <p className="w-2/12 text-primary-blue">Keterangan</p>
        {/* <TextArea defaultValue={kesimpulanValue} onChange={(e) => getValueKeterangan(e.target.value)} rows={4} className="w-10/12" /> */}
        <textarea value={kesimpulanValue} onChange={(e) => getValueKeterangan(e.target.value)} rows={4} className="w-10/12 border-2 border-blue-400 px-3" />
      </div>
      <div className="flex gap-4 mb-3">
        <p className="w-2/12 text-primary-blue">Keterangan</p>
        <SkorDampak skor={skorDampak} data={dampakSkor} />
      </div>
      <div className="flex gap-4 mb-3">
        <div className="w-2/12 "></div>
        <Button type="primary" onClick={() => onSave()} style={{ backgroundColor: "#3C64B1", borderColor: "#3C64B1" }}>
          Save
        </Button>
      </div>
    </div>
  );
};
