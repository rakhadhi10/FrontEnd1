import { connect } from "react-redux";
import { addBiayaDinas } from "../../../../../../../../store/ducks/PATAnggaran/actions";
import { getAnggota, getBiayaDinas } from "../../../../../../../../store/ducks/PATAnggaran/selectors";
import { mapAnggotaToDinasFormOptions } from "../../../../../../../utils/mapData";
import AnggaranLayout from "../../../../../FormAnggaran/AnggaranLayout";
import FormBiayaPerjalananDinas from "../../../../../FormAnggaran/FormBiayaPerjalananDinas";
import RincianBiaya from "../../../../../RincianBiaya";

function BiayaPerjalananDinas({ addBiayaDinas, options, rincian_biaya }) {
  return (
    <AnggaranLayout>
      <FormBiayaPerjalananDinas options={options} addBiayaDinas={addBiayaDinas} />
      <RincianBiaya title="RINCIAN BIAYA PERJALANAN DINAS" data={rincian_biaya} />
    </AnggaranLayout>
  );
}

const mapStateToProps = state => {
  const anggota = getAnggota(state)
  const options = mapAnggotaToDinasFormOptions(anggota)

  const biaya_dinas = getBiayaDinas(state)
  const rincian_biaya = mapBiayaDinasToRincianBiaya(biaya_dinas)

  return { options, rincian_biaya }
}

const mapDispatchToProps = {
  addBiayaDinas: addBiayaDinas
}

export default connect(mapStateToProps, mapDispatchToProps)(BiayaPerjalananDinas)

function mapBiayaDinasToRincianBiaya(biaya_dinas) {
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
    if (data.some(d => d.parent.label.includes(title))) return
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

  return data
}
