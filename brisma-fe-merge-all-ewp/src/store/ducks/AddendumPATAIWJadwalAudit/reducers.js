import * as types from "./types";

const initialState = {
  loading: false,
  error: null,
  jadwal: [],
  filters: {
    project_name: null,
    tipe_project: null,
    timAudit: null,
    start: null,
    end: null,
    anggaran: null,
    sortBy: null,
  },
  page: {
    currentPage: 1,
    totalPage: 1,
    perPage: 6,
  },
  modal: {
    create: false,
    edit: false,
  },
  formLoading: false,
  formError: null,
  currentStep: 0,
  currentEditedId: null,
  step: {
    0: {
      filled: false,
      form: {
        nama_kegiatan_audit: undefined,
        uker: { orgeh: undefined, branch: undefined },
        tim: undefined,
        tema: undefined,
        tipe_audit: undefined,
        start_date: undefined,
        end_date: undefined,
      },
    },
    1: {
      filled: false,
      modal: {
        reguler: false,
        spesialTematik: false,
      },
      form: {
        rows: [],
        specialTematikRows: [],
        echannels: {},
      },
    },
    2: {
      biaya_dinas: [],
      biaya_kegiatan: {},
    },
  },
};

export default function addendumPatAIWJadwalAuditReducer(
  state = initialState,
  action,
) {
  const { type, payload } = action;

  switch (type) {
    case types.UPDATE_FILTER_FORM:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    case types.UPDATE_SORT_BY:
      return {
        ...state,
        filters: {
          ...state.filters,
          sortBy: action.payload,
        },
      };

    case types.UPDATE_JADWAL:
      return { ...state, jadwal: payload };

    case types.FETCH_START:
      return { ...state, loading: true, error: null };
    case types.FETCH_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        jadwal: payload.data,
        page: payload.page,
      };
    case types.FETCH_FAILED:
      return { ...state, loading: false, error: payload };

    case types.SUBMIT_START:
      return { ...state, formLoading: true };
    case types.SUBMIT_SUCCESSFUL:
      return { ...state, formLoading: false, formError: null };
    case types.SUBMIT_FAILED:
      return { ...state, formLoading: false, formError: payload };

    case types.GO_NEXT_STEP:
      return { ...state, currentStep: state.currentStep + 1 };
    case types.GO_PREV_STEP:
      return { ...state, currentStep: state.currentStep - 1 };

    case types.OPEN_CREATE_MODAL:
      return { ...state, modal: { ...state.modal, create: true } };
    case types.CLOSE_CREATE_MODAL:
      return {
        ...state,
        modal: { ...state.modal, create: false },
        currentStep: 0,
        step: { ...initialState.step },
      };

    case types.OPEN_EDIT_MODAL:
      return { ...state, modal: { ...state.modal, edit: true } };
    case types.CLOSE_EDIT_MODAL:
      return {
        ...state,
        modal: { ...state.modal, edit: false },
        currentStep: 0,
        step: { ...initialState.step },
      };
    case types.SET_CURRENT_EDITED_ID:
      return {
        ...state,
        currentEditedId: payload,
      };

    case types.OPEN_REGULER_MODAL:
      return {
        ...state,
        step: {
          ...state.step,
          1: {
            ...state.step["1"],
            modal: { ...state.step["1"].modal, reguler: true },
          },
        },
      };
    case types.CLOSE_REGULER_MODAL:
      return {
        ...state,
        step: {
          ...state.step,
          1: {
            ...state.step["1"],
            modal: { ...state.step["1"].modal, reguler: false },
          },
        },
      };

    case types.OPEN_SPECIAL_TEMATIK_MODAL:
      return {
        ...state,
        step: {
          ...state.step,
          1: {
            ...state.step["1"],
            modal: { ...state.step["1"].modal, spesialTematik: true },
          },
        },
      };
    case types.CLOSE_SPECIAL_TEMATIK_MODAL:
      return {
        ...state,
        step: {
          ...state.step,
          1: {
            ...state.step["1"],
            modal: { ...state.step["1"].modal, spesialTematik: false },
          },
        },
      };

    case types.UPDATE_FORM_STEP_1:
      return {
        ...state,
        step: {
          ...state.step,
          0: { ...state.step["0"], form: { ...payload } },
        },
      };
    case types.UPDATE_FORM_STEP_1_STATUS:
      return {
        ...state,
        step: {
          ...state.step,
          0: { ...state.step["0"], filled: payload },
        },
      };

    case types.UPDATE_ROWS:
      return {
        ...state,
        step: {
          ...state.step,
          1: {
            ...state.step["1"],
            form: {
              ...state.step["1"].form,
              rows: [...payload],
            },
          },
        },
      };

    case types.UPDATE_SPECIAL_TEMATIK_ROWS:
      return {
        ...state,
        step: {
          ...state.step,
          1: {
            ...state.step["1"],
            form: {
              ...state.step["1"].form,
              specialTematikRows: [...payload],
            },
          },
        },
      };

    case types.UPDATE_ECHANNELS:
      return {
        ...state,
        step: {
          ...state.step,
          1: {
            ...state.step["1"],
            form: {
              ...state.step["1"].form,
              echannels: { ...payload },
            },
          },
        },
      };

    case types.ADD_BIAYA_KEGIATAN:
      return {
        ...state,
        step: {
          ...state.step,
          2: {
            ...state.step["2"],
            biaya_kegiatan: {
              ...state.step[2].biaya_kegiatan,
              ...payload,
            },
          },
        },
      };

    case types.ADD_BIAYA_DINAS_ANGGOTA:
      return {
        ...state,
        step: {
          ...state.step,
          2: {
            ...state.step["2"],
            biaya_dinas: [...state.step["2"].biaya_dinas, payload],
          },
        },
      };
    case types.UPDATE_BIAYA_DINAS:
      return {
        ...state,
        step: {
          ...state.step,
          2: {
            ...state.step["2"],
            biaya_dinas: action.payload,
          },
        },
      };

    case types.CHANGE_PAGE:
      return { ...state, page: { ...state.page, currentPage: action.payload } };

    default:
      return state;
  }
}
