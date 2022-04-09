import { connect } from "react-redux";
import { mapTeamToDinasFormOptions } from "../../../../../../utils/mapData";
import FormBiayaPerjalananDinas from "../../../../../common/FormBiayaPerjalananDinas";

export function BiayaPerjalananDinasForm({ options, addBiayaDinas, getRefTeams, getSelectedTim }) {
  return <FormBiayaPerjalananDinas addBiayaDinas={addBiayaDinas} options={options} />
}

const mapStateToProps = (state, ownProps) => {
  const ref_teams = ownProps.getRefTeams(state)
  const selectedTimId = ownProps.getSelectedTim(state)
  const team = ref_teams.find(t => t.id === selectedTimId)
  return { options: team ? mapTeamToDinasFormOptions(team) : [] }
}

export default connect(mapStateToProps)(BiayaPerjalananDinasForm)