import moment from "moment";

export const prepareData = (data) => {
	return data
		.map((d, idx) => {
			const start_month = moment(d.pelaksanaan_start).month() + 1;
			const end_month = moment(d.pelaksanaan_end).month() + 1;

			return `<tr>
			<td>${idx + 1}</td>
			<td>${d.nama_kegiatan}</td>
			<td>${d.orgeh_name}</td>
			<td>
        ${d.anggota.map((p) => `<p>${p.pn} - ${p.nama}</p>`).join("")}
			</td>
      ${[...Array(12)].map(
				(_, idx) =>
					`<td ${
						idx + 1 >= start_month && idx + 1 <= end_month
							? 'style="background-color:hsl(210, 75%, 60%);'
							: ""
					}"></td>`,
			)}
		</tr>`;
		})
		.join("");
};

export const jadwal_lain = (lainRows) => `
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
                        Nama Kegiatan
                    </p>
                </th>
                <th rowspan="2">
                    <p style="text-align:center;">
                        Uker
                    </p>
                </th>
                <th rowspan="2">
                    <p style="text-align:center;">
                        Anggota
                    </p>
                </th>
                <th colspan="12">
                    <p style="text-align:center;">
                        Periode
                    </p>
                </th>
            </tr>
            <tr>
                <th>
                    <p style="text-align:center;">
                        Jan
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Feb
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Mar
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Apr
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Mei
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Jun
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Jul
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Ags
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Sep
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Okt
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Nov
                    </p>
                </th>
                <th>
                    <p style="text-align:center;">
                        Des
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
            ${lainRows}
        </tbody>
    </table>
</figure>`;

export const exampleData = 
[
	{
		id: 1,
		nama_kegiatan: "Lain-Lain 1",
		branch_induk: 2021,
		orgeh_induk: 50345012,
		orgeh_name: "KCP BALIWERTI",
		total_anggaran: 169,
		pelaksanaan_start: "2021-4-12 00:00:00+07",
		pelaksanaan_end: "2021-12-31 00:00:00+07",
		anggota: [
			{
				id: 1,
				pn: "1114",
				nama: "Dhyrmy Lyr_syny",
				jabatan: "AUDITOR 2",
			},
			{
				id: 2,
				pn: "1119",
				nama: "Hqrx IyhtTg_xduprxyyaxdux",
				jabatan: "KEPALA AUDIT INTERN KANTOR WILAYAH",
			},
			{
				id: 3,
				pn: "26111",
				nama: "Zxcaxduy Cyhymnm",
				jabatan: "WAKIL KEPALA AUDIT INTERN WILAYAH",
			},
		],
	},
];


