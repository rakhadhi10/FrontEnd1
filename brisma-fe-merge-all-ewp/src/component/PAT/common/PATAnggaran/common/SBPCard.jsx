import React from "react";
import { Card } from "antd";
import IDCurrencyFormat from "../../../../IDCurrencyFormat";
import { dateToCardDateString } from "../../../../../utils/momentHelpers";

export const SBPCard = ({
  id,
  sbp_name,
  branch_induk,
  orgeh_induk,
  orgeh_name,
  total_anggaran,
  pembicara,
  penanggung_jawab,
  pelaksanaan_start,
  pelaksanaan_end,
  pn_pic_maker_jadwal_sbp,
  nama_pic_maker_jadwal_sbp,
}) => {
  return (
    <Card
      headStyle={{ color: "#3C64B1", fontSize: "18px", fontWeight: "400" }}
      title={sbp_name}
    >
      <div className="flex flex-col justify-start font-mulish">
        <p className="text-xs text-gray-400 pb-4">
          {dateToCardDateString(pelaksanaan_start)} sd {dateToCardDateString(pelaksanaan_end)}
        </p>
        <div className="pb-4">
          {pembicara.map(p => (
            <div key={p.id} className="flex items-center gap-2">
              <div style={{ backgroundColor: "#8BF1EB" }} className="w-1 h-1 rounded-full" />
              <p className="text-xs text-black font-bold ">{p.nama} ({p.jabatan})</p>
            </div>
          ))}
        </div>
        <div className="pb-4">
          {penanggung_jawab.map(p => (
            <div className="flex items-center gap-2">
              <div style={{ backgroundColor: "#8490F8" }} className="w-1 h-1 rounded-full" />
              <p className="text-xs text-gray-500 font-light ">{p.nama} ({p.jabatan})</p>
            </div>
          ))}
        </div>
        <IDCurrencyFormat
          value={total_anggaran}
          renderText={value => (
            <p className="text-xs text-gray-400 pb-4">Rencana anggaran : {value}</p>
          )}
        />
        <span className="px-2 py-1 w-max text-white font-mulish text-xs bg-primary-green">SBP</span>
      </div>
    </Card>
  );
};

export default SBPCard;
