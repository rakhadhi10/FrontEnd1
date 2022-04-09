import moment from "moment";
import { numberWithCommas } from "../../utils/helper";

const prepareData = (data) => {
  const latar_belakang = data.find((d) => d.part === "latar_belakang");
  const sumber_informasi = data.find((d) => d.part === "sumber_informasi");
  const tim_audit = data.filter((d) => d.part === "tim_audit") || [];
  const jadwal_audit = data.filter((d) => d.part === "jadwal_audit") || [];
  const jadwal_sbp = data.filter((d) => d.part === "jadwal_sbp") || [];
  const kegiatan_lain = data.filter((d) => d.part === "kegiatan_lain") || [];
  return [
    prepareLatarBelakang(latar_belakang),
    prepareSumberInformasi(sumber_informasi),
    prepareTimAudit(tim_audit),
    prepareJadwalAudit(jadwal_audit),
    prepareJadwalConsulting(jadwal_sbp),
    prepareKegiatanLain(kegiatan_lain),
  ].join("");
};

const prepareLatarBelakang = (lb) => {
  if (!lb) return null;
  return `
        <tr>
            <td>
                <p style="text-align:center;">
                    Latar Belakang
                </p>
            </td>
            <td>
                <p style="text-align:center;">
                    Tetap
                </p>
            </td>
            <td style="padding: 10px;">
                <p>
                    Tanggal perubahan: ${moment(lb.updatedAt).format(
                      "DD MMMM YYYY HH:mm",
                    )}
                </p>
                <p>
                    Maker: ${lb.sesudah.pic ? lb.sesudah.pic.nama : ""}
                </p>
            </td>
            <td style="padding: 10px;">
                <p style="text-align:center; padding: 10px;">
                    ${lb.alasan_adendum}
                </p>
            </td>
        </tr>
    `;
};

const prepareSumberInformasi = (si) => {
  if (!si) return null;
  return `
        <tr>
            <td>
                <p style="text-align:center;">
                    Sumber Informasi
                </p>
            </td>
            <td>
                <p style="text-align:center;">
                    Tetap
                </p>
            </td>
            <td style="padding: 10px;">
                <p>
                    Tanggal perubahan: ${moment(si.updatedAt).format(
                      "DD MMMM YYYY HH:mm",
                    )}
                </p>
                <p>
                    Maker: ${si.sesudah.pic ? si.sesudah.pic.nama : ""}
                </p>
            </td>
            <td style="padding: 10px;">
                <p style="text-align:center; padding: 10px;">
                    ${si.alasan_adendum}
                </p>
            </td>
        </tr>
    `;
};

const prepareTimAudit = (tim) => {
  if (!tim) return null;
  return tim
    .map((t) => {
      return `
        <tr>
            <td>
                <p style="text-align:center;">
                    Tim Audit
                </p>
            </td>
            <td style="padding: 10px;">
                ${
                  t.sebelum
                    ? `<p>
                        Nama Tim: ${t.sebelum.name}
                    </p>
                    <p>
                        MA: ${t.sebelum.nama_ma}
                    </p>
                    <p>
                       KTA: ${t.sebelum.nama_kta}
                    </p>
                    <p>ATA:</p>
                    ${t.sebelum.atas.map((a) => `<p>${a.name}</p>`).join("")}`
                    : "-"
                }
            </td>
            <td style="padding: 10px;">
                ${
                  t.sesudah
                    ? `<p>
                        Nama Tim: ${t.sesudah.name}
                    </p>
                    <p>
                        MA: ${t.sesudah.pn_ma.nama}
                    </p>
                    <p>
                       KTA: ${t.sesudah.pn_kta.nama}
                    </p>
                    <p>ATA:</p>
                    ${t.sesudah.atas.map((a) => `<p>- ${a.nama}</p>`).join("")}`
                    : "-"
                }
            </td>
            <td>
                <p style="text-align:center; padding: 10px;">
                    ${t.alasan_adendum}
                </p>
            </td>
        </tr>
    `;
    })
    .join("");
};

