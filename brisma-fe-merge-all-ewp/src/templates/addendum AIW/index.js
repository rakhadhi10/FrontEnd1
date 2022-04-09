import moment from "moment";
import { getHtml } from "./html";
import { getAddendumAIWTable } from "./tabel_addendum";

export const generateHtmlAddendumAiw = ({ tahun, data, signers }) => {
  const table_addendum = getAddendumAIWTable(data);
  const html = getHtml(
    table_addendum,
    tahun,
    moment().format("DD MMMM YYYY"),
    signers,
  );

  return html;
};
