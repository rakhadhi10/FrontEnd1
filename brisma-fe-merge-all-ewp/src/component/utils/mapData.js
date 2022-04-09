export const mapTeamToDinasFormOptions = (team) => {
  const anggota = [];
  const ktaMap = {
    pn: team.pn_kta.pn,
    nama: team.pn_kta.nama,
    jabatan: team.pn_kta.jabatan,
  };
  const maMap = {
    pn: team.pn_ma.pn,
    nama: team.pn_ma.nama,
    jabatan: team.pn_ma.jabatan,
  };
  anggota.push(ktaMap);
  anggota.push(maMap);

  const atas = team.ref_tim_audit_ata || team.atas;
  atas.forEach((ata) => {
    anggota.push({ pn: ata.pn_ata, nama: ata.nama_ata, jabatan: ata.jabatan });
  });

  const getOptions = () => {
    const uniqueAnggota = [...new Set(anggota.map((item) => item.jabatan))];
    const anggotaJabatanOptions = uniqueAnggota.map((jabatan) => ({
      label: jabatan,
      value: jabatan,
    }));

    return [...anggotaJabatanOptions];
  };

  return getOptions();
};

export const mapAnggotaToDinasFormOptions = (anggota) => {
  const uniqueAnggota = [...new Set(anggota.map((item) => item.jabatan))];
  const anggotaJabatanOptions = uniqueAnggota.map((jabatan) => ({
    label: jabatan,
    value: jabatan,
  }));

  return [...anggotaJabatanOptions];
};

export const mapPembicaraDanPICToDinasFormOptions = (pembicara, penanggung_jawab) => {
  const uniquePembicaraJabatan = [...new Set(pembicara.map((item) => item.jabatan))];
  const uniquePICJabatan = [...new Set(penanggung_jawab.map((item) => item.jabatan))];
  const pembicaraJabatanOptions = uniquePembicaraJabatan.map((jabatan) => ({
    label: `Pembicara - ${jabatan}`,
    value: `pembicara,${jabatan}`,
  }));
  const PICJabatanOptions = uniquePICJabatan.map((jabatan) => ({
    label: `PIC - ${jabatan}`,
    value: `pic,${jabatan}`,
  }));

  return [...pembicaraJabatanOptions, ...PICJabatanOptions];
};

export const remapAPAPIC = (data = []) => {
  let dataTemp = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].mapa_uker_aktivitas.length !== 0) {
      dataTemp.push({
        key: i + 1,
        uker_id: data[i].id,
        level: 1,
        branch_kode: data[i].ref_auditee_branch_kode,
        uker: data[i].ref_auditee_branch_name,
        children: [],
      });

      for (let j = 0; j < data[i].mapa_uker_aktivitas.length; j++) {
        if (data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas.length !== 0) {
          dataTemp[i].children.push({
            key: i + 1 + "." + (j + 1),
            level: 2,
            id: data[i].mapa_uker_aktivitas[j].id,
            kode: data[i].mapa_uker_aktivitas[j].mtd_aktivitas_kode,
            uker: data[i].mapa_uker_aktivitas[j].mtd_aktivitas_name,
            auditor:
              data[i].mapa_uker_aktivitas[j].pn_pic_analisa +
              " " +
              data[i].mapa_uker_aktivitas[j].name_pic_analisa,
            nama_pic: data[i].mapa_uker_aktivitas[j].name_pic_analisa,
            pn: data[i].mapa_uker_aktivitas[j].pn_pic_analisa,
            status: data[i].mapa_uker_aktivitas[j].status,
            children: [],
          });
          for (
            let k = 0;
            k < data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas.length;
            k++
          ) {
            dataTemp[i].children[j].children.push({
              key: i + 1 + "." + (j + 1) + "." + (k + 1),
              level: 3,
              id: data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].id,
              kode: data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].sub_kode,
              uker: data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].sub_nama,
              auditor:
                data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].pn_pic_analisa +
                " " +
                data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].name_pic_analisa,
              nama_pic:
                data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].name_pic_analisa,
              pn: data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].pn_pic_analisa,
              status: data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].status,
            });
          }
        } else {
          dataTemp[i].children.push({
            key: i + 1 + "" + (j + 1),
            level: 2,
            id: data[i].mapa_uker_aktivitas[j].id,
            kode: data[i].mapa_uker_aktivitas[j].mtd_aktivitas_kode,
            uker: data[i].mapa_uker_aktivitas[j].mtd_aktivitas_name,
            auditor:
              data[i].mapa_uker_aktivitas[j].pn_pic_analisa +
              " " +
              data[i].mapa_uker_aktivitas[j].name_pic_analisa,
            nama_pic: data[i].mapa_uker_aktivitas[j].name_pic_analisa,
            pn: data[i].mapa_uker_aktivitas[j].pn_pic_analisa,
            status: data[i].mapa_uker_aktivitas[j].status,
            children: 0,
          });
        }
      }
    } else {
      dataTemp.push({
        key: i + 1,
        level: 1,
        uker_id: data[i].id,
        uker: data[i].ref_auditee_branch_name,
        children: 0,
      });
    }
  }
  return dataTemp;
};

