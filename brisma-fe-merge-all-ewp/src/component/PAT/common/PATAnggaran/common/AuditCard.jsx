import React from "react";
import { Card } from "antd";
import IDCurrencyFormat from "../../../../IDCurrencyFormat";
import { dateToCardDateString } from "../../../../../utils/momentHelpers";

export const AuditCard = ({
  id,
  pat_id,
  nama_kegiatan,
  tim_id,
  tim_audit_name,
  tipe_audit,
  total_anggaran,
  uka,
  pelaksanaan_start,
  pelaksanaan_end,
  pn_pic_jadwal_audit,
  nama_pic_jadwal_audit,
  jabatan_pic_jadwal_audit,
  pn_ma,
  nama_ma,
  jabatan_ma,
  pn_kta,
  nama_kta,
  jabatan_kta,
  ata
}) => {
  return (
    <Card
      headStyle={{ color: "#3C64B1", fontSize: "18px", fontWeight: "400" }}
      title={nama_kegiatan}
    >
      <div className="flex flex-col justify-start font-mulish">
        <p className="text-secondary-yellow">{tim_audit_name}</p>
        <p className="text-xs text-gray-400 py-4">
          {dateToCardDateString(pelaksanaan_start)} sd {dateToCardDateString(pelaksanaan_end)}
        </p>
        <div className="pb-4">
          <div className="flex items-center gap-2">
            <div style={{ backgroundColor: "#8BF1EB" }} className="w-1 h-1 rounded-full" />
            <p className="text-xs text-black font-bold ">{nama_ma} ({jabatan_ma})</p>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ backgroundColor: "#8BF1EB" }} className="w-1 h-1 rounded-full" />
            <p className="text-xs text-black font-bold ">{nama_kta} ({jabatan_kta})</p>
          </div>
        </div>
        <div className="pb-4">
          {ata.map(a => (
            <div className="flex items-center gap-2">
              <div style={{ backgroundColor: "#8490F8" }} className="w-1 h-1 rounded-full" />
              <p className="text-xs text-gray-500 font-light ">{a.nama_ata} ({a.jabatan})</p>
            </div>
          ))}
        </div>
        <IDCurrencyFormat
          value={total_anggaran}
          renderText={value => (
            <p className="text-xs text-gray-400 pb-4">Rencana anggaran : {value}</p>
          )}
        />
        <span className="px-2 py-1 w-max text-white font-mulish text-xs bg-primary-red">Audit</span>
      </div>
    </Card>
  );
};

export default AuditCard;
