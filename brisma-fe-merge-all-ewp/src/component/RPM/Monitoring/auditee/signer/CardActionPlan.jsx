import TableActionPlan from "./TableActionPlan"
import CardActionPlan from "../../common/CardActionPlan";

export default function CardActionPlanSignerAuditee(props) {
  return (
    <CardActionPlan {...props} table={<TableActionPlan {...props} />} />
  )
}