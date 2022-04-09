import * as types from "./types";

const initialState = {
  status: {
    loading: false,
    error: null,
    data: {
      nama_project: undefined,
      num_project: undefined,
      status_attandence: undefined,
      status_notulen: undefined,
      status_berita_acara: undefined,
      tim_audit: undefined,
    },
  },
  tim_audit: {
    loading: false,
    error: null,
    data: [],
  },
  attendance: {
    loading: false,
    error: null,
    data: [],
    is_closed: false,
  },
  notulen: {
    loading: false,
    error: null,
    data: {
      data: {},
      log: [],
    },
    // id: 1,
    // project_rpm_id: 1,
    // kta: {
    //   title: "kta",
    //   nama_tim: "singa",
    //   pn: "119884",
    //   nama: "def",
    //   jabatan: "Auditor",
    // },
    // ata_penanggung_jawab: null,
    // status: "On KTA",
    // evaluasi_ke: 1,
    // isi_notulen_rapat: null,
    // createdAt: "2022-01-26T09:33:53.317Z",
    // updatedAt: "2022-01-26T09:33:53.317Z",
  },
  berita_acara: {
    loading: false,
    error: null,
    data: {
      data: {},
      log: [],
    },
  },
  kkpt_nego: {
    loading: false,
    error: null,
    data: [],
  },
  action_plan: {
    loading: false,
    error: null,
    data: {
      data: {},
      log: [],
    },
  },
};

export default function rpmNegosiasiReducers(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_STATUS_START:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_STATUS_SUCCESSFUL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          data: payload,
        },
      };
    case types.FETCH_STATUS_FAILED:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: payload,
        },
      };

    case types.FETCH_ATTENDANCE_START:
      return {
        ...state,
        attendance: {
          ...state.attendance,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_ATTENDANCE_SUCCESSFUL:
      return {
        ...state,
        attendance: {
          ...state.attendance,
          loading: false,
          data: payload.attendance,
          is_closed: payload.is_closed,
        },
      };
    case types.FETCH_ATTENDANCE_FAILED:
      return {
        ...state,
        attendance: {
          ...state.attendance,
          loading: false,
          error: payload,
        },
      };
    case types.UPDATE_ATTENDANCE:
      return {
        ...state,
        attendance: {
          ...state.attendance,
          data: payload,
        },
      };

    case types.FETCH_TIM_AUDIT_START:
      return {
        ...state,
        tim_audit: {
          ...state.tim_audit,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_TIM_AUDIT_SUCCESSFUL:
      return {
        ...state,
        tim_audit: {
          ...state.tim_audit,
          loading: false,
          data: payload,
        },
      };
    case types.FETCH_TIM_AUDIT_FAILED:
      return {
        ...state,
        tim_audit: {
          ...state.tim_audit,
          loading: false,
          error: payload,
        },
      };

    case types.FETCH_NOTULEN_START:
      return {
        ...state,
        notulen: {
          ...state.notulen,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_NOTULEN_SUCCESSFUL:
      return {
        ...state,
        notulen: {
          ...state.notulen,
          loading: false,
          data: payload,
        },
      };
    case types.FETCH_NOTULEN_FAILED:
      return {
        ...state,
        notulen: {
          ...state.notulen,
          loading: false,
          error: payload,
        },
      };

    case types.FETCH_BERITA_ACARA_START:
      return {
        ...state,
        berita_acara: {
          ...state.berita_acara,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_BERITA_ACARA_SUCCESSFUL:
      return {
        ...state,
        berita_acara: {
          ...state.berita_acara,
          loading: false,
          data: payload,
        },
      };
    case types.FETCH_BERITA_ACARA_FAILED:
      return {
        ...state,
        berita_acara: {
          ...state.berita_acara,
          loading: false,
          error: payload,
        },
      };

    case types.FETCH_KKPT_NEGO_START:
      return {
        ...state,
        kkpt_nego: {
          ...state.kkpt_nego,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_KKPT_NEGO_SUCCESSFUL:
      return {
        ...state,
        kkpt_nego: {
          ...state.kkpt_nego,
          loading: false,
          data: payload,
        },
      };
    case types.FETCH_KKPT_NEGO_FAILED:
      return {
        ...state,
        kkpt_nego: {
          ...state.kkpt_nego,
          loading: false,
          error: payload,
        },
      };

    case types.FETCH_ACTION_PLAN_START:
      return {
        ...state,
        action_plan: {
          ...state.action_plan,
          loading: true,
          error: null,
        },
      };
    case types.FETCH_ACTION_PLAN_SUCCESSFUL:
      return {
        ...state,
        action_plan: {
          ...state.action_plan,
          loading: false,
          data: payload,
        },
      };
    case types.FETCH_ACTION_PLAN_FAILED:
      return {
        ...state,
        action_plan: {
          ...state.action_plan,
          loading: false,
          error: payload,
        },
      };
    default:
      return state;
  }
}