export const remapSetPIC = (data = [], uker_id) => {
  let dataTemp = [];
  console.log(data);
  dataTemp.push({
    mapa_uker_id: uker_id,
    aktivitas: [],
  });
  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      dataTemp[0].aktivitas.push({
        mapa_uker_aktivitas_id: data[i].id,
        kode: data[i].mtd_aktivitas_kode,
        name: data[i].mtd_aktivitas_name,
        pn_pic: data[i].pn_pic_analisa,
        pn_name: data[i].name_pic_analisa,
        subaktivitas: [],
      });
      if (data[i].children) {
        for (let j = 0; j < data[i].children.length; j++) {
          dataTemp[0].aktivitas[i].subaktivitas.push({
            mapa_uker_pic_subaktivitas_id: data[i].children[j].id,
            kode: data[i].children[j].sub_kode,
            name: data[i].children[j].sub_nama,
            pn_pic: data[i].children[j].pn_pic_analisa,
            pn_name: data[i].children[j].name_pic_analisa,
          });
        }
      }
    }
  }
  return dataTemp[0];
};

export const remapAnalizingMapa = (data, pn, posisi) => {
  const isEditable = (dataPn, curPn, status) => {
    if (posisi === "kta") {
      if (status === "on KTA") return true;
      else return false;
    } else if (posisi === "ata") {
      if (status === "on ATA" && dataPn === curPn) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const canSendApproval = (dataPn, curPn, status) => {
    if (posisi === "kta") {
      if (status === "on KTA" && curPn !== dataPn) return true;
      else return false;
    } else if (posisi === "ata") {
      if (status === "on ATA" && dataPn === curPn) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  let dataTemp = [];
  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      dataTemp.push({
        key: "1." + i,
        mapa_uker_id: data[i].id,
        mapa_uker_name: data[i].ref_auditee_branch_name,
        branch_kode: data[i].ref_auditee_branch_kode,
        orgeh_kode: data[i].ref_auditee_orgeh_kode,
        name: data[i].ref_auditee_branch_name,
        jumlah_risk: 0,
        level: 1,
        children: [],
      });
      if (data[i].mapa_uker_aktivitas.length !== 0) {
        for (let j = 0; j < data[i].mapa_uker_aktivitas.length; j++) {
          if (data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas.length !== 0) {
            dataTemp[i].children.push({
              key: "1." + i + "." + j,
              mapa_uker_id: data[i].id,
              mapa_uker_name: data[i].ref_auditee_branch_name,
              mapa_uker_aktivitas_id: data[i].mapa_uker_aktivitas[j].id,
              kode: data[i].mapa_uker_aktivitas[j].mtd_aktivitas_kode,
              name: data[i].mapa_uker_aktivitas[j].mtd_aktivitas_name,
              pn_pic: data[i].mapa_uker_aktivitas[j].pn_pic_analisa,
              pn_name: data[i].mapa_uker_aktivitas[j].name_pic_analisa,
              uraian_analisa: data[i].mapa_uker_aktivitas[j].deskripsi,
              jumlah_risk: 0,
              persetujuan_kode: data[i].mapa_uker_aktivitas[j].stc_status_persetujuan_kode,
              persetujuan_name: data[i].mapa_uker_aktivitas[j].stc_status_persetujuan_name,
              analisa_aktivitas: isEditable(
                data[i].mapa_uker_aktivitas[j].pn_pic_analisa,
                pn,
                data[i].mapa_uker_aktivitas[j].stc_status_persetujuan_name
              ),
              approval: canSendApproval(
                data[i].mapa_uker_aktivitas[j].pn_pic_analisa,
                pn,
                data[i].mapa_uker_aktivitas[j].stc_status_persetujuan_name
              ),
              level: 2,
              children: [],
            });
            for (
              let k = 0;
              k < data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas.length;
              k++
            ) {
              dataTemp[i].children[j].children.push({
                key: "1." + i + "." + j + "." + k,
                mapa_uker_id: data[i].id,
                mapa_uker_name: data[i].ref_auditee_branch_name,
                mapa_uker_pic_subaktivitas_id:
                  data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].id,
                aktivitas_kode: data[i].mapa_uker_aktivitas[j].mtd_aktivitas_kode,
                kode: data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].sub_kode,
                name: data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].sub_nama,
                pn_pic: data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].pn_pic_analisa,
                pn_name:
                  data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].name_pic_analisa,
                jumlah_risk: 0,
                persetujuan_kode:
                  data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].status_kode,
                persetujuan_name:
                  data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].status_nama,
                analisa_risk: isEditable(
                  data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].pn_pic_analisa,
                  pn,
                  data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].status_nama
                ),
                approval: canSendApproval(
                  data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].pn_pic_analisa,
                  pn,
                  data[i].mapa_uker_aktivitas[j].mapa_uker_pic_subaktivitas[k].status_nama
                ),
                level: 3,
              });
            }
          } else {
            dataTemp[i].children.push({
              key: "1." + i + "." + j,
              mapa_uker_id: data[i].id,
              mapa_uker_name: data[i].ref_auditee_branch_name,
              mapa_uker_aktivitas_id: data[i].mapa_uker_aktivitas[j].id,
              kode: data[i].mapa_uker_aktivitas[j].mtd_aktivitas_kode,
              name: data[i].mapa_uker_aktivitas[j].mtd_aktivitas_name,
              pn_pic: data[i].mapa_uker_aktivitas[j].pn_pic_analisa,
              pn_name: data[i].mapa_uker_aktivitas[j].name_pic_analisa,
              uraian_analisa: data[i].mapa_uker_aktivitas[j].deskripsi,
              jumlah_risk: 0,
              persetujuan_kode: data[i].mapa_uker_aktivitas[j].stc_status_persetujuan_kode,
              persetujuan_name: data[i].mapa_uker_aktivitas[j].stc_status_persetujuan_name,
              analisa_aktivitas: isEditable(
                data[i].mapa_uker_aktivitas[j].pn_pic_analisa,
                pn,
                data[i].mapa_uker_aktivitas[j].stc_status_persetujuan_name
              ),
              analisa_risk: isEditable(
                data[i].mapa_uker_aktivitas[j].pn_pic_analisa,
                pn,
                data[i].mapa_uker_aktivitas[j].stc_status_persetujuan_name
              ),
              approval: canSendApproval(
                data[i].mapa_uker_aktivitas[j].pn_pic_analisa,
                pn,
                data[i].mapa_uker_aktivitas[j].stc_status_persetujuan_name
              ),
              level: 2,
            });
          }
        }
      }
    }
  }

  return dataTemp;
};

