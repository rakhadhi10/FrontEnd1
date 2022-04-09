const initialValue = {
  id: 90,
  kode_uker: 50350127,
  nama_uker: "UNIT KRAGILAN",
  kode_aktivitas: "13",
  nama_aktivitas: "Culture",
  manual_control: [
    {
      kode_sub_aktivitas: "13.1",
      nama_sub_aktivitas: "CULTURE TRANSFORMATION",
      kode_sub_major: "PKP",
      nama_sub_major: "Penyusunan Kebijakan & Prosedur",
      risk_issue: [
        {
          kode_risk_issue: "PKP6",
          nama_risk_issue:
            "Penyusunan kebijakan dan strategi terkait corporate culture perusahaan tidak comply dengan ketentuan internal/regulasi eksternal",
          auditors: [
            {
              pn: "00119884",
              nama: "Melky Alviansyah Tarigan",
              sample: {
                file: [
                  {
                    id: 2,
                    filename: "file2.zip",
                  },
                  {
                    id: 3,
                    filename: "file3.zip",
                  },
                ],
                csv: [
                  {
                    id: 1,
                    filename: "csv1.csv",
                    unique_key: "id",
                    values_unique_key: [
                      {
                        value: "1",
                      },
                    ],
                  },
                ],
                frd: [],
                monber: [],
              },
            },
            {
              pn: "00136165",
              nama: "I Putu Andeandika",
              sample: {
                file: [
                  {
                    id: 2,
                    filename: "file2.zip",
                  },
                  {
                    id: 3,
                    filename: "file3.zip",
                  },
                ],
                csv: [
                  {
                    id: 1,
                    filename: "csv1.csv",
                    unique_key: "id",
                    values_unique_key: [
                      {
                        value: "4",
                      },
                    ],
                  },
                  {
                    id: 2,
                    filename: "csv2.csv",
                    unique_key: "id",
                    values_unique_key: [
                      {
                        value: "1",
                      },
                    ],
                  },
                ],
                frd: [],
                monber: [],
              },
            },
          ],
        },
      ],
    },
    {
      kode_sub_aktivitas: "13.1",
      nama_sub_aktivitas: "CULTURE TRANSFORMATION",
      kode_sub_major: "KPS",
      nama_sub_major: "Pengkinian Kebijakan & Prosedur",
      risk_issue: [
        {
          kode_risk_issue: "KPS1",
          nama_risk_issue:
            "Kebijakan dan prosedur tidak/belum dapat diimplementasikan, kadaluarsa, atau tidak sesuai dengan perkembangan bisnis",
          auditors: [
            {
              pn: "00055596",
              nama: "Emily Catherine",
              sample: {
                file: [],
                csv: [
                  {
                    id: 2,
                    filename: "csv2.csv",
                    unique_key: "id",
                    values_unique_key: [
                      {
                        value: "4124211",
                      },
                      {
                        value: "4124211",
                      },
                      {
                        value: "4124211",
                      },
                    ],
                  },
                ],
                frd: [],
                monber: [],
              },
            },
            {
              pn: "00119884",
              nama: "Melky Alviansyah Tarigan",
              sample: {
                file: [
                  {
                    id: 1,
                    filename: "file1.zip",
                  },
                  {
                    id: 10,
                    filename:
                      "the-great-shaman-ga-doo-shim-superior-shaman-ga-doo-shim_indonesian-2594285.zip",
                  },
                ],
                csv: [],
                frd: [],
                monber: [],
              },
            },
          ],
        },
      ],
    },
  ],
};

const prepareData = (val = []) => {
  let dataTemp = [];

  val.length !== 0 &&
    val.manual_control.map((mc, i) => {
      mc.risk_issue.length !== 0 &&
        mc.risk_issue.map((ri, j) => {
          ri.auditors.length !== 0 &&
            ri.auditors.map((au, k) => {
              au.sample.csv.length !== 0 &&
                au.sample.csv.map((csv, l) => {
                  const value =
                    csv.values_unique_key.length !== 0 &&
                    csv.values_unique_key
                      .map((uk) => {
                        return `${uk.value}<br/>`;
                      })
                      .join("");
                  dataTemp.push({
                    key: `${i}${j}${k}${l}csv`,
                    manual_control: mc.nama_sub_aktivitas + "_" + mc.nama_sub_major,
                    risk_issue: ri.nama_risk_issue,
                    auditors: au.nama,
                    jenisSample: "csv",
                    filename: csv.filename,
                    unique_key: csv.unique_key,
                    value: value,
                  });
                });
              au.sample.file.length !== 0 &&
                au.sample.file.map((file, l) => {
                  dataTemp.push({
                    key: `${i}${j}${k}${l}file`,
                    manual_control: mc.nama_sub_aktivitas + "_" + mc.nama_sub_major,
                    risk_issue: ri.nama_risk_issue,
                    auditors: au.nama,
                    jenisSample: "file",
                    filename: file.filename,
                    unique_key: "",
                    value: "",
                  });
                });
            });
        });
    });
  console.log(dataTemp);
  return dataTemp;
};

const rows = (val = []) => {
  val.map((item) => {
    console.log(`
            <tr>
                <td>${item.manual_control} </td>
                <td>${item.risk_issue} </td>
                <td>${item.auditors} </td>
                <td>${item.jenisSample} </td>
                <td>${item.filename} </td>
                <td>${item.unique_key} </td>
                <td>${item.value} </td>
            </tr>
        `);
  });
};

const data = prepareData(initialValue);

rows(data);
