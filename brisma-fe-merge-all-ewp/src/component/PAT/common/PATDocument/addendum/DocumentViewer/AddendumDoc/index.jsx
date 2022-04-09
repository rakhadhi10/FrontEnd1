import { connect } from "react-redux";
import { getAllStatus } from "../../../../../../../store/ducks/PATProject/selectors";
import AddendumDocAIKP from "./AddendumDocAIKP";
import AddendumDocAITI from "./AddendumDocAITI";
import AddendumDocAIW from "./AddendumDocAIW";

const KNS = "kns"
const AITI = "aiti"
const AIKP = "aikp"

const AddendumDoc = ({ status }) => {
  const { kode } = status
  if (kode.includes(KNS)) return <AddendumDocAIW />
  if (kode.includes(AITI)) return <AddendumDocAITI />
  if (kode.includes(AIKP)) return <AddendumDocAIKP />
  return (
    <div className="flex justify-center">
      <p>Something went wrong</p>
      <p>Kode PAT tidak termasuk dalam KNS/AITI/AIKP</p>
    </div>
  )
}

const mapStateToProps = state => ({ status: getAllStatus(state) })

export default connect(mapStateToProps)(AddendumDoc)