export const remapFetchAktivitas = (data) => {
  let dataTemp = [];

  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].mapa_uker_pic_subaktivitas.length !== 0) {
        dataTemp.push({
          key: i,
          id: data[i].id,
          mtd_aktivitas_kode: data[i].mtd_aktivitas_kode,
          mtd_aktivitas_name: data[i].mtd_aktivitas_name,
          pn_pic_analisa: data[i].pn_pic_analisa,
          name_pic_analisa: data[i].name_pic_analisa,
          aktivitas: data[i].mtd_aktivitas_kode + " - " + data[i].mtd_aktivitas_name,
          auditor: data[i].pn_pic_analisa + " - " + data[i].name_pic_analisa,
          children: [],
        });
        for (let j = 0; j < data[i].mapa_uker_pic_subaktivitas.length; j++) {
          dataTemp[i].children.push({
            key: i + "." + j,
            id: data[i].mapa_uker_pic_subaktivitas[j].id,
            sub_kode: data[i].mapa_uker_pic_subaktivitas[j].sub_kode,
            sub_nama: data[i].mapa_uker_pic_subaktivitas[j].sub_nama,
            pn_pic_analisa: data[i].mapa_uker_pic_subaktivitas[j].pn_pic_analisa,
            name_pic_analisa: data[i].mapa_uker_pic_subaktivitas[j].name_pic_analisa,
            status: data[i].mapa_uker_pic_subaktivitas[j].status,
            status_kode: data[i].mapa_uker_pic_subaktivitas[j].kode,
            aktivitas:
              data[i].mapa_uker_pic_subaktivitas[j].sub_kode +
              " - " +
              data[i].mapa_uker_pic_subaktivitas[j].sub_nama,
            auditor:
              data[i].mapa_uker_pic_subaktivitas[j].pn_pic_analisa +
              " - " +
              data[i].mapa_uker_pic_subaktivitas[j].name_pic_analisa,
          });
        }
      } else {
        dataTemp.push({
          key: i,
          id: data[i].id,
          mtd_aktivitas_kode: data[i].mtd_aktivitas_kode,
          mtd_aktivitas_name: data[i].mtd_aktivitas_name,
          pn_pic_analisa: data[i].pn_pic_analisa,
          name_pic_analisa: data[i].name_pic_analisa,
          aktivitas: data[i].mtd_aktivitas_kode + " - " + data[i].mtd_aktivitas_name,
          auditor: data[i].pn_pic_analisa + " - " + data[i].name_pic_analisa,
        });
      }
    }
  }

  return dataTemp;
};

