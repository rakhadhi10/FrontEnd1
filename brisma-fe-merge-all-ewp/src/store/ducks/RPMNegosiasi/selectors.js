export const rpmNegosiasiState = (state) => state.rpm_negosiasi;

export const statusState = (state) => rpmNegosiasiState(state).status;
export const getStatus = (state) => statusState(state).data;
export const getStatusLoading = (state) => statusState(state).loading;
export const getStatusError = (state) => statusState(state).error;

export const attendanceState = (state) => rpmNegosiasiState(state).attendance;
export const getAttendance = (state) => attendanceState(state).data;
export const getAttendanceClosed = (state) => attendanceState(state).is_closed;
export const getAttendanceLoading = (state) => attendanceState(state).loading;
export const getAttendanceError = (state) => attendanceState(state).error;

export const timAuditState = (state) => rpmNegosiasiState(state).tim_audit;
export const getTimAudit = (state) => timAuditState(state).data;
export const getTimAuditLoading = (state) => timAuditState(state).loading;
export const getTimAuditError = (state) => timAuditState(state).error;

export const notulenState = (state) => rpmNegosiasiState(state).notulen;
export const getNotulenLogs = (state) => notulenState(state).data.log;
export const getNotulen = (state) => notulenState(state).data.data;
export const getNotulenKTA = (state) => getNotulen(state).kta;
export const getNotulenATA = (state) => getNotulen(state).ata_penanggung_jawab;
export const getNotulenStatus = (state) => getNotulen(state).status;
export const getNotulenContent = (state) => getNotulen(state).isi_notulen_rapat;
export const getNotulenLoading = (state) => notulenState(state).loading;
export const getNotulenError = (state) => notulenState(state).error;

export const kkptNegoState = (state) => rpmNegosiasiState(state).kkpt_nego;
export const getKKPTNego = (state) => kkptNegoState(state).data;
export const getKKPTNegoLoading = (state) => kkptNegoState(state).loading;
export const getKKPTNegoError = (state) => kkptNegoState(state).error;

export const actionPlanNegoState = (state) =>
  rpmNegosiasiState(state).action_plan;
export const getActionPlanNego = (state) => actionPlanNegoState(state).data;
export const getActionPlanNegoLoading = (state) =>
  actionPlanNegoState(state).loading;
export const getActionPlanNegoError = (state) =>
  actionPlanNegoState(state).error;

export const beritaAcaraState = (state) =>
  rpmNegosiasiState(state).berita_acara;
export const getBeritaAcaraLogs = (state) => beritaAcaraState(state).data.log;
export const getBeritaAcara = (state) => beritaAcaraState(state).data.data;
export const getBeritaAcaraKTA = (state) => getBeritaAcara(state).kta;
export const getBeritaAcaraATA = (state) =>
  getBeritaAcara(state).ata_penanggung_jawab;
export const getBeritaAcaraPIC = (state) =>
  getBeritaAcara(state).pimpinan_uker_auditee;
export const getBeritaAcaraStatus = (state) => getBeritaAcara(state).status;
export const getBeritaAcaraContent = (state) =>
  getBeritaAcara(state).isi_berita_acara;
export const getBeritaAcaraLoading = (state) => beritaAcaraState(state).loading;
export const getBeritaAcaraError = (state) => beritaAcaraState(state).error;
