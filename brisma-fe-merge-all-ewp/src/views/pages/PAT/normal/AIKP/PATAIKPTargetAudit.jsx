import { connect } from "react-redux";
import EChannelTable from "../../../../../component/PAT/common/PATTargetAudit/EChannelTable";
import UkerTable from "../../../../../component/PAT/common/PATTargetAudit/UkerTable";
import TargetAuditLayout from "../../../../../component/PAT/common/PATTargetAudit/TargetAuditLayout";
import { fetchTargetAuditAIKP } from "../../../../../store/ducks/PATTargetAudit/actions";
import { getTargetAuditAIKP, getTargetAuditAIKPError, getTargetAuditAIKPLoading } from "../../../../../store/ducks/PATTargetAudit/selectors";

function PATAIKPTargetAudit({ data, ...props }) {
  return (
    <TargetAuditLayout {...props}>
      <div className="grid grid-cols-2 items-start gap-4">
        <div className="w-full">
          <UkerTable data={data.uker} />
        </div>
        <div className="w-full">
          <EChannelTable data={data.echannel} />
        </div>
      </div>
    </TargetAuditLayout>
  );
}

const mapStateToProps = state => ({
  loading: getTargetAuditAIKPLoading(state),
  error: getTargetAuditAIKPError(state),
  data: getTargetAuditAIKP(state)
})

const mapDispatchToProps = {
  fetchTargetAudit: fetchTargetAuditAIKP
}

export default connect(mapStateToProps, mapDispatchToProps)(PATAIKPTargetAudit)