const prepareJadwalAudit = (jadwal) => {
  if (!jadwal) return null;
  return jadwal
    .map((c) => {
      return `
        <tr>
            <td>
                <p style="text-align:center;">
                    Jadwal Audit
                </p>
            </td>
            <td style="padding: 10px;">
               ${
                 c.sebelum
                   ? `
                    <p>
                        Nama Kegiatan: ${c.sebelum.jadwal.name_kegiatan_audit}
                    </p>
                    <p>
                        Tipe Audit: ${
                          c.sebelum.jadwal.ref_mtd_stc_audit_type_kode
                            .audit_type
                        }
                    </p>
                    <p>
                        Nama Tim Audit: ${c.sebelum.tim_name}
                    </p>
                    <p>
                        Total Anggaran: Rp. ${numberWithCommas(
                          c.sebelum.jadwal.total_anggaran,
                        )}
                    </p>
                    <p>
                        Periode Kegiatan: ${moment(
                          c.sebelum.jadwal.pelaksanaan_start,
                        ).format("DD MMMM YYYY")} sd ${moment(
                       c.sebelum.jadwal.pelaksanaan_end,
                     ).format("DD MMMM YYYY")}
                    </p>
                    <p>Uker: </p>
                    ${c.sebelum.auditeeOrObjek
                      .map((a) => `<p>- ${a.branch_name}</p>`)
                      .join("")}
                    <p>
                        Nama Maker: ${c.sebelum.jadwal.pic_jadwal_audit.nama}
                    </p>
                    `
                   : "-"
               }
            </td>
            <td style="padding: 10px;">
                ${
                  c.sesudah
                    ? `
                    <p>
                        Nama Kegiatan: ${c.sesudah.name_kegiatan_audit}
                    </p>
                    <p>
                        Tipe Audit: ${c.sesudah.audit_type.audit_type}
                    </p>
                    <p>
                        Nama Tim Audit: ${c.sesudah.tim[0].tim_name}
                    </p>
                    <p>
                        Total Anggaran: Rp. ${numberWithCommas(
                          c.sesudah.total_anggaran,
                        )}
                    </p>
                    <p>
                        Periode Kegiatan: ${moment(
                          c.sesudah.pelaksanaan_start,
                        ).format("DD MMMM YYYY")} sd ${moment(
                        c.sesudah.pelaksanaan_end,
                      ).format("DD MMMM YYYY")}
                    </p>
                    <p>Uker: </p>
                    ${c.sesudah.uker
                      .map((a) => `<p>- ${a.branch_name}</p>`)
                      .join("")}
                    <p>
                        Nama Maker: ${c.sesudah.pic_jadwal_audit.nama}
                    </p>
                    `
                    : "-"
                }
            </td>
            <td>
                <p style="text-align:center; padding: 10px;">
                    ${c.alasan_adendum}
                </p>
            </td>
        </tr>
    `;
    })
    .join("");
};

const prepareJadwalConsulting = (consulting) => {
  if (!consulting) return null;
  return consulting
    .map((c) => {
      return `
        <tr>
            <td>
                <p style="text-align:center;">
                    Jadwal Consulting
                </p>
            </td>
            <td style="padding: 10px;">
               ${
                 c.sebelum
                   ? `
                    <p>
                        Nama Kegiatan: ${c.sebelum.jadwal.sbp_name}
                    </p>
                    <p>
                        Uker: ${c.sebelum.jadwal.branch_name}
                    </p>
                    <p>Nama Pembicara: </p>
                    ${c.sebelum.pembicara
                      .map((a) => `<p>- ${a.nama_pembicara}</p>`)
                      .join("")}
                    <p>Nama PIC: </p>
                    ${c.sebelum.penanggung_jawab
                      .map((a) => `<p>- ${a.nama_penanggung_jawab}</p>`)
                      .join("")}
                    <p>
                        Total Anggaran: Rp. ${numberWithCommas(
                          c.sebelum.jadwal.total_anggaran,
                        )}
                    </p>
                    <p>
                        Periode Kegiatan: ${moment(
                          c.sebelum.jadwal.pelaksanaan_start,
                        ).format("DD MMMM YYYY")} sd ${moment(
                       c.sebelum.jadwal.pelaksanaan_end,
                     ).format("DD MMMM YYYY")}
                    </p>
                    <p>
                        Nama Maker: ${
                          c.sebelum.jadwal.pic_maker_jadwal_sbp.nama
                        }
                    </p>
                    `
                   : "-"
               }
            </td>
            <td style="padding: 10px;">
                ${
                  c.sesudah
                    ? `
                    <p>
                        Nama Kegiatan: ${c.sesudah.name}
                    </p>
                    <p>
                        Uker: ${c.sesudah.branch_name}
                    </p>
                    <p>Nama Pembicara: </p>
                    ${c.sesudah.pembicara
                      .map((a) => `<p>- ${a.nama}</p>`)
                      .join("")}
                    <p>Nama PIC: </p>
                    ${c.sesudah.penanggung_jawab
                      .map((a) => `<p>- ${a.nama}</p>`)
                      .join("")}
                    <p>
                        Total Anggaran: Rp. ${numberWithCommas(
                          c.sesudah.total_anggaran,
                        )}
                    </p>
                    <p>
                        Periode Kegiatan: ${moment(
                          c.sesudah.pelaksanaan_start,
                        ).format("DD MMMM YYYY")} sd ${moment(
                        c.sesudah.pelaksanaan_end,
                      ).format("DD MMMM YYYY")}
                    </p>
                    <p>
                        Nama Maker: ${c.sesudah.pic_maker_jadwal_sbp.nama}
                    </p>
                    `
                    : "-"
                }
            </td>
            <td>
                <p style="text-align:center; padding: 10px;">
                    ${c.alasan_adendum}
                </p>
            </td>
        </tr>
    `;
    })
    .join("");
};

