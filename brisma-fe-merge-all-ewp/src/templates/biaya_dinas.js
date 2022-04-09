import { numberWithCommas } from "../utils/helper";

export const prepareData = (data) => {
  const rows = data.map((d, idx) => {
    const length = Object.keys(d.Jabatan).length;

    const row = Object.keys(d.Jabatan).map((k, i) => {
      const currJabatan = d.Jabatan[k];
      return `
        <tr>
            ${
              i === 0 &&
              `
                <td rowspan="${length}">
                  <p style="text-align:center;">
                      ${idx + 1}
                  </p>
                </td>
                <td rowspan="${length}">
                  <p style="text-align:center;">
                      ${d.nama_kegiatan}
                  </p>
                </td>
              `
            }
            <td>
              <p style="text-align:center;">
                  ${k}
              </p>
            </td>
            <td>
              <p style="text-align:center;">
                  ${currJabatan.jumlah}
              </p>
            </td>
            ${
              i === 0 &&
              `
              <td rowspan="${length}">
                <p style="text-align:center;">
                    ${d.tempat_kegiatan}
                </p>
              </td>
              <td rowspan="${length}">
                <p style="text-align:center;">
                    ${d.bulan}
                </p>
              </td>
              `
            }
            <td>
              <p style="text-align:center;">
                  ${currJabatan.lama_kegiatan} hari
              </p>
            </td>
            <td>
              <p style="text-align:center;">
                  ${numberWithCommas(currJabatan.biaya_tiket)}
              </p>
            </td>
            <td>
              <p style="text-align:center;">
                  ${numberWithCommas(currJabatan.biaya_transport)}
              </p>
            </td>
            <td>
              <p style="text-align:center;">
                  ${numberWithCommas(currJabatan.biaya_perjalanan)}
              </p>
            </td>
            <td>
              <p style="text-align:center;">
                  ${numberWithCommas(currJabatan.biaya_akomodasi)}
              </p>
            </td>
            <td>
              <p style="text-align:center;">
                  ${numberWithCommas(currJabatan.total_biaya)}
              </p>
            </td>
        </tr>
      `;
    });

    return row;
  });

  const totalBiayaPerjalananDinas = data.reduce((prev, curr) => {
    const totalSatuKegiatan = Object.keys(curr.Jabatan).reduce(
      (p, c) => (p += Number(curr.Jabatan[c].total_biaya)),
      0
    );
    return (prev += totalSatuKegiatan);
  }, 0);

  rows.push(`
    <tr>
        <td colspan="11">
            Total Biaya Perjalanan Dinas
        </td>
        <td>
            <p style="text-align:center;">${numberWithCommas(totalBiayaPerjalananDinas)}</p>
        </td>
    </tr>
  `);
  return rows.join("");
};

export const biaya_dinas = (rows) => `
<p style="text-align:center;">
    <span style="color:rgb(0,0,0);"><strong>Biaya Perjalanan Dinas Jabatan</strong></span>
</p>
<figure class="table">
    <table>
        <thead>
            <tr>
                <th rowspan="2">
                    <p style="text-align:center;">
                        No
                    </p>
                </th>
                <th rowspan="2">
                    <p style="text-align:center;">
                        Kegiatan
                    </p>
                </th>
                <th colspan="2">
                    <p style="text-align:center;">
                        Peserta
                    </p>
                </th>
                <th rowspan="2">
                    <p style="text-align:center;">
                        Tempat/Kegiatan Auditee
                    </p>
                </th>
                <th rowspan="2">
                    <p style="text-align:center;">
                        Bulan Kegiatan
                    </p>
                </th>
                <th rowspan="2">
                    <p style="text-align:center;">
                        Lama Kegiatan
                    </p>
                </th>
                <th colspan="5">
                    <p style="text-align:center;">
                        Biaya Perjalanan Dinas Jabatan
                    </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p style="text-align:center;">
                        Jabatan/Golongan/Pangkat
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Jumlah Orang
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Tiket PP
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Transport Lokal
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Uang Harian
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Biaya Akomodasi
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Total Biaya
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
            ${rows}
        </tbody>
    </table>
</figure>`;

export const exampleData = [
  {
    tempat_kegiatan: "RESIDENT AUDITOR KANCA BONDOWOSO",
    nama_kegiatan: "Aiw 2",
    bulan: 1,
    Jabatan: {
      Auditor: {
        jumlah: 4,
        lama_kegiatan: null,
        biaya_akomodasi: 400,
        biaya_tiket: 400,
        biaya_transport: 400,
        biaya_perjalanan: 400,
        total_biaya: 1600,
      },
      "Kepala Auditor": {
        jumlah: 1,
        lama_kegiatan: null,
        biaya_akomodasi: 500,
        biaya_tiket: 500,
        biaya_transport: 500,
        biaya_perjalanan: 500,
        total_biaya: 2000,
      },
    },
  },
  {
    tempat_kegiatan: "RESIDENT AUDITOR KANCA KEDIRI",
    nama_kegiatan: "KEGIATAN LAIN",
    bulan: 12,
    Jabatan: {
      Auditor: {
        jumlah: 2,
        lama_kegiatan: 8,
        biaya_akomodasi: 900,
        biaya_tiket: 900,
        biaya_transport: 900,
        biaya_perjalanan: 900,
        total_biaya: 3600,
      },
    },
  },
];
