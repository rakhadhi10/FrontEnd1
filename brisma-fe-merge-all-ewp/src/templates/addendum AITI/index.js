import moment from "moment";
import { getHtml } from "./html";
import { getAddendumAITITable } from "./tabel_addendum";

export const generateHtmlAddendumAiti = ({ tahun, data, signers }) => {
  const table_addendum = getAddendumAITITable(data);
  const html = getHtml(
    table_addendum,
    tahun,
    moment().format("DD MMMM YYYY"),
    signers,
  );

  return html;
};
