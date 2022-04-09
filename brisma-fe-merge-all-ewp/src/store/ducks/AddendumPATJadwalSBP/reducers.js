import * as types from "./types";

const initialState = {
  loading: false,
  error: null,
  jadwal: [],
  filters: {
    unit_kerja: null,
    nama_sbp: null,
    pembicara: null,
    pic: null,
    start_date: null,
    end_date: null,
    anggaran: null,
    sortBy: null,
  },
  page: {
    currentPage: 1,
    totalPage: 1,
    perPage: 3,
  },
  modal: {
    create: false,
    edit: false,
  },
  deleteLoading: false,
  formLoading: false,
  formError: null,
  currentStep: 0,
  step: {
    0: {
      filled: false,
      form: {
        kegiatan: undefined,
        uker: { orgeh: undefined, branch: undefined },
        start_date: undefined,
        end_date: undefined,
      },
    },
    1: {
      filled: false,
      form: {
        pn_pembicara: [],
        pn_penanggung_jawab: [],
      },
    },
    2: {
      biaya_dinas: {
        pembicara: [],
        penanggung_jawab: [],
      },
      biaya_kegiatan: {},
    },
  },
  editFormLoading: false,
  editFormError: null,
  edit: {
    currentId: null,
    jadwal: null,
    fetchLoading: false,
    fetchError: null,
  },
};

export default function addendumPatJadwalSbpReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
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

    case types.UPDATE_FORM_STEP_1:
      return {
        ...state,
        step: {
          ...state.step,
          0: { ...state.step["0"], form: { ...action.payload } },
        },
      };
    case types.UPDATE_FORM_STEP_1_STATUS:
      return {
        ...state,
        step: {
          ...state.step,
          0: { ...state.step["0"], filled: action.payload },
        },
      };

    case types.UPDATE_FORM_STEP_2:
      return {
        ...state,
        step: {
          ...state.step,
          1: { ...state.step["1"], form: { ...action.payload } },
        },
      };
    case types.UPDATE_FORM_STEP_2_STATUS:
      return {
        ...state,
        step: {
          ...state.step,
          1: { ...state.step["1"], filled: action.payload },
        },
      };

    case types.ADD_PEMBICARA:
      return {
        ...state,
        step: {
          ...state.step,
          1: {
            ...state.step["1"],
            form: {
              ...state.step["1"].form,
              pn_pembicara: [
                ...state.step["1"].form.pn_pembicara,
                action.payload,
              ],
            },
          },
        },
      };

    case types.ADD_PENANGGUNG_JAWAB:
      return {
        ...state,
        step: {
          ...state.step,
          1: {
            ...state.step["1"],
            form: {
              ...state.step["1"].form,
              pn_penanggung_jawab: [
                ...state.step["1"].form.pn_penanggung_jawab,
                action.payload,
              ],
            },
          },
        },
      };

    case types.UPDATE_BIAYA_DINAS_PEMBICARA:
      return {
        ...state,
        step: {
          ...state.step,
          2: {
            ...state.step["2"],
            biaya_dinas: {
              ...state.step["2"].biaya_dinas,
              pembicara: action.payload,
            },
          },
        },
      };

    case types.UPDATE_BIAYA_DINAS_PENANGGUNG_JAWAB:
      return {
        ...state,
        step: {
          ...state.step,
          2: {
            ...state.step["2"],
            biaya_dinas: {
              ...state.step["2"].biaya_dinas,
              penanggung_jawab: action.payload,
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
              ...action.payload,
            },
          },
        },
      };

    case types.GO_NEXT_STEP:
      return { ...state, currentStep: state.currentStep + 1 };
    case types.GO_PREV_STEP:
      return { ...state, currentStep: state.currentStep - 1 };

    case types.SUBMIT_START:
      return { ...state, formLoading: true };
    case types.SUBMIT_SUCCESSFUL:
      return { ...state, formLoading: false, error: null };
    case types.SUBMIT_FAILED:
      return { ...state, formLoading: false, formError: action.payload };

    case types.FETCH_START:
      return { ...state, loading: true, error: null };
    case types.FETCH_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        jadwal: action.payload.data,
        page: action.payload.page,
      };
    case types.FETCH_FAILED:
      return { ...state, loading: false, error: action.payload };

    case types.DELETE_START:
      return { ...state, deleteLoading: true };
    case types.DELETE_SUCCESSFUL:
      return {
        ...state,
        deleteLoading: false,
        jadwal: state.jadwal.filter((j) => j.id !== action.payload),
      };
    case types.DELETE_FAILED:
      return { ...state, deleteLoading: false };

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
        edit: {
          ...state.edit,
          currentId: action.payload,
        },
      };

    case types.CHANGE_PAGE:
      return { ...state, page: { ...state.page, currentPage: action.payload } };
    default:
      return state;
  }
}
