export const patDocumentHistoryState = (state) => state.pat_document_history;

export const getDocHistory = (state) => patDocumentHistoryState(state).data;
export const getDocHistoryLoading = (state) =>
  patDocumentHistoryState(state).loading;
export const getDocHistoryError = (state) =>
  patDocumentHistoryState(state).error;
