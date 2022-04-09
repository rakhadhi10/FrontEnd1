import React from "react";

export const ProjectInfo = ({ data }) => {
  return (
    <div className="border border-primary-blue p-4 rounded grid grid-cols-5 gap-4 text-primary-blue font-mulish">
      <div className="col-span-1">
        <p>Project Name</p>
        <p>Tahun Audit</p>
        <p>Ketua Tim Audit</p>
        <p>Periode Ruang Lingkup</p>
      </div>
      <div className="col-span-4">
        <p>{data.project_name}</p>
        <p>{data.audit_year}</p>
        <p>{data.pn_ketua_tim + " - " + data.nama_ketua_tim}</p>
        <p>
          {data.info_periode_pelaksanaan_start +
            " s/d " +
            data.info_periode_pelaksanaan_end}
        </p>
      </div>
    </div>
  );
};
