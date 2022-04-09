export const prepareData = (data) => {
	const reguler =  data.existing
		.map((k, idx) => {
      const existing = k.count
      const target = 
      data.target.reguler.find((r) => r.nama === k.nama)
      ? data.target.reguler.find((r) => r.nama === k.nama).count || 0
      : 0
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
          ${t.objek.map((o) => `<p style="text-align:center;">${o.objek_name}</p>`).join("")}
        </td>
      </tr>;`;
    })
    .join("");

  return { regulerRows: reguler, specialRows: special, tematikRows: tematik };
};

export const target_audit_aiti = ({ regulerRows, specialRows, tematikRows }) => `
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
	existing: [
		{
			nama: "Tata Kelola TI",
			count: "1",
		},
		{
			nama: "Aplikasi",
			count: "1",
		},
		{
			nama: "Infrastruktur",
			count: "6",
		},
		{
			nama: "Keamanan",
			count: "3",
		},
		{
			nama: "Pengadaan TI",
			count: "2",
		},
		{
			nama: "Jasa pihak ketiga TI",
			count: "1",
		},
		{
			nama: "Pemulihan Bencana",
			count: "1",
		},
		{
			nama: "Jasa TI oleh Bank",
			count: "1",
		},
		{
			nama: "Anak Perusahaan",
			count: "5",
		},
		{
			nama: "Lainnya",
			count: "1",
		},
	],
	target: {
		reguler: [
			{
				kode: "to1",
				nama: "Tata Kelola TI",
				count: "0",
			},
			{
				kode: "to2",
				nama: "Aplikasi",
				count: "0",
			},
			{
				kode: "to3",
				nama: "Infrastruktur",
				count: "0",
			},
			{
				kode: "to4",
				nama: "Keamanan",
				count: "0",
			},
			{
				kode: "to5",
				nama: "Pengadaan TI",
				count: "0",
			},
			{
				kode: "to6",
				nama: "Jasa pihak ketiga TI",
				count: "0",
			},
			{
				kode: "to7",
				nama: "Pemulihan Bencana",
				count: "0",
			},
			{
				kode: "to8",
				nama: "Jasa TI oleh Bank",
				count: "0",
			},
			{
				kode: "to9",
				nama: "Anak Perusahaan",
				count: "0",
			},
			{
				kode: "to10",
				nama: "Lainnya",
				count: "0",
			},
		],
		tematik: [
			{
				id: 4,
				tema_audit: "laporan keuangan",
				objek: [
					{
						tipe_objek_name: "Tata Kelola TI",
						objek_name: "Tata Kelola TI",
					},
					{
						tipe_objek_name: "Aplikasi",
						objek_name: "List Aplikasi",
					},
				],
			},
		],
		special: [
			{
				kode: "to1",
				nama: "Tata Kelola TI",
				count: "0",
			},
			{
				kode: "to2",
				nama: "Aplikasi",
				count: "0",
			},
			{
				kode: "to3",
				nama: "Infrastruktur",
				count: "0",
			},
			{
				kode: "to4",
				nama: "Keamanan",
				count: "0",
			},
			{
				kode: "to5",
				nama: "Pengadaan TI",
				count: "0",
			},
			{
				kode: "to6",
				nama: "Jasa pihak ketiga TI",
				count: "0",
			},
			{
				kode: "to7",
				nama: "Pemulihan Bencana",
				count: "0",
			},
			{
				kode: "to8",
				nama: "Jasa TI oleh Bank",
				count: "0",
			},
			{
				kode: "to9",
				nama: "Anak Perusahaan",
				count: "0",
			},
			{
				kode: "to10",
				nama: "Lainnya",
				count: "0",
			},
		],
	},
	echannel: [
		{
			kode: "1",
			name: "ATM",
			target: 2,
			existing: 11,
		},
		{
			kode: "2",
			name: "EDC",
			target: 3,
			existing: 11,
		},
		{
			kode: "3",
			name: "CRM",
			target: 2,
			existing: 11,
		},
	],
};