const prepareKegiatanLain = (lain) => {
  if (!lain) return null;
  return lain
    .map((c) => {
      return `
        <tr>
            <td>
                <p style="text-align:center;">
                    Kegiatan Lain
                </p>
            </td>
            <td style="padding: 10px;">
               ${
                 c.sebelum
                   ? `
                    <p>
                        Nama Kegiatan: ${c.sebelum.kegiatan_lain.nama}
                    </p>
                    <p>
                        Uker: ${c.sebelum.branch_name}
                    </p>
                    <p>Nama Anggota: </p>
                    ${c.sebelum.anggota_kegiatan
                      .map((a) => `<p>- ${a.nama_anggota}</p>`)
                      .join("")}
                    <p>
                        Total Anggaran: Rp. ${numberWithCommas(
                          c.sebelum.kegiatan_lain.total_anggaran,
                        )}
                    </p>
                    <p>
                        Periode Kegiatan: ${moment(
                          c.sebelum.kegiatan_lain.pelaksanaan_start,
                        ).format("DD MMMM YYYY")} sd ${moment(
                       c.sebelum.kegiatan_lain.pelaksanaan_end,
                     ).format("DD MMMM YYYY")}
                    </p>
                    <p>
                        Nama Maker: ${
                          c.sebelum.kegiatan_lain.pic_maker_kegiatan_lain.nama
                        }
                    </p>
                    `
                   : "-"
               }
            </td>
            <td style="padding: 10px;">
                ${
                  c.sesudah
                    ? `
                    <p>
                        Nama Kegiatan: ${c.sesudah.nama}
                    </p>
                    <p>
                        Uker: ${c.sesudah.branch_name}
                    </p>
                    <p>Nama Anggota: </p>
                    ${c.sesudah.anggota
                      .map((a) => `<p>- ${a.nama}</p>`)
                      .join("")}
                    <p>
                        Total Anggaran: Rp. ${numberWithCommas(
                          c.sesudah.total_anggaran,
                        )}
                    </p>
                    <p>
                        Periode Kegiatan: ${moment(
                          c.sesudah.pelaksanaan_start,
                        ).format("DD MMMM YYYY")} sd ${moment(
                        c.sesudah.pelaksanaan_end,
                      ).format("DD MMMM YYYY")}
                    </p>
                    <p>
                        Nama Maker: ${c.sesudah.pic_maker_kegiatan_lain.nama}
                    </p>
                    `
                    : "-"
                }
            </td>
            <td>
                <p style="text-align:center; padding: 10px;">
                    ${c.alasan_adendum}
                </p>
            </td>
        </tr>
    `;
    })
    .join("");
};

const addendum_table = (rows) => `
<figure class="table">
    <table style="width: 100%; overflow: hidden;">
        <thead>
            <tr>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Part
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Sebelum
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Sesudah
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Alasan
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
            ${rows}
        </tbody>
    </table>
</figure>`;

export const getAddendumAIWTable = (data) => addendum_table(prepareData(data));
