export const patDocumentState = (state) => state.pat_document

export const getInfoState = (state) => patDocumentState(state).info;
export const getInfoLoading = (state) => getInfoState(state).loading;
export const getInfoError = (state) => getInfoState(state).error;
export const getMakerTerakhir = (state) => getInfoState(state).pn_maker_akhir;
export const getMakerPusat = (state) => getInfoState(state).pn_maker_pusat;
export const getIsFinal = (state) => getInfoState(state).isFinal;
export const getStatusCode = (state) => getInfoState(state).stc_status_kode;;
export const getPersetujuanCode = (state) => getInfoState(state).stc_persetujuan_kode;
export const getCheckersUka = (state) => getInfoState(state).checkers_ukas;
export const getSignersUka = (state) => getInfoState(state).signers_ukas;
export const getCheckersPusat = (state) => getInfoState(state).checkers_pusats;
export const getSignersPusat = (state) => getInfoState(state).signers_pusats;
export const getLogs = (state) => getInfoState(state).logs;

export const getFormUka = (state) => patDocumentState(state).form_uka;
export const getFormPusat = (state) => patDocumentState(state).form_pusat;
export const getAlasan = (state) => patDocumentState(state).alasan;
export const getComments = (state) => patDocumentState(state).comments;
export const getRefBabPatKode = (state) => patDocumentState(state).ref_bab_pat_kode;
