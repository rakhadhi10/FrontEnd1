import { numberWithCommas } from "../utils/helper";

export const prepareData = (data) => {
  const rows = data.map((d, idx) => {
    return `
      <tr>
          <td><p style="text-align:center;">${idx + 1}</p></td>
          ${d.kategori
            .map((k) =>
              k.sub_kategori
                .map(
                  (s) =>
                    `<td>
                      <p style="text-align:center;">
                        ${numberWithCommas(s.amount[0].amount)}
                      </p>
                    </td>`,
                )
                .join(""),
            )
            .join("")}
      </tr>`;
  });
  // Push total
  rows.push(
    `
      <tr style="">
          <td><p style="text-align:center; font-size: bold;">Total</p></td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += d.kategori[0].sub_kategori[0].amount[0].amount),
                0,
              ),
            )}
            </p>
          </td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += d.kategori[0].sub_kategori[1].amount[0].amount),
                0,
              ),
            )}
            </p>
          </td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += d.kategori[0].sub_kategori[2].amount[0].amount),
                0,
              ),
            )}
            </p>
          </td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += d.kategori[1].sub_kategori[0].amount[0].amount),
                0,
              ),
            )}
            </p>
          </td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += d.kategori[1].sub_kategori[1].amount[0].amount),
                0,
              ),
            )}
            </p>
          </td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += d.kategori[1].sub_kategori[2].amount[0].amount),
                0,
              ),
            )}
            </p>
          </td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += d.kategori[1].sub_kategori[3].amount[0].amount),
                0,
              ),
            )}
            </p>
          </td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += d.kategori[2].sub_kategori[0].amount[0].amount),
                0,
              ),
            )}
            </p>
          </td>
          <td>
            <p style="text-align:center;">
            ${numberWithCommas(
              data.reduce(
                (prev, d) =>
                  (prev += d.kategori[2].sub_kategori[1].amount[0].amount),
                0,
              ),
            )}
            </p>
          </td>
      </tr>
    `,
  );
  return rows.join("");
};

export const biaya_lainnya = (rows) => `
<p style="text-align:center;">
    <span style="color:rgb(0,0,0);"><strong>Biaya Lainnya</strong></span>
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
                <th colspan="3">
                    <p style="text-align:center;">
                        Biaya Pemeliharaan &amp; Perbaikan AT
                    </p>
                </th>
                <th colspan="4">
                    <p style="text-align:center;">
                        Biaya Barang &amp; Jasa Pihak Ke III
                    </p>
                </th>
                <th colspan="2">
                    <p style="text-align:center;">
                        Biaya Umum Lainnya
                    </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p style="text-align:center;">
                        Kendaraan
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Mesin
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Inventaris
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Porto
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Percetakan
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        ATK
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Supplies Komputer
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Representasi
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Rapat
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
    id: 1,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 7,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 8,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 9,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 10,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 1,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 7,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 1,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 100000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 7,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 8,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 9,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 22,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 23,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 41,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 42,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 43,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 44,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 45,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 46,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 1000000,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 47,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 500000,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 48,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 300000,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 49,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 50000,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 300000,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 1000000,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 50,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 51,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 52,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 53,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 55,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 67,
    kategori: [
      {
        nama: "Pemeliharaan",
        sub_kategori: [
          {
            nama: "Kendaraan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Mesin",
            amount: [
              {
                amount: 200000,
              },
            ],
          },
          {
            nama: "Inventaris",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Barang & Jasa",
        sub_kategori: [
          {
            nama: "Porto",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Percetakan",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "ATK",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Supply Komputer",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
      {
        nama: "Umum lainnya",
        sub_kategori: [
          {
            nama: "Representasi",
            amount: [
              {
                amount: 0,
              },
            ],
          },
          {
            nama: "Rapat",
            amount: [
              {
                amount: 0,
              },
            ],
          },
        ],
      },
    ],
  },
];
