export const searchState = (state) => state.search;

export const searchAuditorState = (state) => searchState(state).auditor;
export const getAuditorLoading = (state) => searchAuditorState(state).loading;
export const getAuditorError = (state) => searchAuditorState(state).error;
export const getAuditors = (state) => searchAuditorState(state).data;

export const searchAuditeeState = (state) => searchState(state).auditee;
export const getAuditeeLoading = (state) => searchAuditeeState(state).loading;
export const getAuditeeError = (state) => searchAuditeeState(state).error;
export const getAuditees = (state) => searchAuditeeState(state).data;

export const searchBranchState = (state) => searchState(state).branch;
export const getBranchLoading = (state) => searchBranchState(state).loading;
export const getBranchError = (state) => searchBranchState(state).error;
export const getBranches = (state) => searchBranchState(state).data;

export const searchOrgehBranchState = (state) =>
  searchState(state).orgehWithBranch;
export const getOrgehBranchLoading = (state) =>
  searchOrgehBranchState(state).loading;
export const getOrgehBranchError = (state) =>
  searchOrgehBranchState(state).error;
export const getOrgeh = (state) => searchOrgehBranchState(state).orgeh;
export const getBranchMap = (state) => searchOrgehBranchState(state).branchMap;

export const searchSbpState = (state) => searchState(state).sbp;
export const getSbpLoading = (state) => searchSbpState(state).loading;
export const getSbpError = (state) => searchSbpState(state).error;
export const getSbps = (state) => searchSbpState(state).data;

export const searchBranchChildrenState = (state) =>
  searchState(state).branchChildren;
export const getBranchChildrenLoading = (state) =>
  searchBranchChildrenState(state).loading;
export const getBranchChildrenError = (state) =>
  searchBranchChildrenState(state).error;
export const getBranchChildrenLastCode = (state) =>
  searchBranchChildrenState(state).lastBranchCode;
export const getBranchChildren = (state) =>
  searchBranchChildrenState(state).data;

export const searchOrgehState = (state) => searchState(state).orgeh;
export const getOrgehLoading = (state) => searchOrgehState(state).loading;
export const getOrgehError = (state) => searchOrgehState(state).error;
export const getOrgehLastCode = (state) =>
  searchOrgehState(state).lastOrgehCode;
export const getOrgehData = (state) => searchOrgehState(state).data;
