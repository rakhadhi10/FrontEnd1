export const mapaSampleMonber = (state) => state.mapa_sample_monber;

export const getDataMapaSampleMonber = (state) =>
  mapaSampleMonber(state).dataMapaSampleMonber;
export const getLoadingMapaSampleMonber = (state) =>
  mapaSampleMonber(state).loadingMapaSampleMonber;
export const getErrorMapaSampleMonber = (state) =>
  mapaSampleMonber(state).errorMapaSampleMonber;

export const getDataPoolSampleMonber = (state) =>
  mapaSampleMonber(state).dataPoolSampleMonber;
export const getLoadingPoolSampleMonber = (state) =>
  mapaSampleMonber(state).loadingPoolSampleMonber;
export const getErrorPoolSampleMonber = (state) =>
  mapaSampleMonber(state).errorPoolSampleMonber;

export const getDataContentPoolSampleMonber = (state) =>
  mapaSampleMonber(state).dataContentPoolSampleMonber;
export const getContent = (state) =>
  getDataContentPoolSampleMonber(state).content;
export const getPoolMBR = (state) =>
  getDataContentPoolSampleMonber(state).poolMBR;
export const getExisisting = (state) =>
  getDataContentPoolSampleMonber(state).existingSample;
export const getLoadingContentPoolSampleMonber = (state) =>
  mapaSampleMonber(state).loadingContentPoolSampleMonber;
export const getErrorContentPoolSampleMonber = (state) =>
  mapaSampleMonber(state).errorContentPoolSampleMonber;

export const getLoadingUpdateSampleMonber = (state) =>
  mapaSampleMonber(state).loadingUpdateSampleMonber;
export const getErrorUpdateSampleMonber = (state) =>
  mapaSampleMonber(state).errorUpdateSampleMonber;

export const getLoadingDeleteMapaSampleMonber = (state) =>
  mapaSampleMonber(state).loadingDeleteMapaSampleMonber;
export const getErrorDeleteMapaSampleMonber = (state) =>
  mapaSampleMonber(state).errorDeleteMapaSampleMonber;
