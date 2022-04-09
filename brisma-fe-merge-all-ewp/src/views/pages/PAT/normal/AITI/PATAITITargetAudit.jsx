import { connect } from "react-redux";
import EChannelTable from "../../../../../component/PAT/common/PATTargetAudit/EChannelTable";
import ObjekTable from "../../../../../component/PAT/common/PATTargetAudit/ObjekTable";
import TargetAuditLayout from "../../../../../component/PAT/common/PATTargetAudit/TargetAuditLayout";
import { fetchTargetAuditAITI } from "../../../../../store/ducks/PATTargetAudit/actions";
import { getTargetAuditAITI, getTargetAuditAITIError, getTargetAuditAITILoading } from "../../../../../store/ducks/PATTargetAudit/selectors";

function PATAITITargetAudit({ data, ...props }) {
  return (
    <TargetAuditLayout {...props}>
      <div className="grid grid-cols-2 items-start gap-4">
        <div className="w-full">
          <ObjekTable data={data.objek} />
        </div>
        <div className="w-full">
          <EChannelTable data={data.echannel} />
        </div>
      </div>
    </TargetAuditLayout>
  );
}

const mapStateToProps = state => ({
  loading: getTargetAuditAITILoading(state),
  error: getTargetAuditAITIError(state),
  data: getTargetAuditAITI(state)
})

const mapDispatchToProps = {
  fetchTargetAudit: fetchTargetAuditAITI
}

export default connect(mapStateToProps, mapDispatchToProps)(PATAITITargetAudit)
