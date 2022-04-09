import { connect } from "react-redux";
import moment from "moment";
import EChannelForm from "../../../../../../common/PATJadwalAudit/EChannelForm";
import { backendFormat } from "../../../../../../../../utils/momentHelpers";

const EChannel = ({ initialValue, updateEchannel }) => {
  return <EChannelForm initialValue={initialValue} updateEchannel={updateEchannel} />
}

const mapStateToProps = (state, ownProps) => {
  const init = { ...ownProps.getEchannels(state) }
  Object.keys(init).forEach(key => {
    if (init[key].posisi_data) {
      init[key].posisi_data = moment(init[key].posisi_data, backendFormat);
    }
  })

  return { initialValue: init }
}

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(EChannel)