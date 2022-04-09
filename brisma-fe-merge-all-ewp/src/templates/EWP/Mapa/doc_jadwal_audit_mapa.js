import moment from "moment";

export const doc_jadwal_audit_mapa = (data) => `
<style>
table, th, td {
  border: 1px solid;
}
</style>
<figure>
    <table style="width: 100%;">
        <thead>
            <tr>
                <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">No</p></th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Kegiatan</p></th>
                <th rowspan="2" style="background-color: #3C64B1; color: white;"> <p style="text-align:center;">Jadwal</p></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><p style="text-align:center;">1</p></td>
                <td><p style="text-align:center;">Penyununan MAPA</p</td>
                <td><p style="text-align:center;">${moment(
                  data[0].penyusunan_mapa_plan_start
                ).format("dddd, DD MMMM YYYY")}</p></td>
            </tr>
            <tr>
                <td><p style="text-align:center;">2</p></td>
                <td><p style="text-align:center;">Entrance Meeting</p</td>
                <td><p style="text-align:center;">${moment(
                  data[0].entrance_meeting_plan_start
                ).format("dddd, DD MMMM YYYY")}</p></td>
            </tr>
            <tr>
                <td><p style="text-align:center;">3</p></td>
                <td><p style="text-align:center;">Pelaksanaan Audit</p</td>
                <td><p style="text-align:center;">${moment(
                  data[0].pelaksanaan_audit_plan_start
                ).format("dddd, DD MMMM YYYY")}</p></td>
            </tr>
            <tr>
                <td><p style="text-align:center;">4</p></td>
                <td><p style="text-align:center;">Exit Meeting</p</td>
                <td><p style="text-align:center;">${moment(data[0].exit_meeting_plan_start).format(
                  "dddd, DD MMMM YYYY"
                )}</p></td>
            </tr>
            <tr>
                <td><p style="text-align:center;">5</p></td>
                <td><p style="text-align:center;">Surat Hasil Audit</p</td>
                <td><p style="text-align:center;">${moment(
                  data[0].Penyusunan_LHA_plan_start
                ).format("dddd, DD MMMM YYYY")}</p></td>
            </tr>
            <tr>
                <td><p style="text-align:center;">6</p></td>
                <td><p style="text-align:center;">Wrapup Meeting</p</td>
                <td><p style="text-align:center;">${moment(
                  data[0].Wrapup_Meeting_plan_start
                ).format("dddd, DD MMMM YYYY")}</p></td>
            </tr>
        </tbody>
    </table>
</figure>
`;
