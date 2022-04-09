import { Divider } from "antd";
import { useState, useEffect } from "react";
import { SkorDampak } from "../SkorDampak";
import { RadioSkor } from "./RadioSkor";

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

export const DampakNonFinansialCard = ({ data, onChange, dataDampak }) => {
  console.log(dataDampak)
  let allCount = dataDampak.list_nonfinancial.length
  useEffect(() => {
    if (allCount !== 0) {
      dataDampak.list_nonfinancial.forEach((v, k) => {
        if (v.nonfinancial_type_impact_kode === "cd1") {
          skorTag(state => ({
            ...state,
            reputasi: `${v.nonfinancial_type_impact_kode}-${v.mtd_stc_impact_kode}`,
          }))
        }
        if (v.nonfinancial_type_impact_kode === "cd2") {
          skorTag(state => ({
            ...state,
            regulasi: `${v.nonfinancial_type_impact_kode}-${v.mtd_stc_impact_kode}`,
          }))
        }
        if (v.nonfinancial_type_impact_kode === "cd3") {
          skorTag(state => ({
            ...state,
            pelayanan: `${v.nonfinancial_type_impact_kode}-${v.mtd_stc_impact_kode}`,
          }))
        }
        if (v.nonfinancial_type_impact_kode === "cd4") {
          skorTag(state => ({
            ...state,
            strategis: `${v.nonfinancial_type_impact_kode}-${v.mtd_stc_impact_kode}`,
          }))
        }
        if (v.nonfinancial_type_impact_kode === "cd5") {
          skorTag(state => ({
            ...state,
            hukum: `${v.nonfinancial_type_impact_kode}-${v.mtd_stc_impact_kode}`,
          }))
        }
      })

      skorTag(state => ({
        ...state,
        nonfinancial_impact_kode: dataDampak.nonfinancial_impact_kode
      }))
    }
  }, [allCount])


  const [tag, skorTag] = useState({
    reputasi: "",
    regulasi: "",
    pelayanan: "",
    strategis: "",
    hukum: "",
    nonfinancial_impact_kode: ""
  })

  return (
    <div className="w-full rounded-2xl bg-white border border-primary-blue py-5 px-5 mb-10">
      <div className="flex gap-4 mb-3">
        <p className="w-2/12 text-primary-blue">Skor Dampak Reputasi</p>
        <RadioSkor skor={tag.reputasi} dataSkor={data.reputasi} onChange={(e) => {
          skorTag(state => ({ ...state, reputasi: e.target.value }))
          onChange("reputasi", e.target.value)
        }} />
      </div>
      <div className="flex gap-4 mb-3">
        <p className="w-2/12 text-primary-blue">Skor Dampak Regulasi</p>
        <RadioSkor skor={tag.regulasi} dataSkor={data.regulasi} onChange={(e) => {
          skorTag(state => ({ ...state, regulasi: e.target.value }))
          onChange("regulasi", e.target.value)
        }} />
      </div>
      <div className="flex gap-4 mb-3">
        <p className="w-2/12 text-primary-blue">Skor Dampak Pelayanan</p>
        <RadioSkor skor={tag.pelayanan} dataSkor={data.pelayanan} onChange={(e) => {
          skorTag(state => ({ ...state, pelayanan: e.target.value }))
          onChange("pelayanan", e.target.value)
        }} />
      </div>
      <div className="flex gap-4 mb-3">
        <p className="w-2/12 text-primary-blue">Skor Dampak Strategis</p>
        <RadioSkor skor={tag.strategis} dataSkor={data.strategis} onChange={(e) => {
          skorTag(state => ({ ...state, strategis: e.target.value }))
          onChange("pelayanan", e.target.value)
        }} />
      </div>
      <div className="flex gap-4 mb-3">
        <p className="w-2/12 text-primary-blue">Skor Dampak Hukum</p>
        <RadioSkor skor={tag.hukum} dataSkor={data.hukum} onChange={(e) => {
          skorTag(state => ({ ...state, hukum: e.target.value }))
          onChange("hukum", e.target.value)
        }} />
      </div>
      <Divider dashed className="border border-primary-blue" />
      <div className="flex mt-4 mb-2 font-mulish font-bold">
        <p className="w-2/12 text-primary-blue">Skor Dampak Non Finansial</p>
        <SkorDampak skor={tag.nonfinancial_impact_kode} data={dampakSkor} />
      </div>
    </div>
  );
};