export const remapSubAktivitas = (data) => {
  let dataTemp = [];
  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      dataTemp.push({
        key: data[i].id,
        id: data[i].id,
        sub_kode: data[i].mtd_sub_aktivitas_kode,
        sub_name: data[i].mtd_sub_aktivitas_name,
        pn_pic_analisa: data[i].pn_pic_analisa,
        name_pic_analisa: data[i].name_pic_analisa,
        status: data[i].stc_status_persetujuan_name,
        status_kode: data[i].stc_status_persetujuan_kode,
        aktivitas: data[i].mtd_sub_aktivitas_kode + " - " + data[i].mtd_sub_aktivitas_name,
        auditor: data[i].pn_pic_analisa + " - " + data[i].name_pic_analisa,
      });
    }
  }
  return dataTemp;
};

export const remapJadwalAuditMapa = (data) => {
  let dataTemp = [
    {
      keterangan: "Penyusunan",
      key: 1,
      plan_start: data.penyusunan_mapa_plan_start,
      plan_end: data.penyusunan_mapa_plan_end,
      plan_start_key: "penyusunan_mapa_plan_start",
      plan_end_key: "penyusunan_mapa_plan_end",
      real_start: data.penyusunan_mapa_real_start,
      real_end: data.penyusunan_mapa_real_end,
    },
    {
      keterangan: "Entrance Meeting",
      key: 2,
      plan_start: data.entrance_meeting_plan_start,
      plan_end: data.entrance_meeting_plan_end,
      plan_start_key: "entrance_meeting_plan_start",
      plan_end_key: "entrance_meeting_plan_end",
      real_start: data.entrance_meeting_real_start,
      real_end: data.entrance_meeting_real_end,
    },
    {
      keterangan: "Pelaksanaan Audit",
      key: 3,
      plan_start: data.pelaksanaan_audit_plan_start,
      plan_end: data.pelaksanaan_audit_plan_end,
      plan_start_key: "pelaksanaan_audit_plan_start",
      plan_end_key: "pelaksanaan_audit_plan_end",
      real_start: data.pelaksanaan_audit_real_start,
      real_end: data.pelaksanaan_audit_real_end,
    },
    {
      keterangan: "Exit Meeting",
      key: 4,
      plan_start: data.exit_meeting_plan_start,
      plan_end: data.exit_meeting_plan_end,
      plan_start_key: "exit_meeting_plan_start",
      plan_end_key: "exit_meeting_plan_end",
      real_start: data.exit_meeting_real_start,
      real_end: data.exit_meeting_real_end,
    },
    {
      keterangan: "Penyusunan LHA",
      key: 5,
      plan_start: data.Penyusunan_LHA_plan_start,
      plan_end: data.Penyusunan_LHA_plan_end,
      plan_start_key: "Penyusunan_LHA_plan_start",
      plan_end_key: "Penyusunan_LHA_plan_end",
      real_start: data.Penyusunan_LHA_real_start,
      real_end: data.Penyusunan_LHA_real_end,
    },
    {
      keterangan: "Wrapup Meeting",
      key: 6,
      plan_start: data.Wrapup_Meeting_plan_start,
      plan_end: data.Wrapup_Meeting_plan_end,
      plan_start_key: "Wrapup_Meeting_plan_start",
      plan_end_key: "Wrapup_Meeting_plan_end",
      real_start: data.Wrapup_Meeting_real_start,
      real_end: data.Wrapup_Meeting_real_end,
    },
  ];

  return dataTemp;
};

