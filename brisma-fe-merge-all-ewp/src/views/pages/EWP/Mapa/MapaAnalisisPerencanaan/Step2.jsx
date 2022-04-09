import React, { useState } from "react";
import TreeTableComponent from "../../../../../component/EWP/Mapa/AnalisisPerencanaan/Analizing/TreeTableComponent";
import AnalisaRisk from "../../../../../component/EWP/Mapa/AnalisisPerencanaan/Analizing/AnalisaRisk";

export default function Step2() {
  const [isAnalisaRisk, setisAnalisaRisk] = useState(false);
  const [selectedData, setselectedData] = useState({
    kode: "",
    aktivitas_kode: "",
    level: 0,
    uker: "",
    uker_id: "",
  });

  const moveToAnalisaRisk = (kode, level, uker_id, uker, aktivitas_kode) => {
    let newAktivitasKode = "";
    if (level === 2) {
      newAktivitasKode = kode;
    } else {
      newAktivitasKode = aktivitas_kode;
    }
    setselectedData({
      kode: kode,
      level: level,
      uker: uker,
      uker_id: uker_id,
      aktivitas_kode: newAktivitasKode,
    });
    setisAnalisaRisk(true);
  };
  const backFromAnalisaRisk = () => {
    setisAnalisaRisk(false);
    setselectedData({ kode: "", level: 0, uker: "", uker_id: "" });
  };

  if (!isAnalisaRisk) {
    return (
      <div className="border-2 p-5 rounded-md border-blue-300">
        <TreeTableComponent moveToAnalisaRisk={moveToAnalisaRisk} />
      </div>
    );
  } else {
    return (
      <AnalisaRisk
        onBack={backFromAnalisaRisk}
        kode={selectedData.kode}
        level={selectedData.level}
        uker={selectedData.uker}
        uker_id={selectedData.uker_id}
        aktivitas_kode={selectedData.aktivitas_kode}
      />
    );
  }
}
