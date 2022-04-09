import { getToken } from "../auth/selectors";
import { getBranchChildrenLastCode } from "./selectors";
import * as types from "./types";

export const searchAuditors = (keyword) => async (dispatch, getState, api) => {
  dispatch({ type: types.SEARCH_AUDITOR_START });
  const { error, data } = await api.searchAuditors(
    getToken(getState()),
    keyword,
  );
  if (!error) dispatch({ type: types.SEARCH_AUDITOR_SUCCESS, payload: data });
  else dispatch({ type: types.SEARCH_AUDITOR_FAIL, payload: error });
};

export const searchAuditee = (keyword) => async (dispatch, getState, api) => {
  dispatch({ type: types.SEARCH_AUDITEE_START });
  const data = [
    {
      pn: 12345,
      nama: "Auditee 1",
      jabatan: "Auditee",
    },
    {
      pn: 34567,
      nama: "Auditee 2",
      jabatan: "Auditee",
    },
    {
      pn: 67890,
      nama: "Auditee 3",
      jabatan: "Auditee",
    },
    {
      pn: 6767,
      nama: "Auditee 4",
      jabatan: "Auditee",
    },
    {
      pn: 1248,
      nama: "Auditee 5",
      jabatan: "Auditee",
    },
    {
      pn: 119884,
      nama: "Auditor 6",
      jabatan: "Auditor",
    },
  ];

  dispatch({ type: types.SEARCH_AUDITEE_SUCCESS, payload: data });
};

export const searchBranches = (keyword) => async (dispatch, getState, api) => {
  dispatch({ type: types.SEARCH_BRANCH_START });
  const { error, data } = await api.searchBranch(getToken(getState()), keyword);
  if (!error) dispatch({ type: types.SEARCH_BRANCH_SUCCESS, payload: data });
  else dispatch({ type: types.SEARCH_BRANCH_FAIL, payload: error });
};

export const setBranches = (branches) => ({
  type: types.SET_BRANCH,
  payload: branches,
});

export const searchOrgehBranch =
  (keyword) => async (dispatch, getState, api) => {
    dispatch({ type: types.SEARCH_ORGEH_BRANCH_START });
    const { error, data } = await api.searchOrgehBranch(
      getToken(getState()),
      keyword,
    );

    if (!error) {
      const orgeh = data.map((item) => item.orgeh);
      const branchMap = data.reduce((prev, curr) => {
        prev[curr.orgeh.child] = curr.branch;
        return prev;
      }, {});
      dispatch({
        type: types.SEARCH_ORGEH_BRANCH_SUCCESS,
        payload: { orgeh, branchMap },
      });
    } else dispatch({ type: types.SEARCH_ORGEH_BRANCH_FAIL, payload: error });
  };

export const searchSbp =
  (keyword, pat_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.SEARCH_SBP_START });
    const { error, data } = await api.searchSbp(
      getToken(getState()),
      keyword,
      pat_id,
    );
    if (!error) {
      const sbps = data.map((sbp) => ({
        nama: sbp.name,
        id: sbp.id,
      }));
      dispatch({ type: types.SEARCH_SBP_SUCCESS, payload: sbps });
    } else dispatch({ type: types.SEARCH_SBP_FAIL, payload: error });
  };

export const searchBranchChildren =
  (branchCode) => async (dispatch, getState, api) => {
    if (getBranchChildrenLastCode(getState()) === branchCode) return;

    dispatch({ type: types.SEARCH_BRANCH_CHILDREN_START });
    const { error, data } = await api.searchBranchChildren(
      getToken(getState()),
      branchCode,
    );
    if (!error) {
      dispatch({
        type: types.SEARCH_BRANCH_CHILDREN_SUCCESS,
        payload: { data, lastBranchCode: branchCode },
      });
    } else
      dispatch({ type: types.SEARCH_BRANCH_CHILDREN_FAIL, payload: error });
  };

export const searchOrgeh = (keyword) => async (dispatch, getState, api) => {
  dispatch({ type: types.SEARCH_ORGEH_START });
  const { error, data } = await api.searchOrgeh(getToken(getState()), keyword);
  if (!error)
    dispatch({
      type: types.SEARCH_ORGEH_SUCCESS,
      payload: { data, lastOrgehCode: keyword },
    });
  else dispatch({ type: types.SEARCH_ORGEH_FAIL, payload: error });
};
