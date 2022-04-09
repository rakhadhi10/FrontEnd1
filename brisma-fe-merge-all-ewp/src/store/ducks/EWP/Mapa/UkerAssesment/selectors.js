export const mapaUkerAssesment = (state) => state.mapa_uker_assesment;

export const getInfoHeader = (state) => mapaUkerAssesment(state).data.header;
export const getBody = (state) => mapaUkerAssesment(state).data.body;
export const getLoading = (state) => mapaUkerAssesment(state).loading;
export const getError = (state) => mapaUkerAssesment(state).error;

export const getSubmitLoading = (state) => mapaUkerAssesment(state).submitLoading;
export const getSubmitError = (state) => mapaUkerAssesment(state).submitError;
