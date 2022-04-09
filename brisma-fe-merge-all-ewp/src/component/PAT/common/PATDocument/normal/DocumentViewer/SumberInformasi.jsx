import { connect } from "react-redux";
import { fetchDocSumberInformasi } from "../../../../../../store/ducks/PATDocument/actions";
import BaseViewer from "./BaseViewer";

function SumberInformasi({ fetchDocSumberInformasi }) {
  return <BaseViewer fetch={fetchDocSumberInformasi} processData={(data) => data} />
}

const mapDispatchToProps = {
  fetchDocSumberInformasi: fetchDocSumberInformasi
}

export default connect(null, mapDispatchToProps)(SumberInformasi)