import { connect } from "react-redux";
import { getStatusCode } from "../../../../../../store/ducks/PATDocument/selectors";
import ActionsMakerPusat from "./ActionsMakerPusat";
import ActionsMakerUKA from "./ActionsMakerUKA";
import ActionsSC from "./ActionsSC";

const BottomActions = ({
  status_kode
}) => {
  return (
    <div className="flex justify-between col-span-3">
      {status_kode === "1" && <ActionsMakerUKA />}
      {
        (
          status_kode === "2" ||
          status_kode === "3" ||
          status_kode === "5" ||
          status_kode === "6"
        ) &&
        <ActionsSC />
      }
      {status_kode === "4" && <ActionsMakerPusat />}
    </div>
  )
}

const mapStateToProps = state => ({
  status_kode: getStatusCode(state)
})

export default connect(mapStateToProps)(BottomActions);