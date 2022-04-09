import withMapStatus from "./withMapStatus";
import Status from "./Status";

const documentState = {
  mapa: { text: "MAPA", colorClass: "bg-primary-yellow" },
  kkpa: { text: "KKPA", colorClass: "bg-primary-yellow" },
  kkpt: { text: "KKPT", colorClass: "bg-primary-blue" }
}

export default withMapStatus(Status, documentState)
