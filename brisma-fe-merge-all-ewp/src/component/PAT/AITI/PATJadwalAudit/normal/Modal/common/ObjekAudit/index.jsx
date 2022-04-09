import { connect } from "react-redux";
import UnitKerjaTab from "./UnitKerja/UnitKerjaTab";
import { goNextStep, goPrevStep, updateEchannel } from "../../../../../../../../store/ducks/PATAITIJadwalAudit/actions";
import { getEchannels, getRows } from "../../../../../../../../store/ducks/PATAITIJadwalAudit/selectors";
import ObjekAudit from "../../../../common/Modal/common/ObjekAudit";
import EChannel from "../../../../common/Modal/common/ObjekAudit/EChannel"

export const ObjekAuditNormal = ({ updateEchannel, ...props }) => {
  return (
    <ObjekAudit
      {...props}
      getRows={getRows}
      getEchannels={getEchannels}
      unitKerjaTab={<UnitKerjaTab />}
      echannelTab={<EChannel updateEchannel={updateEchannel} getEchannels={getEchannels} />}
    />
  )
};

const mapDispatchToProps = {
  next: goNextStep,
  prev: goPrevStep,
  updateEchannel: updateEchannel
}

export default connect(null, mapDispatchToProps)(ObjekAuditNormal)