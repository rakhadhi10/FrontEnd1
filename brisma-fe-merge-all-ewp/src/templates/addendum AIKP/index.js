import moment from "moment";
import { getHtml } from "./html";
import { getAddendumAIKPTable } from "./tabel_addendum";

export const generateHtmlAddendumAikp = ({ tahun, data, signers }) => {
  const table_addendum = getAddendumAIKPTable(data);
  const html = getHtml(
    table_addendum,
    tahun,
    moment().format("DD MMMM YYYY"),
    signers,
  );

  return html;
};
