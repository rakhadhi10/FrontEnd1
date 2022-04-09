const prepareData = (val) => {
  let dataTemp = [];

  val &&
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
                        return `<p>${uk.value}</p>`;
                      })
                      .join("");
                  dataTemp.push({
                    key: `${i}${j}${k}${l}csv`,
                    manual_control:
                      mc.nama_sub_aktivitas + "_" + mc.nama_sub_major,
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
                    manual_control:
                      mc.nama_sub_aktivitas + "_" + mc.nama_sub_major,
                    risk_issue: ri.nama_risk_issue,
                    auditors: au.nama,
                    jenisSample: "file",
                    filename: file.filename,
                    unique_key: "",
                    value: "",
                  });
                });
              au.sample.monber.length !== 0 &&
                au.sample.monber.map((monber, l) => {
                  const value =
                    monber.values_unique_key.length !== 0 &&
                    monber.values_unique_key
                      .map((uk) => {
                        return `<p>${uk.value}</p>`;
                      })
                      .join("");
                  dataTemp.push({
                    key: `${i}${j}${k}${l}monber`,
                    manual_control:
                      mc.nama_sub_aktivitas + "_" + mc.nama_sub_major,
                    risk_issue: ri.nama_risk_issue,
                    auditors: au.nama,
                    jenisSample: "monber",
                    filename:
                      monber.tahun +
                      " - " +
                      monber.database +
                      " - " +
                      monber.table,
                    unique_key: monber.primary_key,
                    value: value,
                  });
                });
              au.sample.frd.length !== 0 &&
                au.sample.frd.map((frd, l) => {
                  const value =
                    frd.values_unique_key.length !== 0 &&
                    frd.values_unique_key
                      .map((uk) => {
                        return `<p>${uk.value}</p>`;
                      })
                      .join("");
                  dataTemp.push({
                    key: `${i}${j}${k}${l}frd`,
                    manual_control:
                      mc.nama_sub_aktivitas + "_" + mc.nama_sub_major,
                    risk_issue: ri.nama_risk_issue,
                    auditors: au.nama,
                    jenisSample: "frd",
                    filename:
                      frd.tahun + " - " + frd.database + " - " + frd.table,
                    unique_key: frd.primary_key,
                    value: value,
                  });
                });
            });
        });
    });
  return dataTemp;
};

const rows = (val = []) => {
  return val.map((item) => {
    return `
            <tr>
                <td>${item.manual_control} </td>
                <td>${item.risk_issue} </td>
                <td>${item.auditors} </td>
                <td>${item.jenisSample} </td>
                <td>${item.filename} </td>
                <td>${item.unique_key} </td>
                <td>${item.value} </td>
            </tr>
        `;
  });
};

const doc_analisis_perencanaan_mapa_bab5 = (body) => `
<style>
table, th, td {
  border: 1px solid;
  padding: 2px;
}
</style>
    <figure class="table">
        <table style="width: 100%;">
            <thead>
                <tr>
                    <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Manual Control</p></th>
                    <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Risk Issue</p></th>
                    <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Auditor</p></th>
                    <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Jenis Sample</p></th>
                    <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Filename</p></th>
                    <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Unique Key</p></th>
                    <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Values Uniq Key</p></th>
                </tr>
            </thead>
            <tbody>
                ${body}
            </tbody>
        </table>
    </figure>
`;

export const getAnalisisPerencanaanDoc = (data) =>
  doc_analisis_perencanaan_mapa_bab5(rows(prepareData(data)));
