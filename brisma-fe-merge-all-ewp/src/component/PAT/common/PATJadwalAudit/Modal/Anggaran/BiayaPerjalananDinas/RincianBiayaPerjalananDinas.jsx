import { connect } from "react-redux";
import RincianBiaya from "../../../../../common/RincianBiaya";

const RincianBiayaPerjalananDinas = ({ rincian_biaya, getBiayaDinas }) => (
  <RincianBiaya
    title="RINCIAN BIAYA PERJALANAN DINAS"
    data={rincian_biaya}
  />
)

const mapStateToProps = (state, ownProps) => {
  const biaya_dinas = ownProps.getBiayaDinas(state)
  const jabatanYangSudah = []
  const data = []
  const counts = {}

  // Hitung berapa banyak anggota dengan jabatan yang sama
  biaya_dinas.forEach(a => {
    const title = a.pn_auditor.jabatan
    if (counts[title]) {
      counts[title] += 1
    } else {
      counts[title] = 1
    }
  })

  biaya_dinas.forEach(b => {
    const title = b.pn_auditor.jabatan
    if (jabatanYangSudah.includes(title)) return
    jabatanYangSudah.push(title)
    const parentLabel = `${title} ${counts[title] && counts[title] > 1 ? `(x${counts[title]})` : ""}`
    const a = {
      parent: {
        label: parentLabel,
        amount: b.biaya_tiket_pp + b.biaya_transport_lokal + b.biaya_perjalanan_hari + b.biaya_akomodasi
      },
      children: [
        {
          label: "Tiket PP",
          amount: b.biaya_tiket_pp
        },
        {
          label: "Transport Lokal",
          amount: b.biaya_transport_lokal
        },
        {
          label: "Uang Harian",
          amount: b.biaya_perjalanan_hari
        },
        {
          label: "Biaya Akomodasi",
          amount: b.biaya_akomodasi
        },
      ]
    }
    data.push(a)
  })

  return { rincian_biaya: data }
}

export default connect(mapStateToProps)(RincianBiayaPerjalananDinas)

