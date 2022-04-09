import { connect } from "react-redux";
import { fetchDocLatarBelakang } from "../../../../../../store/ducks/PATDocument/actions";
import BaseViewer from "./BaseViewer";

function LatarBelakangTujuan({ fetchDocLatarBelakang }) {
  return <BaseViewer fetch={fetchDocLatarBelakang} processData={(data) => data} />
}

const mapDispatchToProps = {
  fetchDocLatarBelakang: fetchDocLatarBelakang
}

export default connect(null, mapDispatchToProps)(LatarBelakangTujuan)