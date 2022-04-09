import { connect } from "react-redux";
import EChannelTable from "../../../../../component/PAT/common/PATTargetAudit/EChannelTable";
import UkerTable from "../../../../../component/PAT/common/PATTargetAudit/UkerTable";
import TargetAuditLayout from "../../../../../component/PAT/common/PATTargetAudit/TargetAuditLayout";
import { fetchTargetAuditAIW } from "../../../../../store/ducks/AddendumPATTargetAudit/actions";
import { getTargetAuditAIW, getTargetAuditAIWError, getTargetAuditAIWLoading } from "../../../../../store/ducks/AddendumPATTargetAudit/selectors";

function PATAIWTargetAudit({ data, ...props }) {
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
  loading: getTargetAuditAIWLoading(state),
  error: getTargetAuditAIWError(state),
  data: getTargetAuditAIW(state)
})

const mapDispatchToProps = {
  fetchTargetAudit: fetchTargetAuditAIW
}

export default connect(mapStateToProps, mapDispatchToProps)(PATAIWTargetAudit)
