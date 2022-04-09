export const getHtmlKondisiKkpt = (data) => {

    return `
    <p style="margin-bottom: 20px;"><strong>KONDISI</strong></p>
    <p style="font-size: 12px;font-weight: bold;">Kondisi</p>

    <p>Berdasarkan hasil pemeriksaan terhadap rekening persediaan percetakan di AIW XXXXXXX periode audit 01 Januari 2021 s.d 31 Desember 2021. Ditemukan kelemahan sebagai berikut:
        Terdapat rekening persediaan percetakan yang tidak di buku menjadi biaya sejak bulan Juli 2020
        </p>

        <div style="margin-top:10px;margin-bottom: 10px">${data.kondisi_data}</div>

        <p style="font-size: 12px;font-weight: bold;">Kelemahan pengendalian intern</p>
        <div style="margin-top:10px;margin-bottom: 10px">${data.kpi}</div>
    `
}