export const remapMapapenugasan = (data = []) => {
  let dataTemp = [];

  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].mcr_aktivitas.length !== 0) {
        dataTemp.push({
          key: `${i}.${data[i].id}`,
          ukerRisk: data[i].ref_auditee_branch_name,
          ref_auditee_branch_kode: data[i].ref_auditee_branch_kode,
          type: "uker",
          children: [],
        });
        for (let j = 0; j < data[i].mcr_aktivitas.length; j++) {
          if (data[i].mcr_aktivitas[j].mcr_subaktivitas.length !== 0) {
            dataTemp[i].children.push({
              key: `${i}.${j}.${data[i].id}`,
              ukerRisk: data[i].mcr_aktivitas[j].ref_aktivitas_name,
              type: "aktivitas",
              children: [],
            });
            for (let k = 0; k < data[i].mcr_aktivitas[j].mcr_subaktivitas.length; k++) {
              if (data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor.length) {
                dataTemp[i].children[j].children.push({
                  key: `${i}.${j}.${k}.${data[i].id}`,
                  ukerRisk: data[i].mcr_aktivitas[j].mcr_subaktivitas[k].ref_sub_aktivitas_name,
                  type: "subaktivitas",
                  children: [],
                });
                for (
                  let l = 0;
                  l < data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor.length;
                  l++
                ) {
                  if (
                    data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[l].mcr_risk_issue
                      .length !== 0
                  ) {
                    dataTemp[i].children[j].children[k].children.push({
                      key: `${i}.${j}.${k}.${l}.${data[i].id}`,
                      ukerRisk:
                        data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[l]
                          .ref_sub_major_name,
                      type: "submajor",
                      children: [],
                    });
                    for (
                      let m = 0;
                      m <
                      data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[l].mcr_risk_issue
                        .length;
                      m++
                    ) {
                      if (
                        data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[l].mcr_risk_issue[
                          m
                        ].penugasan_mapa_sample.length
                      ) {
                        dataTemp[i].children[j].children[k].children[l].children.push({
                          key: `${i}.${j}.${k}.${l}.${m}.${data[i].id}`,
                          ukerRisk:
                            data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[l]
                              .mcr_risk_issue[m].ref_risk_issue_kode +
                            " - " +
                            data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[l]
                              .mcr_risk_issue[m].ref_risk_issue_name,
                          type: "risk",
                          mcr_id:
                            data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[l]
                              .mcr_risk_issue[m].mcr_id,
                          sample_jumlah_sample:
                            data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[l]
                              .mcr_risk_issue[m].sample_jumlah_sample,
                          children: [],
                        });
                        for (
                          let n = 0;
                          n <
                          data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[l]
                            .mcr_risk_issue[m].penugasan_mapa_sample.length;
                          n++
                        ) {
                          dataTemp[i].children[j].children[k].children[l].children[m].children.push(
                            {
                              key: `${i}.${j}.${k}.${l}.${m}.${n}.${data[i].id}`,
                              ukerRisk:
                                data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[l]
                                  .mcr_risk_issue[m].penugasan_mapa_sample[n].pn_auditor +
                                " - " +
                                data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[l]
                                  .mcr_risk_issue[m].penugasan_mapa_sample[n].name_auditor,
                              sample_jumlah_sample:
                                data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[l]
                                  .mcr_risk_issue[m].penugasan_mapa_sample[n].sample_jumlah_sample,
                              sample_percentage:
                                data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[l]
                                  .mcr_risk_issue[m].penugasan_mapa_sample[n].sample_percentage,
                              type: "auditor",
                            }
                          );
                        }
                      } else {
                        dataTemp[i].children[j].children[k].children[l].children.push({
                          key: `${i}.${j}.${k}.${l}.${m}.${data[i].id}`,
                          ukerRisk:
                            data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[l]
                              .mcr_risk_issue[m].ref_risk_issue_kode +
                            " - " +
                            data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[l]
                              .mcr_risk_issue[m].ref_risk_issue_name,
                          type: "risk",
                          mcr_id:
                            data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[l]
                              .mcr_risk_issue[m].mcr_id,
                          sample_jumlah_sample:
                            data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[l]
                              .mcr_risk_issue[m].sample_jumlah_sample,
                        });
                      }
                    }
                  } else {
                    dataTemp[i].children[j].children[k].children.push({
                      key: `${i}.${j}.${k}.${l}.${data[i].id}`,
                      ukerRisk:
                        data[i].mcr_aktivitas[j].mcr_subaktivitas[k].mcr_submajor[k]
                          .ref_sub_major_name,
                      type: "submajor",
                    });
                  }
                }
              } else {
                dataTemp[i].children[j].children.push({
                  key: `${i}.${j}.${k}.${data[i].id}`,
                  ukerRisk: data[i].mcr_aktivitas[j].mcr_subaktivitas[k].ref_sub_aktivitas_name,
                  type: "subaktivitas",
                });
              }
            }
          } else {
            dataTemp[i].children.push({
              key: `${i}.${j}.${data[i].id}`,
              ukerRisk: data[i].mcr_aktivitas[j].ref_aktivitas_name,
              type: "aktivitas",
            });
          }
        }
      } else {
        dataTemp.push({
          key: `${i}.${data[i].id}`,
          ukerRisk: data[i].ref_auditee_branch_name,
          ref_auditee_branch_kode: data[i].ref_auditee_branch_kode,
          type: "uker",
        });
      }
    }
  }

  return dataTemp;
};
