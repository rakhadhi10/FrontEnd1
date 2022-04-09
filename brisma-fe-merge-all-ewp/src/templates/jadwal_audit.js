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
              ${d.jadwal_audit.tipe_audit === "Regular Audit" ? d.jadwal_audit.uker : `${d.jadwal_audit.uker}, ...`}
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
              ${Object.keys(d.targetAudit.count_target_jenis_auditee.existing).map(k => {
                const existing = d.targetAudit.count_target_jenis_auditee.existing[k] || 0
                const target = d.targetAudit.count_target_jenis_auditee.target[k] || 0
                const percent = Math.round(Number(target) / Number(existing) * 100);
                return `
                  <p>
                      ${k}: [${existing}][${target}] ${percent}%&nbsp;
                  </p>
                `;
              }).join("")}
          </td>
      </tr>`;
		})
		.join("");
};

export const jadwal_audit = (rows) => `
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
			id: 2,
			tipe_audit: "Regular Audit",
			nama_kegiatan: "AIWJakarta_Reguler_Test1",
			pat_id: 1,
			uka: "kns1",
			tim_audit_name: "Tim AIW 2",
			total_anggaran: 12769,
			pn_pic_jadwal_audit: "119884",
			nama_pic_jadwal_audit: "Vcqlr_y axdulvxynsyyh Tyrxytgyn",
			jabatan_pic_jadwal_audit: "JUNIOR AUDITOR 1",
			pelaksanaan_start: "2021-08-03 00:00:00+07",
			pelaksanaan_end: "2021-12-31 00:00:00+07",
			tim_id: 3,
			pn_ma: "25433",
			nama_ma: "Bxyyrtm",
			jabatan_ma: "JUNIOR AUDITOR 2",
			pn_kta: "68331",
			nama_kta: "Txytgmr Rxzr_xyaxdux Iyhtxmbmlmn",
			jabatan_kta: "GROUP HEAD",
			ata: [
				{
					id_ata: 5,
					pn_ata: "175133",
					nama_ata: "axdunaxdurqy Lqsmyny",
					jabatan: "ASSOCIATE AUDITOR",
				},
				{
					id_ata: 6,
					pn_ata: "26335",
					nama_ata: "Ymymr_ VcTg_xdulyTg_xduyrmyn",
					jabatan: "KEPALA AUDIT INTERN KANTOR WILAYAH",
				},
				{
					id_ata: 7,
					pn_ata: "30933",
					nama_ata: "axdushyaxdux VcympyTg_xduy",
					jabatan: "GROUP HEAD",
				},
				{
					id_ata: 8,
					pn_ata: "143369",
					nama_ata: "Dqaxdux Hqrmyntm",
					jabatan: "AUDITOR 1",
				},
				{
					id_ata: 9,
					pn_ata: "7339",
					nama_ata: "NTg_xduytgryhynx DqTg_xdux PTg_xduspxtysyrx",
					jabatan: "GROUP HEAD",
				},
				{
					id_ata: 10,
					pn_ata: "1433",
					nama_ata: "Rxnylaxdux axdunTg_xduyr",
					jabatan: "GROUP HEAD",
				},
			],
		},
		targetAudit: {
			count_target_jenis_auditee: {
				existing: {
					aiw: "1",
					kanwil: "1",
					kc: "24",
					kcp: "34",
					kk: "29",
					unit: "271",
				},
				target: {
					aiw: "0",
					kanwil: "0",
					kc: "0",
					kcp: "1",
					kk: "0",
					unit: "2",
				},
			},
		},
	},
	{
		jadwal_audit: {
			id: 3,
			tipe_audit: "Special Audit",
			nama_kegiatan: "AIWJakarta2_Special_Test1",
			pat_id: 1,
			uka: "kns1",
			tim_audit_name: "Tim AIW 2",
			total_anggaran: 13132,
			pn_pic_jadwal_audit: "119884",
			nama_pic_jadwal_audit: "Vcqlr_y axdulvxynsyyh Tyrxytgyn",
			jabatan_pic_jadwal_audit: "JUNIOR AUDITOR 1",
			pelaksanaan_start: "2021-06-30 00:00:00+07",
			pelaksanaan_end: "2021-12-22 00:00:00+07",
			tim_id: 3,
			pn_ma: "25433",
			nama_ma: "Bxyyrtm",
			jabatan_ma: "JUNIOR AUDITOR 2",
			pn_kta: "68331",
			nama_kta: "Txytgmr Rxzr_xyaxdux Iyhtxmbmlmn",
			jabatan_kta: "GROUP HEAD",
			ata: [
				{
					id_ata: 5,
					pn_ata: "175133",
					nama_ata: "axdunaxdurqy Lqsmyny",
					jabatan: "ASSOCIATE AUDITOR",
				},
				{
					id_ata: 6,
					pn_ata: "26335",
					nama_ata: "Ymymr_ VcTg_xdulyTg_xduyrmyn",
					jabatan: "KEPALA AUDIT INTERN KANTOR WILAYAH",
				},
				{
					id_ata: 7,
					pn_ata: "30933",
					nama_ata: "axdushyaxdux VcympyTg_xduy",
					jabatan: "GROUP HEAD",
				},
				{
					id_ata: 8,
					pn_ata: "143369",
					nama_ata: "Dqaxdux Hqrmyntm",
					jabatan: "AUDITOR 1",
				},
				{
					id_ata: 9,
					pn_ata: "7339",
					nama_ata: "NTg_xduytgryhynx DqTg_xdux PTg_xduspxtysyrx",
					jabatan: "GROUP HEAD",
				},
				{
					id_ata: 10,
					pn_ata: "1433",
					nama_ata: "Rxnylaxdux axdunTg_xduyr",
					jabatan: "GROUP HEAD",
				},
			],
		},
		targetAudit: {
			count_target_jenis_auditee: {
				existing: {
					aiw: "1",
					kanwil: "1",
					kc: "24",
					kcp: "34",
					kk: "29",
					unit: "271",
				},
				target: {
					aiw: "0",
					kanwil: "0",
					kc: "0",
					kcp: "1",
					kk: "0",
					unit: "2",
				},
			},
		},
	},
];
