import moment from "moment";

export const prepareData = (data) => {
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
              ${d.jadwal_audit.tipe_audit === "Regular Audit" ? d.jadwal_audit.objek : `${d.jadwal_audit.objek}, ...`}
          </td>
          <td>
              ${d.jadwal_audit.tim_audit_name}
          </td>
          <td>
              ${d.jadwal_audit.tipe_audit}
          </td>
          ${[...Array(12)].map(
						(_, idxm) =>
							`<td ${
								idxm + 1 >= start_month && idxm + 1 <= end_month
									? 'style="background-color:hsl(210, 75%, 60%);"'
									: ""
							}"></td>`,
					)}
          <td>
              ${d.targetAudit.count_target_jenis_auditee.existing.map(k => {
                const existing = k.count || 0;
                const target =
									d.targetAudit.count_target_jenis_auditee.target[k.nama] 
                  ? d.targetAudit.count_target_jenis_auditee.target[k.nama].count || 0
                  : 0
                const percent = Math.round(Number(target) / Number(existing) * 100);
                return `
                  <p>
                      ${k.nama}: [${existing}][${target}] ${percent}%&nbsp;
                  </p>
                `;
              }).join("")}
          </td>
      </tr>`;
		})
		.join("");
};

export const jadwal_audit_aiti = (rows) => `
<figure class="table">
    <table>
        <thead>
            <tr>
                <th rowspan="2">
                    <p style="text-align:center;">
                        No
                    </p>
                    <p style="text-align:center;">
                        &nbsp;
                    </p>
                </th>
                <th rowspan="2">
                    <p style="text-align:center;">
                        Objek Audit
                    </p>
                    <p style="text-align:center;">
                        &nbsp;
                    </p>
                </th>
                <th rowspan="2">
                    <p style="text-align:center;">
                        Tim Audit
                    </p>
                    <p style="text-align:center;">
                        &nbsp;
                    </p>
                </th>
                <th rowspan="2">
                    <p style="text-align:center;">
                        Tipe Audit
                    </p>
                    <p style="text-align:center;">
                        &nbsp;
                    </p>
                </th>
                <th colspan="12">
                    <p style="text-align:center;">
                        Periode
                    </p>
                </th>
                <th rowspan="2">
                    <p style="text-align:center;">
                        Objek Audit
                    </p>
                    <p style="text-align:center;">
                        &nbsp;
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
            ${rows}
        </tbody>
    </table>
</figure>`;

export const exampleData = [
	{
		jadwal_audit: {
			id: 4,
			tipe_audit: "Tematik",
			nama_kegiatan: "AITI_Tematik_Test1",
			pat_id: 21,
			uka: "aiti1",
			tim_audit_name: "Tim AITI 1",
			total_anggaran: 179,
			pn_pic_jadwal_audit: "133768",
			nama_pic_jadwal_audit: "Dxty KTg_xdurnxyTg_xduyty",
			jabatan_pic_jadwal_audit: "AUDITOR 1",
			pelaksanaan_start: "2021-12-27 00:00:00+07",
			pelaksanaan_end: "2022-01-05 00:00:00+07",
			tim_id: 2,
			pn_ma: "118876",
			nama_ma: "Rxcr_y Ryhmyaxduhynx",
			jabatan_ma: "JUNIOR AUDITOR 2",
			pn_kta: "1127",
			nama_kta: "VcTg_xduhymyaxdu Iyhtxaxduxr_ HqrTg_xduTg_xduxbmTg_xdum",
			jabatan_kta: "KEPALA AUDIT INTERN KANTOR PUSAT",
			tipe_objek: "Tata Kelola TI",
			objek: "Tata Kelola TI",
			ata: [
				{
					id_ata: 4,
					pn_ata: "119982",
					nama_ata: "ByytgTg_xdus Pxr_Tg_xdur_Tg_xduh NTg_xduytgryhyntm",
				},
				{
					id_ata: 5,
					pn_ata: "78115",
					nama_ata: "Gxty PymTg_xduncyr_",
				},
			],
		},
		targetAudit: {
			count_target_jenis_auditee: {
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
					"Tata Kelola TI": 1,
					Aplikasi: 1,
					Infrastruktur: 0,
					Keamanan: 0,
					"Pengadaan TI": 0,
					"Jasa pihak ketiga TI": 0,
					"Pemulihan Bencana": 0,
					"Jasa TI oleh Bank": 0,
					"Anak Perusahaan": 0,
					Lainnya: 0,
				},
			},
		},
	},
	{
		jadwal_audit: {
			id: 6,
			tipe_audit: "Regular Audit",
			nama_kegiatan: "AITI_Reguler_Test1",
			pat_id: 21,
			uka: "aiti1",
			tim_audit_name: "Tim AITI 1",
			total_anggaran: 380710,
			pn_pic_jadwal_audit: "133768",
			nama_pic_jadwal_audit: "Dxty KTg_xdurnxyTg_xduyty",
			jabatan_pic_jadwal_audit: "AUDITOR 1",
			pelaksanaan_start: "2021-09-15 00:00:00+07",
			pelaksanaan_end: "2021-12-20 00:00:00+07",
			tim_id: 2,
			pn_ma: "118876",
			nama_ma: "Rxcr_y Ryhmyaxduhynx",
			jabatan_ma: "JUNIOR AUDITOR 2",
			pn_kta: "1127",
			nama_kta: "VcTg_xduhymyaxdu Iyhtxaxduxr_ HqrTg_xduTg_xduxbmTg_xdum",
			jabatan_kta: "KEPALA AUDIT INTERN KANTOR PUSAT",
			tipe_objek: "Infrastruktur",
			objek: "Data Center (DC)",
			ata: [
				{
					id_ata: 4,
					pn_ata: "119982",
					nama_ata: "ByytgTg_xdus Pxr_Tg_xdur_Tg_xduh NTg_xduytgryhyntm",
				},
				{
					id_ata: 5,
					pn_ata: "78115",
					nama_ata: "Gxty PymTg_xduncyr_",
				},
			],
		},
		targetAudit: {
			count_target_jenis_auditee: {
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
					"Tata Kelola TI": 0,
					Aplikasi: 0,
					Infrastruktur: 1,
					Keamanan: 1,
					"Pengadaan TI": 1,
					"Jasa pihak ketiga TI": 0,
					"Pemulihan Bencana": 1,
					"Jasa TI oleh Bank": 0,
					"Anak Perusahaan": 0,
					Lainnya: 0,
				},
			},
		},
	},
];