import { connect } from "react-redux";
import { goNextStep, goPrevStep, updateEchannel } from "../../../../../../../../store/ducks/AddendumPATAIKPJadwalAudit/actions";
import { getEchannels, getSpecialTematikRows } from "../../../../../../../../store/ducks/AddendumPATAIKPJadwalAudit/selectors";
import ObjekAudit from "../../../../common/Modal/common/ObjekAudit";
import EChannel from "../../../../../../common/PATJadwalAudit/Modal/ObjekAudit/EChannel";
import UnitKerjaTabNormal from "./UnitKerja/UnitKerjaTab";

export const ObjekAuditNormal = ({ updateEchannel, ...props }) => {
  return (
    <ObjekAudit
      {...props}
      getSpecialTematikRows={getSpecialTematikRows}
      getEchannels={getEchannels}
      unitKerjaTab={<UnitKerjaTabNormal />}
      echannelTab={<EChannel updateEchannel={updateEchannel} getEchannels={getEchannels} />}
    />
  )
};

const mapDispatchToProps = {
  next: goNextStep,
  prev: goPrevStep,
  updateEchannel: updateEchannel
}

const mapStateToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(ObjekAuditNormal)