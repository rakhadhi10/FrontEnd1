import TableActionPlan from "./TableActionPlan"
import CardActionPlan from "../../common/CardActionPlan";

export default function CardActionPlanMakerAuditor(props) {
  return (
    <CardActionPlan {...props} table={<TableActionPlan {...props} />} />
  )
}