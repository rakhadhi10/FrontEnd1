import { connect } from "react-redux";
import { fetchDocContent } from "../../../../../../../store/ducks/AddendumPATDocument/actions";
import { getAllStatus } from "../../../../../../../store/ducks/PATProject/selectors";
import { generateHtmlAddendumAiti } from "../../../../../../../templates/addendum AITI";
import BaseViewer from "../BaseViewer";

function AddendumDocAITI(props) {
  const { tahun, fetchDocContent } = props
  return <BaseViewer
    fetch={fetchDocContent}
    processData={(data) => generateHtmlAddendumAiti({ tahun, data })}
  />
}

const mapDispatchToProps = {
  fetchDocContent: fetchDocContent
}

const mapStateToProps = state => ({
  tahun: getAllStatus(state).tahun
})

export default connect(mapStateToProps, mapDispatchToProps)(AddendumDocAITI)