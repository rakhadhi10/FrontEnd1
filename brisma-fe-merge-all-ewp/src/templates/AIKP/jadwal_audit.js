import moment from "moment";

const prepareData = (data) => {
  return data
    .map((d, idx) => {
      const start_month = moment(d.jadwal_audit.pelaksanaan_start).month() + 1;
      const end_month = moment(d.jadwal_audit.pelaksanaan_end).month() + 1;

      return `
      <tr>
          <td>
              ${idx + 1}
          </td>
          <td>
              ${
                d.jadwal_audit.tipe_audit === "Regular Audit"
                  ? d.jadwal_audit.uker
                  : `${d.jadwal_audit.uker}, ...`
              }
          </td>
          <td>
              ${d.jadwal_audit.tim_audit_name}
          </td>
          <td>
              ${d.jadwal_audit.tipe_audit}
          </td>
          ${[...Array(12)]
            .map(
              (_, idxm) =>
                `<td ${
                  idxm + 1 >= start_month && idxm + 1 <= end_month
                    ? 'style="background-color:hsl(210, 75%, 60%);"'
                    : ""
                }"></td>`,
            )
            .join("")}
          <td>
              ${Object.keys(d.targetAudit.count_target_jenis_auditee.existing)
                .map((k) => {
                  const existing =
                    d.targetAudit.count_target_jenis_auditee.existing[k] || 0;
                  const target =
                    d.targetAudit.count_target_jenis_auditee.target[k] || 0;
                  const percent = Math.round(
                    (Number(target) / Number(existing)) * 100,
                  );
                  return `
                  <p>
                      ${k}: [${existing}][${target}] ${percent}%&nbsp;
                  </p>
                `;
                })
                .join("")}
          </td>
      </tr>`;
    })
    .join("");
};

const jadwal_audit = (rows) => `
<figure class="table">
    <table style="width: 100%;">
        <thead>
            <tr>
                <th rowspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        No
                    </p>
                    <p style="text-align:center;">
                        &nbsp;
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Objek Audit
                    </p>
                    <p style="text-align:center;">
                        &nbsp;
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Tim Audit
                    </p>
                    <p style="text-align:center;">
                        &nbsp;
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Tipe Audit
                    </p>
                    <p style="text-align:center;">
                        &nbsp;
                    </p>
                </th>
                <th colspan="12" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Periode
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Objek Audit
                    </p>
                    <p style="text-align:center;">
                        &nbsp;
                    </p>
                </th>
            </tr>
            <tr>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Jan
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Feb
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Mar
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Apr
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Mei
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Jun
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Jul
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Ags
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Sep
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Okt
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Nov
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Des
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
            ${rows}
        </tbody>
    </table>
</figure>`;

export const getJadwalAuditTable = (data) => jadwal_audit(prepareData(data));
