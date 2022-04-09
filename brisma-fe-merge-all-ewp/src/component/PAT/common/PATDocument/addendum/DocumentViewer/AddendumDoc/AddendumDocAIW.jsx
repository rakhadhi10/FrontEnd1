import { connect } from "react-redux";
import { fetchDocContent } from "../../../../../../../store/ducks/AddendumPATDocument/actions";
import { getAllStatus } from "../../../../../../../store/ducks/PATProject/selectors";
import { generateHtmlAddendumAiw } from "../../../../../../../templates/addendum AIW";
import BaseViewer from "../BaseViewer";

function AddendumDocAIW(props) {
  const { tahun, fetchDocContent } = props
  return <BaseViewer
    fetch={fetchDocContent}
    processData={(data) => generateHtmlAddendumAiw({ tahun, data })}
    {...props}
  />
}

const mapDispatchToProps = {
  fetchDocContent: fetchDocContent
}

const mapStateToProps = state => ({
  tahun: getAllStatus(state).tahun
})

export default connect(mapStateToProps, mapDispatchToProps)(AddendumDocAIW)