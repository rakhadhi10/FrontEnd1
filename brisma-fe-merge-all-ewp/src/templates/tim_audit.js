export const prepareData = (data) => {
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
          ${d.atas.map(a => (
            `<p>
              ${a.pn} - ${a.name}
            </p>`
          )).join("")}
        </td>
        <td>
          ${d.atas.map(a => (
            `<p>
              ${a.pn} - ${a.name}: ${a.uker.map((u, idx) => `${u.orgeh_name}`).join(", ")}
            </p>`
          )).join("")}
        </td>
      </tr>`;
		})
		.join("");
};

export const tim_audit = (timRows) => `
<figure class="table">
    <table>
        <thead>
            <tr>
                <th rowspan="2">
                    <p style="text-align:center;">
                        No
                    </p>
                </th>
                <th colspan="2">
                    <p style="text-align:center;">
                        Susunan Tim
                    </p>
                </th>
                <th rowspan="2">
                    <p style="text-align:center;">
                        Uker Binaan &amp; Auditor Pembina
                    </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p style="text-align:center;">
                        Tim
                    </p>
                </th>
                <th>
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

export const exampleData = [
	{
		id: 1,
		name: "WestBank",
		pn_pic: 133768,
		nama_pic: "Dxty KTg_xdurnxyTg_xduyty",
		jabatan_pic: "AUDITOR 1",
		pn_ma: "1248",
		nama_ma: "asdasd",
		jabatan_ma: "Auditor",
		pn_kta: "1248",
		nama_kta: "asdasd",
		jabatan_kta: "Auditor",
		atas: [
			{
				id: 1,
				pn: "161053",
				name: "lontoong",
				jabatan: "Auditor",
				uker: [
					{
						orgeh: 50627646,
						orgeh_name: "SEKSI PENUNJANG OPERASIONAL",
						branch: 1069,
					},
					{
						orgeh: 50627645,
						orgeh_name: "SEKSI PENUNJANG BISNIS",
						branch: 1305,
					},
				],
			},
			{
				id: 2,
				pn: "161053",
				name: "sate",
				jabatan: "Auditor",
				uker: [
					{
						orgeh: 50680088,
						orgeh_name: "UNIT SUNGAI PAKNING",
						branch: 1307,
					},
					{
						orgeh: 50680087,
						orgeh_name: "UNIT SIAK SRI INDRAPURA",
						branch: 1539,
					},
				],
			},
		],
	},
	{
		id: 2,
		name: "WestBank",
		pn_pic: 133768,
		nama_pic: "Dxty KTg_xdurnxyTg_xduyty",
		jabatan_pic: "AUDITOR 1",
		pn_ma: "1248",
		nama_ma: "asdasd",
		jabatan_ma: "Auditor",
		pn_kta: "1248",
		nama_kta: "asdasd",
		jabatan_kta: "Auditor",
		atas: [
			{
				id: 3,
				pn: "161053",
				name: "lontoong",
				jabatan: "Auditor",
				uker: [
					{
						orgeh: 50627646,
						orgeh_name: "SEKSI PENUNJANG OPERASIONAL",
						branch: 1069,
					},
					{
						orgeh: 50627645,
						orgeh_name: "SEKSI PENUNJANG BISNIS",
						branch: 1305,
					},
				],
			},
			{
				id: 4,
				pn: "161053",
				name: "sate",
				jabatan: "Auditor",
				uker: [
					{
						orgeh: 50680088,
						orgeh_name: "UNIT SUNGAI PAKNING",
						branch: 1307,
					},
					{
						orgeh: 50680087,
						orgeh_name: "UNIT SIAK SRI INDRAPURA",
						branch: 1539,
					},
				],
			},
		],
	},
];
