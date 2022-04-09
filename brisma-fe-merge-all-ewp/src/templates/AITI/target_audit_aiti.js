export const prepareData = (data) => {
  const reguler = data.existing
    .map((k, idx) => {
      const existing = k.count;
      const target = data.target.reguler.find((r) => r.nama === k.nama)
        ? data.target.reguler.find((r) => r.nama === k.nama).count || 0
        : 0;
      return `
      <tr>
          <td>
              ${idx + 1}
          </td>
          <td>
              <p style="text-align:center;">${k.nama}</p>
          </td>
          <td>
              <p style="text-align:center;">${existing}</p>
          </td>
          <td>
              <p style="text-align:center;">${target}</p>
          </td>
          <td>
              <p style="text-align:center;">
              ${Math.round((Number(target) / Number(existing)) * 100)}%
              </p>
          </td>
      </tr>`;
    })
    .join("");

  const special = data.existing
    .map((k, idx) => {
      const existing = k.count;
      const target = data.target.special.find((r) => r.nama === k.nama)
        ? data.target.special.find((r) => r.nama === k.nama).count || 0
        : 0;
      return `
      <tr>
          <td>
              ${idx + 1}
          </td>
          <td>
              <p style="text-align:center;">${k.nama}</p>
          </td>
          <td>
              <p style="text-align:center;">${existing}</p>
          </td>
          <td>
              <p style="text-align:center;">${target}</p>
          </td>
          <td>
              <p style="text-align:center;">
              ${Math.round((Number(target) / Number(existing)) * 100)}%
              </p>
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
          ${t.objek
            .map((o) => `<p style="text-align:center;">${o.objek_name}</p>`)
            .join("")}
        </td>
      </tr>;`;
    })
    .join("");

  return { regulerRows: reguler, specialRows: special, tematikRows: tematik };
};

export const target_audit_aiti = ({
  regulerRows,
  specialRows,
  tematikRows,
}) => `
<strong>1. Reguler Audit</strong>
<figure class="table" style="margin-bottom: 1em;">
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
<figure class="table" style="margin-bottom: 1em;">
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

export const getTargetAuditAitiTable = (data) =>
  target_audit_aiti(prepareData(data));
