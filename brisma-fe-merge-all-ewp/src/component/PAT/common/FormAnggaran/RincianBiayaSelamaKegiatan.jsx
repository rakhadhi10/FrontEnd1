import { connect } from "react-redux";
import RincianBiaya from "../RincianBiaya";

const RincianBiayaSelamaKegiatan = ({ rincian_biaya, getBiayaKegiatan }) => (
  <RincianBiaya
    title="RINCIAN BIAYA SELAMA KEGIATAN"
    data={rincian_biaya}
  />
)

const mapStateToProps = (state, ownProps) => {
  const biaya_kegiatan = ownProps.getBiayaKegiatan(state)
  const rincian_biaya = []
  Object.keys(biaya_kegiatan).forEach(p => {
    const parentLabel = p
    const parentAmount = Object.keys(biaya_kegiatan[p]).reduce((prev, curr) => prev + parseInt(biaya_kegiatan[p][curr]), 0)

    const children = Object.keys(biaya_kegiatan[p]).map(c => ({
      label: c,
      amount: biaya_kegiatan[p][c]
    }))

    rincian_biaya.push({
      parent: { label: parentLabel, amount: parentAmount },
      children
    })
  })
  return { rincian_biaya }
}

export default connect(mapStateToProps)(RincianBiayaSelamaKegiatan)
