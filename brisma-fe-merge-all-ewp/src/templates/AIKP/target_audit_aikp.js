export const prepareData = (data) => {
  const reguler = Object.keys(data.existing)
    .map((k, idx) => {
      return `
      <tr>
          <td>
              ${idx + 1}
          </td>
          <td>
              <p style="text-align:center;">${k}</p>
          </td>
          <td>
              <p style="text-align:center;">${data.existing[k]}</p>
          </td>
          <td>
              <p style="text-align:center;">${data.target.reguler[k] || 0}</p>
          </td>
          <td>
              <p style="text-align:center;">${
                Number(data.target.reguler[k]) === 0 ||
                data.target.reguler[k] === undefined
                  ? 0
                  : Math.round(
                      Number(
                        data.target.reguler[k] / Number(data.existing[k]) || 0,
                      ) * 100,
                    )
              }%</p>
          </td>
      </tr>`;
    })
    .join("");

  const special = Object.keys(data.existing)
    .map((k, idx) => {
      return `
      <tr>
          <td>
              ${idx + 1}
          </td>
          <td>
              <p style="text-align:center;">${k}</p>
          </td>
          <td>
              <p style="text-align:center;">${data.existing[k]}</p>
          </td>
          <td>
              <p style="text-align:center;">${data.target.special[k] || 0}</p>
          </td>
          <td>
              <p style="text-align:center;">${
                Number(data.target.special[k]) === 0 ||
                data.target.special[k] === undefined
                  ? 0
                  : Math.round(
                      Number(
                        data.target.special[k] / Number(data.existing[k]) || 0,
                      ) * 100,
                    )
              }%</p>
          </td>
      </tr>`;
    })
    .join("");

  const tematik = data.target.tematik
    .map((t, idx) => {
      return `
      <tr>
        <td>
          <p style="text-align:center;">${idx + 1}</p>
        </td>
        <td>
          <p style="text-align:center;">${t.tema_audit}</p>
        </td>
        <td>
          ${t.uker
            .map((u) => `<p style="text-align:center;">${u.uker_name}</p>`)
            .join("")}
        </td>
      </tr>;`;
    })
    .join("");

  return { regulerRows: reguler, specialRows: special, tematikRows: tematik };
};

export const target_audit_aikp = ({
  regulerRows,
  specialRows,
  tematikRows,
}) => `
<strong>1. Reguler Audit</strong>
<figure class="table"  style="margin-bottom: 1em;">
    <table style="width: 100%;">
        <thead>
            <tr>
                <th rowspan="2" style="background-color: #3C64B1; color: white;>
                    <p style="text-align:center;">
                        No
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;>
                    <p style="text-align:center;">
                        Objek Audit
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;>
                    <p style="text-align:center;">
                        ∑ Uker
                    </p>
                </th>
                <th colspan="2" style="background-color: #3C64B1; color: white;>
                    <p style="text-align:center;">
                        Target Audit
                    </p>
                </th>
            </tr>
            <tr>
                <th style="background-color: #3C64B1; color: white;>
                    <p style="text-align:center;">
                        ∑ Objek Audit
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;>
                    <p style="text-align:center;">
                        % Objek Audit
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
            ${regulerRows}
        </tbody>
    </table>
</figure>
<strong>2. Special Audit</strong>
<figure class="table"  style="margin-bottom: 1em;">
    <table style="width: 100%;">
        <thead>
            <tr>
                <th rowspan="2" style="background-color: #3C64B1; color: white;>
                    <p style="text-align:center;">
                        No
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;>
                    <p style="text-align:center;">
                        Objek Audit
                    </p>
                </th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;>
                    <p style="text-align:center;">
                        ∑ Uker
                    </p>
                </th>
                <th colspan="2" style="background-color: #3C64B1; color: white;>
                    <p style="text-align:center;">
                        Target Audit
                    </p>
                </th>
            </tr>
            <tr>
                <th style="background-color: #3C64B1; color: white;>
                    <p style="text-align:center;">
                        ∑ Objek Audit
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;>
                    <p style="text-align:center;">
                        % Objek Audit
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
            ${specialRows}
        </tbody>
    </table>
</figure>
<strong>3. Tematik Audit</strong>
<figure class="table" style="margin-bottom: 1em;">
    <table style="width: 100%;">
        <thead>
            <tr>
                <th style="background-color: #3C64B1; color: white;>
                    <p style="text-align:center;">
                        No
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;>
                    <p style="text-align:center;">
                        Tema
                    </p>
                </th>
                </th>
                <th style="background-color: #3C64B1; color: white;>
                    <p style="text-align:center;">
                        Objek Audit/Uker
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
            ${tematikRows}
        </tbody>
    </table>
</figure>
`;

export const getTargetAuditAikpTable = (data) =>
  target_audit_aikp(prepareData(data));
