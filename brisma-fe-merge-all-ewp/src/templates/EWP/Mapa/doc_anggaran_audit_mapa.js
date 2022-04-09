import moment from "moment";
import { numberWithCommas } from "../../../utils/helper";

const prepareData = (data) => {
  let total = 0;
  let tables = "";
  data.map((item, idx) => {
    tables = `${tables}
		<tr>
			<td style="text-align:center"><p style="font-size:16px">${idx + 1}</p></td>
			<td><p style="font-size:16px">${item.tipe_anggaran_name}</p></td>
			<td style="text-align:center"><p style="font-size:16px">${moment(item.tanggal).format(
        "dddd, DD-MMMM-YYYY"
      )}</p></td>
			<td><p style="font-size:16px">${item.deskripsi}</p></td>
			<td><p style="font-size:16px">Rp. ${numberWithCommas(item.amount)}</p></td>
		</tr>`;
    total = total + parseInt(item.amount);
  });
  tables = `${tables}
        <tr>
			<td colspan="4" rowspan="1"><p style="font-size:16px"><strong>Total</strong></p></td>
			<td><p style="font-size:16px">Rp. ${numberWithCommas(total)}</p></td>
		</tr>
    `;

  return tables;
};

const anggaranTable = (rows) => `
<style>
table, th, td {
  border: 1px solid;
}
</style>
    <figure class="table">
        <table style="width: 100%;" cellpadding="3" cellspacing="0">
            <thead>
                <tr>
                    <th scope="col" rowspan="2" style="background-color: #3C64B1; color: white;"><p style="font-size:16px">No</p></th>
                    <th scope="col" rowspan="2" style="background-color: #3C64B1; color: white;"><p style="font-size:16px">TipeAnggaran</p></th>
                    <th scope="col" rowspan="2" style="background-color: #3C64B1; color: white;"><p style="font-size:16px">Tanggal</p></th>
                    <th scope="col" rowspan="2" style="background-color: #3C64B1; color: white;"><p style="font-size:16px">Keterangan</p></th>
                    <th scope="col" rowspan="2" style="background-color: #3C64B1; color: white;"><p style="font-size:16px">Jumlah</p></th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    </figure>
`;

export const doc_anggaran_audit_mapa = (data) => anggaranTable(prepareData(data));
