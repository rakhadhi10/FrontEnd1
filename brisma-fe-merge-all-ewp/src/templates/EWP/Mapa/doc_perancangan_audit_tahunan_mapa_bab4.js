import { CheckOutlined } from "@ant-design/icons";

const subMajor = (data) => {
  return data.map((item) => {
    return `
            <tr>
                <td>&nbsp</td>
                <td>${item.sub_major_proses_name}</td>
                <td style="text-align:center">${item.pat ? "V" : ""}</td>
                <td style="text-align:center">${item.kanwil ? "V" : ""}</td>
                <td style="text-align:center">${item.kanca ? "V" : ""}</td>
                <td style="text-align:center">${item.kcp ? "V" : ""}</td>
                <td style="text-align:center">${item.unit ? "V" : ""}</td>
            </tr>
        `;
  });
};

const major = (data) => {
  return data.map((item) => {
    return `
            <tr>
                <td style="background: rgba(60, 100, 177, 0.3)">&nbsp</td>
                <td style="background: rgba(60, 100, 177, 0.3)">${item.major_proses_name}</td>
                <td style="background: rgba(60, 100, 177, 0.3)">&nbsp</td>
                <td style="background: rgba(60, 100, 177, 0.3)">&nbsp</td>
                <td style="background: rgba(60, 100, 177, 0.3)">&nbsp</td>
                <td style="background: rgba(60, 100, 177, 0.3)">&nbsp</td>
                <td style="background: rgba(60, 100, 177, 0.3)">&nbsp</td>
            </tr>
            ${subMajor(item.sub_major_proses)}
        `;
  });
};

const mega = (data) => {
  return data.map((item, idx) => {
    return `
            <tr>
                <td style="text-align:center; background: rgba(60, 100, 177, 0.5)">${idx + 1}</td>
                <td style="background: rgba(60, 100, 177, 0.5)">${item.mega_proses_name}</td>
                <td style="background: rgba(60, 100, 177, 0.5)">&nbsp</td>
                <td style="background: rgba(60, 100, 177, 0.5)">&nbsp</td>
                <td style="background: rgba(60, 100, 177, 0.5)">&nbsp</td>
                <td style="background: rgba(60, 100, 177, 0.5)">&nbsp</td>
                <td style="background: rgba(60, 100, 177, 0.5)">&nbsp</td>
            </tr>
            ${major(item.major_proses)}
        `;
  });
};

const table = (rows) => `
    <style>
table, th, td {
  border: 1px solid;
}
</style>
    <figure class="table">
        <table style="width: 100%;">
            <thead>
                <tr>
                    <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">No</p></th>
                    <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Proses Bisnis</p></th>
                    <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">PAT</p></th>
                    <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Kanwil</p></th>
                    <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Kanca</p></th>
                    <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">KCP</p></th>
                    <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Unit</p></th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    </figure>
`;

export const doc_perencanaan_audit_tahunan_mapa_bab4 = (data) =>
  data ? table(mega(data.proses_bisnis)) : "";
