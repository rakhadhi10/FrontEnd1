export const doc_tim_audit_mapa = (data) => `
    <table border="0" cellpadding="1" cellspacing="1" style="width:500px">
	<tbody>
		<tr>
			<td><span style="font-size:20px"><strong>Manager Audit</strong></span></td>
			<td><span style="font-size:20px">:</span></td>
			<td><span style="font-size:20px">${data.ma.pn} - ${data.ma.nama}</span></td>
		</tr>
		<tr>
			<td><span style="font-size:20px"><strong>Ketua Tim Audit</strong></span></td>
			<td><span style="font-size:20px">:</span></td>
			<td><span style="font-size:20px">${data.kta.pn} - ${data.kta.nama}</span></td>
		</tr>
		${ataData(data.ata)}
	</tbody>
</table>
`;

const ataData = (data) => {
  return data.map((item, idx) => {
    if (idx == 0) {
      return `
            <tr>
			<td><span style="font-size:20px"><strong>Anggota Tim Audit</strong></span></td>
			<td><span style="font-size:20px">:</span></td>
			<td><span style="font-size:20px">${item.pn} - ${item.nama}</span></td>
            </tr>
		</tr>
            `;
    } else {
      return `
        <tr>
			<td><span style="font-size:20px">&nbsp;</span></td>
			<td><span style="font-size:20px">&nbsp;</span></td>
			<td><span style="font-size:20px">${item.pn} - ${item.nama}</span></</td>
		</tr>
            `;
    }
  });
};
