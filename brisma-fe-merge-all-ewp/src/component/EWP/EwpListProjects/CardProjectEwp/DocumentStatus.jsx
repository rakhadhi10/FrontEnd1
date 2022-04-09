import withMapStatus from "./withMapStatus";
import Status from "./Status";

const documentState = {
  draft: { text: "Draft", colorClass: "bg-primary-red" },
  waiting: { text: "Waiting", colorClass: "bg-primary-yellow" },
  final: { text: "Final", colorClass: "bg-primary-green" }
}

export default withMapStatus(Status, documentState)
