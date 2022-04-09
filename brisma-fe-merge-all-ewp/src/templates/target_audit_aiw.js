export const prepareData = (data) => {
	const reguler =  Object.keys(data.existing)
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
								Number(data.target.reguler[k]) === 0 || data.target.reguler[k] === undefined
									? 0
									: Math.round(
											(Number(data.target.reguler[k] /
												Number(data.existing[k]) || 0)) *
												100,
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
											(Number(data.target.special[k] /
												Number(data.existing[k]) || 0)) *
												100,
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
          ${t.uker.map((u) => `<p style="text-align:center;">${u.uker_name}</p>`).join("")}
        </td>
      </tr>;`;
    })
    .join("");

  return { regulerRows: reguler, specialRows: special, tematikRows: tematik };
};

export const target_audit_aiw = ({ regulerRows, specialRows, tematikRows }) => `
<ol>
    <li>
        <strong>1. Reguler Audit</strong>
    </li>
</ol>
<figure class="table">
    <table>
        <thead>
            <tr>
                <th rowspan="2">
                    <p style="text-align:center;">
                        No
                    </p>
                </th>
                <th rowspan="2">
                    <p style="text-align:center;">
                        Objek Audit
                    </p>
                </th>
                <th rowspan="2">
                    <p style="text-align:center;">
                        ∑ Uker
                    </p>
                </th>
                <th colspan="2">
                    <p style="text-align:center;">
                        Target Audit
                    </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p style="text-align:center;">
                        ∑ Objek Audit
                    </p>
                </th>
                <th>
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
<ol>
    <li>
        <strong>2. Special Audit</strong>
    </li>
</ol>
<figure class="table">
    <table>
        <thead>
            <tr>
                <th rowspan="2">
                    <p style="text-align:center;">
                        No
                    </p>
                </th>
                <th rowspan="2">
                    <p style="text-align:center;">
                        Objek Audit
                    </p>
                </th>
                <th rowspan="2">
                    <p style="text-align:center;">
                        ∑ Uker
                    </p>
                </th>
                <th colspan="2">
                    <p style="text-align:center;">
                        Target Audit
                    </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p style="text-align:center;">
                        ∑ Objek Audit
                    </p>
                </th>
                <th>
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
<p>
    <strong>3. Tematik Audit</strong>
</p>
<figure class="table">
    <table>
        <thead>
            <tr>
                <th>
                    <p style="text-align:center;">
                        No
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Tema
                    </p>
                </th>
                <th>
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

export const exampleData = {
	existing: {
		aiw: "1",
		kanwil: "1",
		kc: "24",
		kcp: "34",
		kk: "29",
		unit: "271",
	},
	target: {
		reguler: {
			kanwil: "0",
			kc: "0",
			kcp: "1",
			kk: "0",
			unit: "2",
		},
		tematik: [
			{
				id: 3,
				tema_audit: "laporan keuangan",
				uker: [
					{
						uker_name: "UNIT BONTO-BONTO PANGKEP",
					},
				],
			},
		],
		special: {
			kanwil: "0",
			kc: "0",
			kcp: "0",
			kk: "0",
			unit: "1",
		},
	},
	echannel: [
		{
			kode: "1",
			name: "ATM",
			target: 3,
			existing: 33,
		},
		{
			kode: "2",
			name: "EDC",
			target: 6,
			existing: 36,
		},
		{
			kode: "3",
			name: "CRM",
			target: 9,
			existing: 39,
		},
	],
};