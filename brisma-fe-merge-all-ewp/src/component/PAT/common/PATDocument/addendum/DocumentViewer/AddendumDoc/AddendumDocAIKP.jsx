import { connect } from "react-redux";
import { fetchDocContent } from "../../../../../../../store/ducks/AddendumPATDocument/actions";
import { getAllStatus } from "../../../../../../../store/ducks/PATProject/selectors";
import { generateHtmlAddendumAikp } from "../../../../../../../templates/addendum AIKP";
import BaseViewer from "../BaseViewer";

function AddendumDocAIKP(props) {
  const { tahun, fetchDocContent } = props

  return <BaseViewer
    fetch={fetchDocContent}
    processData={(data) => generateHtmlAddendumAikp({ tahun, data })}
    {...props}
  />
}

const mapDispatchToProps = {
  fetchDocContent: fetchDocContent
}

const mapStateToProps = state => ({
  tahun: getAllStatus(state).tahun
})

export default connect(mapStateToProps, mapDispatchToProps)(AddendumDocAIKP)