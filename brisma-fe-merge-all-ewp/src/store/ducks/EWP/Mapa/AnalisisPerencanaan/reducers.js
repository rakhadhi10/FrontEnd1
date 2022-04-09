import * as types from "./types";

const initialState = {
  loading: false,
  error: null,
  data: [],
  dataAnalyzing: [],
  analyzingError: null,
  analyzingLoading: false,
  submitLoading: false,
  submitError: null,
  submitAnalisaAktivitasLoading: false,
  submitAnalisaAktivitasError: null,
  loadingAktivitas: false,
  errorAktivitas: null,
  dataAktivitas: [],
  loadingSubAktivitas: false,
  errorSubAktivitas: null,
  dataSubAktivitas: [],
  loadingDeleteSubAktivitas: false,
  errorDeleteSubAktivitas: null,
  loadingAnalisaRisk: false,
  errorAnalisaRisk: null,
  dataAnalisaRisk: [],
  loadingBreadcrumbAktivitas: false,
  errorBreadcrumbAktivitas: null,
  dataBreadcrumbAktivitas: [],
  loadingSubmitAnalisaRisk: false,
  errorSubmitAnalisaRisk: null,
  loadingSubmitProgramAudit: false,
  errorSubmitProgramAudit: null,
  loadingSubmitKriteriaAudit: false,
  errorSubmitKriteriaAudit: null,
  loadingSummary: false,
  errorSummary: null,
  dataSummary: [],
  loadingTeknikSample: false,
  errorTeknikSample: null,
  dataTeknikSample: [],
  loadingMapaSample: false,
  errorMapaSample: null,
  dataMapaSample: [],
  submitMapaSampleLoading: false,
  submitMapaSampleError: null,
  submitApprovalLoading: false,
  submitApprovalError: null,
  loadingCommentApproval: false,
  errorCommentApproval: null,
  dataCommentApproval: "",
  noteReject: "",
};

