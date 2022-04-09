const prepareData = (data) => {
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
      </tr>`;
    })
    .join("");

  return { regulerRows: reguler, specialRows: special, tematikRows: tematik };
};

const target_audit_aiw = ({ regulerRows, specialRows, tematikRows }) => `
<div class="sub_section_ruang_lingkup">
    <h4>1. </h4>
    <h4>Reguler Audit</h4>
    <div></div>
    <table>
        <tr>
            <th rowspan="2" style="background-color: #3C64B1; color: white;">No</th>
            <th rowspan="2" style="background-color: #3C64B1; color: white;">Objek Audit</th>
            <th rowspan="2" style="background-color: #3C64B1; color: white;">Σ Uker</th>
            <th colspan="2" style="background-color: #3C64B1; color: white;">Target Audit</th>
        </tr>
        <tr>
            <th style="background-color: #3C64B1; color: white;">Σ Objek Audit</th>
            <th style="background-color: #3C64B1; color: white;">% Objek Audit</th>
        </tr>
        ${regulerRows}
    </table>
</div>
<div class="sub_section_ruang_lingkup">
    <h4>2. </h4>
    <h4>Special Audit</h4>
    <div></div>
    <table>
        <tr>
            <th rowspan="2" style="background-color: #3C64B1; color: white;">No</th>
            <th rowspan="2" style="background-color: #3C64B1; color: white;">Objek Audit</th>
            <th rowspan="2" style="background-color: #3C64B1; color: white;">Σ Uker</th>
            <th colspan="2" style="background-color: #3C64B1; color: white;">Target Audit</th>
        </tr>
        <tr>
            <th style="background-color: #3C64B1; color: white;">Σ Objek Audit</th>
            <th style="background-color: #3C64B1; color: white;">% Objek Audit</th>
        </tr>
        ${specialRows}
    </table>
</div>
<div class="sub_section_ruang_lingkup">
    <h4>3.</h4>
    <h4>Tematik Audit</h4>
    <div></div>
    <table>
        <thead>
            <tr>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        No
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
                    <p style="text-align:center;">
                        Tema
                    </p>
                </th>
                <th style="background-color: #3C64B1; color: white;">
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
</div>
`;

export const getTargetAuditAiwTable = (data) =>
  target_audit_aiw(prepareData(data));
