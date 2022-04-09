import moment from "moment";

export const prepareData = (data) => {
	return data
		.map((d, idx) => {
			const start_month = moment(d.pelaksanaan_start).month() + 1;
			const end_month = moment(d.pelaksanaan_end).month() + 1;

			return `<tr>
			<td>${idx + 1}</td>
			<td>${d.sbp_name}</td>
			<td>${d.orgeh_name}</td>
			<td>
        ${d.pembicara.map((p) => `<p>${p.pn} - ${p.nama}</p>`).join("")}
			</td>
			<td>
				${d.penanggung_jawab.map((p) => `<p>${p.pn} - ${p.nama}</p>`).join("")}
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

export const jadwal_sbp = (sbpRows) => `
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
                        Uker SBP
                    </p>
                </th>
                <th rowspan="2">
                    <p style="text-align:center;">
                        Pembicara
                    </p>
                </th>
                <th rowspan="2">
                    <p style="text-align:center;">
                        PIC
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
            ${sbpRows}
        </tbody>
    </table>
</figure>`;

export const exampleData = [
	{
		id: 3,
		sbp_name: "SBP MAJU Matahari",
		branch_induk: 1321,
		orgeh_induk: 50584746,
		orgeh_name: "RESIDENT AUDITOR KANCA PROBOLINGGO",
		pelaksanaan_start: "2020-5-10 00:00:00+07",
		pelaksanaan_end: "2020-12-12 00:00:00+07",
		total_anggaran: 2600000,
		nama_pic_maker_jadwal_sbp: "Dxty KTg_xdurnxyTg_xduyty",
		pn_pic_maker_jadwal_sbp: 133768,
		pembicara: [
			{
				id: 7,
				pn: "285898",
				nama: "asdasd",
				jabatan: "Auditor",
			},
			{
				id: 8,
				pn: "262193",
				nama: "asdasd",
				jabatan: "Auditor",
			},
		],
		penanggung_jawab: [
			{
				id: 7,
				pn: "285899",
				nama: "asdasd",
				jabatan: "Auditor",
			},
			{
				id: 8,
				pn: "285900",
				nama: "asdasd",
				jabatan: "Auditor",
			},
		],
	},
	{
		id: 5,
		sbp_name: "SBP MAJU Matahari",
		branch_induk: 12321,
		orgeh_induk: 50584746,
		orgeh_name: "RESIDENT AUDITOR KANCA PROBOLINGGO",
		pelaksanaan_start: "2020-1-10 00:00:00+07",
		pelaksanaan_end: "2020-4-12 00:00:00+07",
		total_anggaran: 2600000,
		nama_pic_maker_jadwal_sbp: "Dxty KTg_xdurnxyTg_xduyty",
		pn_pic_maker_jadwal_sbp: 133768,
		pembicara: [
			{
				id: 19,
				pn: "285898",
				nama: "asdasd",
				jabatan: "Auditor",
			},
			{
				id: 20,
				pn: "262193",
				nama: "asdasd",
				jabatan: "Auditor",
			},
		],
		penanggung_jawab: [
			{
				id: 19,
				pn: "285899",
				nama: "asdasd",
				jabatan: "Auditor",
			},
			{
				id: 20,
				pn: "285900",
				nama: "asdasd",
				jabatan: "Auditor",
			},
		],
	},
];