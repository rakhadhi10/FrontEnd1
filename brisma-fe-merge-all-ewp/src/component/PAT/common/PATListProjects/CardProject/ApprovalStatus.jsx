import withMapStatus from "./withMapStatus";
import Status from "./Status";

const approvalState = {
  "Draft": { text: "Draft", colorClass: "bg-primary-red" },
  "Pending Checker": { text: "Pending Checker", colorClass: "bg-primary-yellow" },
  "Pending Signer": { text: "Pending Signer", colorClass: "bg-primary-yellow" },
  "Pending Maker PSA": { text: "Pending Maker PSA", colorClass: "bg-primary-yellow" },
  "Pending Checker SKAI": { text: "Pending Checker SKAI", colorClass: "bg-primary-yellow" },
  "Pending Signer SKAI": { text: "Pending Signer SKAI", colorClass: "bg-primary-yellow" },
  "Final": { text: "Final", colorClass: "bg-primary-green" },
  "Tolak Checker": { text: "Tolak Checker", colorClass: "bg-primary-red" },
  "Tolak Signer": { text: "Tolak Signer", colorClass: "bg-primary-red" },
  "Tolak Maker PSA": { text: "Tolak Maker PSA", colorClass: "bg-primary-red" },
  "Tolak Checker SKAI": { text: "Tolak Checker SKAI", colorClass: "bg-primary-red" },
  "Tolak Signer SKAI": { text: "Tolak Signer SKAI", colorClass: "bg-primary-red" },
};

export default withMapStatus(approvalState)(Status);
