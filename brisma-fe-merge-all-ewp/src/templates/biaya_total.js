import { numberWithCommas } from "../utils/helper";

export const prepareData = (tahun, data) => {
  const total_dinas = data.allAnggaranDinas;
  const pemeliharaan = data.allAnggaranKegiatan.kategori.find(
    (k) => k.nama === "Pemeliharaan",
  );
  const kendaraan = pemeliharaan.sub_kategori.find(
    (k) => k.nama === "Kendaraan",
  ).amount;
  const mesin = pemeliharaan.sub_kategori.find(
    (k) => k.nama === "Mesin",
  ).amount;
  const inventaris = pemeliharaan.sub_kategori.find(
    (k) => k.nama === "Inventaris",
  ).amount;
  const total_pemeliharaan = kendaraan + mesin + inventaris;

  const barangJasa = data.allAnggaranKegiatan.kategori.find(
    (k) => k.nama === "Barang & Jasa",
  );
  const porto = barangJasa.sub_kategori.find((k) => k.nama === "Porto").amount;
  const percetakan = barangJasa.sub_kategori.find(
    (k) => k.nama === "Percetakan",
  ).amount;
  const atk = barangJasa.sub_kategori.find((k) => k.nama === "ATK").amount;
  const komputer = barangJasa.sub_kategori.find(
    (k) => k.nama === "Supply Komputer",
  ).amount;
  const total_barang_jasa = porto + percetakan + atk + komputer;

  const umumLainnya = data.allAnggaranKegiatan.kategori.find(
    (k) => k.nama === "Umum lainnya",
  );
  const representasi = umumLainnya.sub_kategori.find(
    (k) => k.nama === "Representasi",
  ).amount;
  const rapat = umumLainnya.sub_kategori.find((k) => k.nama === "Rapat").amount;
  const total_umum_lainnya = representasi + rapat;

  const total =
    total_barang_jasa + total_pemeliharaan + total_umum_lainnya + total_dinas;

  return {
    tahun,
    total_dinas,
    total_pemeliharaan,
    kendaraan,
    mesin,
    inventaris,
    total_barang_jasa,
    porto,
    percetakan,
    atk,
    komputer,
    total_umum_lainnya,
    representasi,
    rapat,
    total,
  };
};

export const biaya_total = ({
  tahun,
  total_pemeliharaan,
  kendaraan,
  mesin,
  inventaris,
  total_dinas,
  total_barang_jasa,
  porto,
  percetakan,
  atk,
  komputer,
  total_umum_lainnya,
  representasi,
  rapat,
  total,
}) => `
<p>
    <span style="color:rgb(0,0,0);">Rencana anggaran dalam rangka pelaksanaan audit untuk tahun ${tahun}, adalah sbb:</span>
</p>
<ol>
    <li>
        1. Biaya Pemeliharaan <span style="color:rgb(0,0,0);">………………………………………………………………………. Rp ${numberWithCommas(
          total_pemeliharaan,
        )}</span>
    </li>
</ol>
<p style="margin-left:40px;">
    a. Pemeliharaan dan Perbaikan AT kendaraan ....<span style="color:rgb(0,0,0);">…</span>... Rp ${numberWithCommas(
      kendaraan,
    )}
</p>
<p style="margin-left:40px;">
    b. Pemeliharaan dan Perbaikan AT mesin-mesin ..<span style="color:rgb(0,0,0);">…</span> Rp ${numberWithCommas(
      mesin,
    )}
</p>
<p style="margin-left:40px;">
    c. Pemeliharaan dan Perbaikan AT Inventaris .....<span style="color:rgb(0,0,0);">……</span> Rp ${numberWithCommas(
      inventaris,
    )}
</p>
<p>
    2. Biaya Perjalanan Dinas Jabatan ....................................................<span style="color:rgb(0,0,0);">………</span>...... Rp ${numberWithCommas(
      total_dinas,
    )}
</p>
<p>
    <span style="color:rgb(0,0,0);">3. Biaya Barang dan Jasa Pihak ke 3 ………………………………………………… Rp ${numberWithCommas(
      total_barang_jasa,
    )}</span>
</p>
<p style="margin-left:40px;">
    a. Biaya Porto .......................................................<span style="color:rgb(0,0,0);">……………</span> Rp ${numberWithCommas(
      porto,
    )}
</p>
<p style="margin-left:40px;">
    b. Biaya Percetakan ..............................................<span style="color:rgb(0,0,0);">…………</span>. Rp ${numberWithCommas(
      percetakan,
    )}
</p>
<p style="margin-left:40px;">
    c. Biaya Alat Tulis Kantor (ATK) .........................<span style="color:rgb(0,0,0);">……</span>.<span style="color:rgb(0,0,0);">…</span>.. Rp ${numberWithCommas(
      atk,
    )}
</p>
<p style="margin-left:40px;">
    d. Biaya Supplies Komputer ................................<span style="color:rgb(0,0,0);">…………</span> Rp ${numberWithCommas(
      komputer,
    )}
</p>
<p>
    <span style="color:rgb(0,0,0);">4. Biaya Umum Lainnya .......................................................……………………….. Rp ${numberWithCommas(
      total_umum_lainnya,
    )}</span>
</p>
<p style="margin-left:40px;">
    <span style="color:rgb(0,0,0);">a. Biaya Rapat .....................................................………….... Rp ${numberWithCommas(
      rapat,
    )}</span>
</p>
<p style="margin-left:40px;">
    <span style="color:rgb(0,0,0);">b. Biaya Representasi ........................................................ Rp ${numberWithCommas(
      representasi,
    )}</span>
</p>
<p style="margin-left:40px;">
    &nbsp;
</p>
<p>
    <span style="color:rgb(0,0,0);"><strong>Total Biaya …………………………………………………………………… Rp ${numberWithCommas(
      total,
    )}</strong></span>
</p>
<p>
    <span class="text-small" style="color:rgb(0,0,0);">(Rincian Biaya Perjalanan Dinas Jabatan terlampir)</span>
</p>
`;

export const exampleData = {
  allAnggaranDinas: 1000,
  allAnggaranKegiatan: {
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: 1,
          },
          {
            nama: "Mesin",
            amount: 2,
          },
          {
            nama: "Inventaris",
            amount: 3,
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: 3,
          },
          {
            nama: "Percetakan",
            amount: 4,
          },
          {
            nama: "ATK",
            amount: 5,
          },
          {
            nama: "Supply Komputer",
            amount: 6,
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: 7,
          },
          {
            nama: "Rapat",
            amount: 8,
          },
        ],
      },
    ],
  },
};
