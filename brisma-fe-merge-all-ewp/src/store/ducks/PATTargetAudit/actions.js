import { getToken } from "../auth/selectors";
import * as types from "./types";

export const fetchTargetAuditAIW = (pat_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_AIW_START })

  const { error, data } = await api.getTargetAudit(getToken(getState()), pat_id)
  if (!error){
    let ukerData;
    ukerData = Object.keys(data.existing).map(k => {
      const existing = data.existing[k] || 0
      const target = data.target[k] || 0
      return {
        name: k.toUpperCase(),
        existing,
        audit: target,
        percent: existing && target && Math.round(target / existing * 100)
      }
    })
    const totalExisting = Object.values(data.existing).reduce((prev, curr) => prev += Number(curr), 0)
    const totalTarget = Object.values(data.target).reduce((prev, curr) => prev += Number(curr), 0)
    ukerData.push({
      name: "Total",
      existing: totalExisting,
      audit: totalTarget,
      percent: totalExisting && totalTarget && Math.round(totalTarget / totalExisting * 100)
    })

    let echannelData;
    echannelData = data.echannel.map(e => {
      const existing = e.existing || 0;
			const target = e.target || 0;
      return {
				name: e.name,
				existing,
				audit: target,
				percent: existing && target && Math.round((target / existing) * 100),
			};
    })
    const totalExistingEchannel = data.echannel.reduce((prev, curr) => prev += curr.existing, 0)
    const totalTargetEchannel = data.echannel.reduce((prev, curr) => prev += curr.target, 0)
    echannelData.push({
      name: "Total",
      existing: totalExistingEchannel,
      audit: totalTargetEchannel,
      percent: totalExistingEchannel && totalTargetEchannel && Math.round(totalTargetEchannel / totalExistingEchannel * 100)
    })

    dispatch({ type: types.FETCH_AIW_SUCCESSFUL, payload: { uker: ukerData, echannel: echannelData } })
  } else {
    dispatch({ type: types.FETCH_AIW_FAILED, payload: error })
  }

  return !error
}

export const fetchTargetAuditAITI = (pat_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_AITI_START })

  const { error, data } = await api.getTargetAudit(getToken(getState()), pat_id)
  if (!error){

    let objek;
    objek = data.existing.map(e => {
      const existing = e.count || 0
      const target = data.target.find(t => t.nama === e.nama).count || 0
      return {
				name: e.nama,
				existing,
				audit: target,
				percent: existing && target && Math.round((Number(target) / Number(existing)) * 100),
			};
    })
    const totalExistingObjek = data.existing.reduce((prev, curr) => prev += Number(curr.count), 0)
    const totalTargetObjek = data.target.reduce((prev, curr) => prev += Number(curr.count), 0)
    objek.push({
			name: "Total",
			existing: totalExistingObjek,
			audit: totalTargetObjek,
			percent: totalExistingObjek && totalTargetObjek && Math.round((totalTargetObjek / totalExistingObjek) * 100),
		});

    let echannel;
		echannel = data.echannel.map((e) => {
			const existing = e.existing || 0;
			const target = e.target || 0;
			return {
				name: e.name,
				existing,
				audit: target,
				percent: target && existing && Math.round((target / existing) * 100),
			};
		});
    const totalExistingEchannel = data.echannel.reduce((prev, curr) => prev += curr.existing, 0)
    const totalTargetEchannel = data.echannel.reduce((prev, curr) => prev += curr.target, 0)
    echannel.push({
      name: "Total",
      existing: totalExistingEchannel,
      audit: totalTargetEchannel,
      percent: totalTargetEchannel && totalExistingEchannel && Math.round(totalTargetEchannel / totalExistingEchannel * 100)
    })
    

    dispatch({ type: types.FETCH_AITI_SUCCESSFUL, payload: { objek, echannel } })
  } else {
    dispatch({ type: types.FETCH_AITI_FAILED, payload: error })
  }

  return !error
}

export const fetchTargetAuditAIKP = (pat_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_AIKP_START })

  const { error, data } = await api.getTargetAudit(getToken(getState()), pat_id)
  if (!error){
    let ukerData;
    ukerData = Object.keys(data.existing).map(k => {
      const existing = data.existing[k] || 0
      const target = data.target[k] || 0
      return {
        name: k.toUpperCase(),
        existing,
        audit: target,
        percent: existing && target && Math.round(target / existing * 100)
      }
    })
    const totalExisting = Object.values(data.existing).reduce((prev, curr) => prev += Number(curr), 0)
    const totalTarget = Object.values(data.target).reduce((prev, curr) => prev += Number(curr), 0)
    ukerData.push({
      name: "Total",
      existing: totalExisting,
      audit: totalTarget,
      percent: totalExisting && totalTarget && Math.round(totalTarget / totalExisting * 100)
    })

    let echannelData;
    echannelData = data.echannel.map(e => ({
      name: e.name,
      existing: e.existing,
      audit: e.target,
      percent: e.existing && e.target && Math.round(e.target / e.existing * 100)
    }))
    const totalExistingEchannel = data.echannel.reduce((prev, curr) => prev += curr.existing, 0)
    const totalTargetEchannel = data.echannel.reduce((prev, curr) => prev += curr.target, 0)
    echannelData.push({
      name: "Total",
      existing: totalExistingEchannel,
      audit: totalTargetEchannel,
      percent: totalExistingEchannel && totalTargetEchannel && Math.round(totalTargetEchannel / totalExistingEchannel * 100)
    })

    dispatch({ type: types.FETCH_AIKP_SUCCESSFUL, payload: { uker: ukerData, echannel: echannelData } })
  } else {
    dispatch({ type: types.FETCH_AIKP_FAILED, payload: error })
  }

  return !error
}