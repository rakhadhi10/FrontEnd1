export const referenceState = (state) => state.reference;

export const getRefTipeAudit = (state) => referenceState(state).tipe_audit.data;
export const getRefTipeAuditLoading = (state) =>
  referenceState(state).tipe_audit.loading;
export const getRefTipeAuditFetched = (state) =>
  referenceState(state).tipe_audit.fetched;
export const getRefTipeAuditError = (state) =>
  referenceState(state).tipe_audit.error;

export const getRefTemaAudit = (state) => referenceState(state).tema_audit.data;
export const getRefTemaAuditLoading = (state) =>
  referenceState(state).tema_audit.loading;
export const getRefTemaAuditFetched = (state) =>
  referenceState(state).tema_audit.fetched;
export const getRefTemaAuditError = (state) =>
  referenceState(state).tema_audit.error;

export const getRefTipeObjek = (state) => referenceState(state).tipe_objek.data;
export const getRefTipeObjekLoading = (state) =>
  referenceState(state).tipe_objek.loading;
export const getRefTipeObjekFetched = (state) =>
  referenceState(state).tipe_objek.fetched;
export const getRefTipeObjekError = (state) =>
  referenceState(state).tipe_objek.error;

export const getRefKategoriAnggaran = (state) =>
  referenceState(state).kategori_anggaran.data;
export const getRefKategoriAnggaranLoading = (state) =>
  referenceState(state).kategori_anggaran.loading;
export const getRefKategoriAnggaranFetched = (state) =>
  referenceState(state).kategori_anggaran.fetched;
export const getRefKategoriAnggaranError = (state) =>
  referenceState(state).kategori_anggaran.error;

export const getRefTeams = (state) => referenceState(state).teams.data;
export const getRefTeamsLoading = (state) =>
  referenceState(state).teams.loading;
export const getRefTeamsFetched = (state) =>
  referenceState(state).teams.fetched;
export const getRefTeamsError = (state) => referenceState(state).teams.error;

export const getRefTeamsAddendum = (state) =>
  referenceState(state).teamsAddendum.data;
export const getRefTeamsAddendumLoading = (state) =>
  referenceState(state).teamsAddendum.loading;
export const getRefTeamsAddendumFetched = (state) =>
  referenceState(state).teamsAddendum.fetched;
export const getRefTeamsAddendumError = (state) =>
  referenceState(state).teamsAddendum.error;

export const getRefEchannel = (state) => referenceState(state).echannel.data;
export const getRefEchannelLoading = (state) =>
  referenceState(state).echannel.loading;
export const getRefEchannelFetched = (state) =>
  referenceState(state).echannel.fetched;
export const getRefEchannelError = (state) =>
  referenceState(state).echannel.error;

export const getRefUko = (state) => referenceState(state).uko.data;
export const getRefUkoLoading = (state) => referenceState(state).uko.loading;
export const getRefUkoFetched = (state) => referenceState(state).uko.fetched;
export const getRefUkoError = (state) => referenceState(state).uko.error;
