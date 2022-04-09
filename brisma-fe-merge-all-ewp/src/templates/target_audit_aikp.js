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

export const target_audit_aikp = ({ regulerRows, specialRows, tematikRows }) => `
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
		aikp: "1",
		divisi: "147",
		desk: "18",
		pa: "9",
		ukln: "8",
		kck: "1",
		kcp: "609",
		kk: "608",
		unit: "5384",
	},
	target: {
		reguler: {
			aikp: "0",
			divisi: "0",
			desk: "0",
			pa: "0",
			kck: "0",
			kcp: "0",
			kk: "0",
			unit: "0",
		},
		tematik: [],
		special: {
			aikp: "0",
			divisi: "0",
			desk: "0",
			pa: "0",
			kck: "0",
			kcp: "0",
			kk: "0",
			unit: "0",
		},
	},
	echannel: [
		{
			kode: "1",
			name: "ATM",
			target: 0,
			existing: 0,
		},
		{
			kode: "2",
			name: "EDC",
			target: 0,
			existing: 0,
		},
		{
			kode: "3",
			name: "CRM",
			target: 0,
			existing: 0,
		},
	],
};