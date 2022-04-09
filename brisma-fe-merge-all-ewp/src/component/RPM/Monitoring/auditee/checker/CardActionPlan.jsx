import TableActionPlan from "./TableActionPlan"
import CardActionPlan from "../../common/CardActionPlan";

export default function CardActionPlanCheckerAuditee(props) {
  return (
    <CardActionPlan {...props} table={<TableActionPlan {...props} />} />
  )
}