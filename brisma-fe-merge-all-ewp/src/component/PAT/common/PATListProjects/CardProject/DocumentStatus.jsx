import withMapStatus from "./withMapStatus";
import Status from "./Status";

const documentState = {
  "Draft": { text: "Draft", colorClass: "bg-primary-red" },
  "Pending Checker": { text: "Pending Checker", colorClass: "bg-primary-yellow" },
  "Pending Signer": { text: "Pending Signer", colorClass: "bg-primary-yellow" },
  "Pending Maker PSA": { text: "Pending Maker PSA", colorClass: "bg-primary-yellow" },
  "Pending Checker SKAI": { text: "Pending Checker SKAI", colorClass: "bg-primary-yellow" },
  "Pending Signer SKAI": { text: "Pending Signer SKAI", colorClass: "bg-primary-yellow" },
  "Final": { text: "Final", colorClass: "bg-primary-green" },
};

export default withMapStatus(documentState)(Status);
