import moment from "moment";

export const backendFormat = "YYYY/MM/DD";
export const frontendFormat = "DD/MM/YYYY";

export const dateToCardDateString = (...args) =>
  moment(...args).format("DD MMMM YYYY");
export const dateToCardJadwalAuditDateString = (...args) =>
  moment(...args).format("DD-MM-YYYY");
export const dateToSlashFormat = (...args) =>
  moment(...args).format("DD/MM/YYYY");
export const dateToLogFormat = (...args) =>
  moment(...args).format("DD MMM YYYY hh:mm A");