export default function mapaAnalisisPerencanaanReducer(
  state = initialState,
  action
) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_START:
      return { ...state, loading: true };
    case types.FETCH_SUCCESSFUL:
      return { ...state, loading: false, data: payload };
    case types.FETCH_FAILED:
      return { ...state, loading: false, error: payload };

    case types.FETCH_AKTIVITAS_START:
      return { ...state, loadingAktivitas: true };
    case types.FETCH_AKTIVITAS_SUCCESSFUL:
      return { ...state, loadingAktivitas: false, dataAktivitas: payload };
    case types.FETCH_AKTIVITAS_FAILED:
      return { ...state, loadingAktivitas: false, errorAktivitas: payload };

    case types.FETCH_SUB_AKTIVITAS_START:
      return { ...state, loadingSubAktivitas: true };
    case types.FETCH_SUB_AKTIVITAS_SUCCESSFUL:
      return {
        ...state,
        loadingSubAktivitas: false,
        dataSubAktivitas: payload,
      };
    case types.FETCH_SUB_AKTIVITAS_FAILED:
      return {
        ...state,
        loadingSubAktivitas: false,
        errorSubAktivitas: payload,
      };

    case types.DELETE_SUB_AKTIVITAS_START:
      return { ...state, loadingDeleteSubAktivitas: true };
    case types.DELETE_SUB_AKTIVITAS_SUCCESSFUL:
      return { ...state, loadingDeleteSubAktivitas: false };
    case types.DELETE_SUB_AKTIVITAS_FAILED:
      return {
        ...state,
        loadingDeleteSubAktivitas: false,
        errorDeleteSubAktivitas: payload,
      };

    case types.FETCH_ANALYZING_START:
      return { ...state, analyzingLoading: true };
    case types.FETCH_ANALYZING_SUCCESSFUL:
      return { ...state, analyzingLoading: false, dataAnalyzing: payload };
    case types.FETCH_ANALYZING_FAILED:
      return { ...state, analyzingLoading: false, analyzingError: payload };

    case types.SUBMIT_START:
      return { ...state, submitLoading: true, submitError: null };
    case types.SUBMIT_SUCCESSFUL:
      return { ...state, submitLoading: false, submitError: null };
    case types.SUBMIT_FAILED:
      return { ...state, submitLoading: false, submitError: payload };

    case types.SUBMIT_ANALISA_AKTIVITAS_START:
      return { ...state, submitAnalisaAktivitasLoading: true };
    case types.SUBMIT_ANALISA_AKTIVITAS_SUCCESSFUL:
      return { ...state, submitAnalisaAktivitasLoading: false };
    case types.SUBMIT_ANALISA_AKTIVITAS_FAILED:
      return {
        ...state,
        submitAnalisaAktivitasLoading: false,
        submitAnalisaAktivitasError: payload,
      };

    case types.FETCH_ANALISA_RISK_START:
      return { ...state, loadingAnalisaRisk: true };
    case types.FETCH_ANALISA_RISK_SUCCESSFUL:
      return { ...state, loadingAnalisaRisk: false, dataAnalisaRisk: payload };
    case types.FETCH_ANALISA_RISK_FAILED:
      return { ...state, loadingAnalisaRisk: false, errorAnalisaRisk: payload };

    case types.SUBMIT_ANALISA_RISK_START:
      return { ...state, loadingSubmitAnalisaRisk: true };
    case types.SUBMIT_ANALISA_RISK_SUCCESSFUL:
      return {
        ...state,
        loadingSubmitAnalisaRisk: false,
        errorSubmitAnalisaRisk: null,
      };
    case types.SUBMIT_ANALISA_RISK_FAILED:
      return {
        ...state,
        loadingSubmitAnalisaRisk: false,
        errorSubmitAnalisaRisk: payload,
      };

    case types.SUBMIT_PROGRAM_AUDIT_START:
      return { ...state, loadingSubmitProgramAudit: true };
    case types.SUBMIT_PROGRAM_AUDIT_SUCCESSFUL:
      return {
        ...state,
        loadingSubmitProgramAudit: false,
        errorSubmitProgramAudit: null,
      };
    case types.SUBMIT_PROGRAM_AUDIT_FAILED:
      return {
        ...state,
        loadingSubmitProgramAudit: false,
        errorSubmitProgramAudit: payload,
      };

    case types.SUBMIT_KRITERIA_AUDIT_START:
      return { ...state, loadingSubmitKriteriaAudit: true };
    case types.SUBMIT_KRITERIA_AUDIT_SUCCESSFUL:
      return {
        ...state,
        loadingSubmitKriteriaAudit: false,
        errorSubmitKriteriaAudit: null,
      };
    case types.SUBMIT_KRITERIA_AUDIT_FAILED:
      return {
        ...state,
        loadingSubmitKriteriaAudit: false,
        errorSubmitKriteriaAudit: payload,
      };

    case types.FETCH_BREADCRUMB_AKTIVITAS_START:
      return { ...state, loadingBreadcrumbAktivitas: true };
    case types.FETCH_BREADCRUMB_AKTIVITAS_SUCCESSFUL:
      return {
        ...state,
        loadingBreadcrumbAktivitas: false,
        dataBreadcrumbAktivitas: payload,
      };
    case types.FETCH_BREADCRUMB_AKTIVITAS_FAILED:
      return {
        ...state,
        loadingBreadcrumbAktivitas: false,
        errorBreadcrumbAktivitas: payload,
      };

    case types.FETCH_SUMMARY_START:
      return { ...state, loadingSummary: true };
    case types.FETCH_SUMMARY_SUCCESSFUL:
      return { ...state, loadingSummary: false, dataSummary: payload };
    case types.FETCH_SUMMARY_FAILED:
      return { ...state, loadingSummary: false, errorSummary: payload };

    case types.FETCH_TEKNIK_SAMPLE_START:
      return { ...state, loadingTeknikSample: true };
    case types.FETCH_TEKNIK_SAMPLE_SUCCESSFUL:
      return {
        ...state,
        loadingTeknikSample: false,
        dataTeknikSample: payload,
      };
    case types.FETCH_TEKNIK_SAMPLE_FAILED:
      return {
        ...state,
        loadingTeknikSample: false,
        errorTeknikSample: payload,
      };

    case types.SUBMIT_MAPA_SAMPLE_START:
      return {
        ...state,
        submitMapaSampleLoading: true,
        submitMapaSampleError: null,
      };
    case types.SUBMIT_MAPA_SAMPLE_SUCCESSFUL:
      return {
        ...state,
        submitMapaSampleLoading: false,
        submitMapaSampleError: null,
      };
    case types.SUBMIT_MAPA_SAMPLE_FAILED:
      return {
        ...state,
        submitMapaSampleLoading: false,
        submitMapaSampleError: payload,
      };

    case types.FETCH_MAPA_SAMPLE_START:
      return { ...state, loadingMapaSample: true };
    case types.FETCH_MAPA_SAMPLE_SUCCESSFUL:
      return { ...state, loadingMapaSample: false, dataMapaSample: payload };
    case types.FETCH_MAPA_SAMPLE_FAILED:
      return { ...state, loadingMapaSample: false, errorMapaSample: payload };

    case types.SUBMIT_APPROVAL_START:
      return {
        ...state,
        submitApprovalLoading: true,
        submitApprovalError: null,
      };
    case types.SUBMIT_APPROVAL_SUCCESSFUL:
      return {
        ...state,
        submitApprovalLoading: false,
        submitApprovalError: null,
      };
    case types.SUBMIT_APPROVAL_FAILED:
      return {
        ...state,
        submitApprovalLoading: false,
        submitApprovalError: payload,
      };

    case types.FETCH_COMMENT_APPROVAL_START:
      return {
        ...state,
        loadingCommentApproval: true,
        errorCommentApproval: null,
      };
    case types.FETCH_COMMENT_APPROVAL_SUCCESSFUL:
      return {
        ...state,
        loadingCommentApproval: false,
        dataCommentApproval: payload,
      };
    case types.FETCH_COMMENT_APPROVAL_FAILED:
      return {
        ...state,
        loadingCommentApproval: false,
        errorCommentApproval: payload,
      };

    case types.SET_NOTE_REJECT:
      return { ...state, noteReject: payload };
    default:
      return state;
  }
}
