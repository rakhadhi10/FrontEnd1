export const mapaSampleFRD = (state) => state.mapa_sample_frd;

export const getDataMapaSampleFRD = (state) =>
  mapaSampleFRD(state).dataMapaSampleFRD;
export const getLoadingMapaSampleFRD = (state) =>
  mapaSampleFRD(state).loadingMapaSampleFRD;
export const getErrorMapaSampleFRD = (state) =>
  mapaSampleFRD(state).errorMapaSampleFRD;

export const getDataPoolSampleFRD = (state) =>
  mapaSampleFRD(state).dataPoolSampleFRD;
export const getLoadingPoolSampleFRD = (state) =>
  mapaSampleFRD(state).loadingPoolSampleFRD;
export const getErrorPoolSampleFRD = (state) =>
  mapaSampleFRD(state).errorPoolSampleFRD;

export const getDataContentPoolSampleFRD = (state) =>
  mapaSampleFRD(state).dataContentPoolSampleFRD;
export const getContent = (state) => getDataContentPoolSampleFRD(state).content;
export const getPoolFRD = (state) => getDataContentPoolSampleFRD(state).poolFRD;
export const getExisisting = (state) =>
  getDataContentPoolSampleFRD(state).existingSample;
export const getLoadingContentPoolSampleFRD = (state) =>
  mapaSampleFRD(state).loadingContentPoolSampleFRD;
export const getErrorContentPoolSampleFRD = (state) =>
  mapaSampleFRD(state).errorContentPoolSampleFRD;

export const getLoadingUpdateSampleFRD = (state) =>
  mapaSampleFRD(state).loadingUpdateSampleFRD;
export const getErrorUpdateSampleFRD = (state) =>
  mapaSampleFRD(state).errorUpdateSampleFRD;

export const getLoadingDeleteMapaSampleFRD = (state) =>
  mapaSampleFRD(state).loadingDeleteMapaSampleFRD;
export const getErrorDeleteMapaSampleFRD = (state) =>
  mapaSampleFRD(state).errorDeleteMapaSampleFRD;
