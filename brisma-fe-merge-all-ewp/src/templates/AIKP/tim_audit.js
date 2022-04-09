const prepareData = (data) => {
  return data
    .map((d, idx) => {
      return `
      <tr>
        <td>
          ${idx + 1}
        </td>
        <td>
          ${d.name}
        </td>
        <td>
          <p>
            MA: ${d.pn_ma} - ${d.nama_ma}
          </p>
          <p>
            KTA: ${d.pn_kta} - ${d.nama_kta}
          </p>
          <p>
            ATA:&nbsp;
          </p>
          ${d.atas
            .map(
              (a) =>
                `<p>
              ${a.pn} - ${a.name}
            </p>`,
            )
            .join("")}
        </td>
        <td>
          ${d.atas
            .map(
              (a) =>
                `<p>
              ${a.pn} - ${a.name}: ${a.uker
                  .map((u, idx) => `${u.orgeh_name}`)
                  .join(", ")}
            </p>`,
            )
            .join("")}
        </td>
      </tr>`;
    })
    .join("");
};

const tim_audit = (timRows) => `
<figure class="table">
    <table style="width: 100%;">
        <thead>
            <tr>
                <th rowspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        No
                    </p>
                </th>
                <th colspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Susunan Tim
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Uker Binaan &amp; Auditor Pembina
                    </p>
                </th>
            </tr>
            <tr>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Tim
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Nama
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
            ${timRows}
        </tbody>
    </table>
</figure>`;

export const getTimAuditTable = (data) => tim_audit(prepareData(data));
