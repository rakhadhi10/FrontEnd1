import { connect } from "react-redux";
import {
  goNextStep,
  goPrevStep,
  updateEchannel,
} from "../../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/actions";
import {
  getEchannels,
  getRows,
  getSelectedTipeAudit,
  getSpecialTematikRows,
} from "../../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/selectors";
import EChannel from "../../../../../../common/PATJadwalAudit/Modal/ObjekAudit/EChannel";
import ObjekAudit from "../../../../common/Modal/common/ObjekAudit";
import UnitKerjaTab from "./UnitKerjaTab"

export const ObjekAuditNormal = ({ updateEchannel, ...props }) => {
  return (
    <ObjekAudit
      {...props}
      getRows={getRows}
      getEchannels={getEchannels}
      getSelectedTipeAudit={getSelectedTipeAudit}
      getSpecialTematikRows={getSpecialTematikRows}
      unitKerjaTab={<UnitKerjaTab />}
      echannelTab={<EChannel updateEchannel={updateEchannel} getEchannels={getEchannels} />}
    />
  )
};

const mapDispatchToProps = {
  next: goNextStep,
  prev: goPrevStep,
  updateEchannel: updateEchannel
};

const mapStateToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(ObjekAuditNormal);
