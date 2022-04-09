import * as types from "./types";

const initialState = {
  tipe_audit: {
    fetched: false,
    loading: false,
    error: null,
    data: [],
  },
  tema_audit: {
    fetched: false,
    loading: false,
    error: null,
    data: [],
  },
  tipe_objek: {
    fetched: false,
    loading: false,
    error: null,
    data: [],
  },
  kategori_anggaran: {
    fetched: false,
    loading: false,
    error: null,
    data: [],
  },
  teams: {
    fetched: false,
    loading: false,
    error: null,
    data: [],
  },
  teamsAddendum: {
    fetched: false,
    loading: false,
    error: null,
    data: [],
  },
  echannel: {
    fetched: false,
    loading: false,
    error: null,
    data: [],
  },
  uko: {
    fetched: false,
    loading: false,
    error: null,
    data: [],
  },
};

export default function referenceReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_TIPE_AUDIT_START:
      return {
        ...state,
        tipe_audit: {
          ...state.tipe_audit,
          loading: true,
          error: null,
          fetched: false,
        },
      };
    case types.FETCH_TIPE_AUDIT_SUCCESSFUL:
      return {
        ...state,
        tipe_audit: {
          ...state.tipe_audit,
          loading: false,
          data: payload,
          fetched: true,
        },
      };
    case types.FETCH_TIPE_AUDIT_FAILED:
      return {
        ...state,
        tipe_audit: {
          ...state.tipe_audit,
          loading: false,
          error: payload,
          fetched: false,
        },
      };

    case types.FETCH_TEMA_AUDIT_START:
      return {
        ...state,
        tema_audit: {
          ...state.tema_audit,
          loading: true,
          error: null,
          fetched: false,
        },
      };
    case types.FETCH_TEMA_AUDIT_SUCCESSFUL:
      return {
        ...state,
        tema_audit: {
          ...state.tema_audit,
          loading: false,
          data: payload,
          fetched: true,
        },
      };
    case types.FETCH_TEMA_AUDIT_FAILED:
      return {
        ...state,
        tema_audit: {
          ...state.tema_audit,
          loading: false,
          error: payload,
          fetched: false,
        },
      };

    case types.FETCH_TIPE_OBJEK_START:
      return {
        ...state,
        tipe_objek: {
          ...state.tipe_objek,
          loading: true,
          error: null,
          fetched: false,
        },
      };
    case types.FETCH_TIPE_OBJEK_SUCCESSFUL:
      return {
        ...state,
        tipe_objek: {
          ...state.tipe_objek,
          loading: false,
          data: payload,
          fetched: true,
        },
      };
    case types.FETCH_TIPE_OBJEK_FAILED:
      return {
        ...state,
        tipe_objek: {
          ...state.tipe_objek,
          loading: false,
          error: payload,
          fetched: false,
        },
      };

    case types.FETCH_KATEGORI_ANGGARAN_START:
      return {
        ...state,
        kategori_anggaran: {
          ...state.kategori_anggaran,
          loading: true,
          error: null,
          fetched: false,
        },
      };
    case types.FETCH_KATEGORI_ANGGARAN_SUCCESSFUL:
      return {
        ...state,
        kategori_anggaran: {
          ...state.kategori_anggaran,
          loading: false,
          data: payload,
          fetched: true,
        },
      };
    case types.FETCH_KATEGORI_ANGGARAN_FAILED:
      return {
        ...state,
        kategori_anggaran: {
          ...state.kategori_anggaran,
          loading: false,
          error: payload,
          fetched: false,
        },
      };

    case types.FETCH_TEAMS_START:
      return {
        ...state,
        teams: {
          ...state.teams,
          loading: true,
          fetched: false,
          error: null,
        },
      };
    case types.FETCH_TEAMS_SUCCESSFUL:
      return {
        ...state,
        teams: {
          ...state.teams,
          loading: false,
          fetched: true,
          data: payload,
        },
      };
    case types.FETCH_TEAMS_FAILED:
      return {
        ...state,
        teams: {
          ...state.teams,
          loading: false,
          fetched: false,
          error: payload,
        },
      };

    case types.FETCH_TEAMS_ADDENDUM_START:
      return {
        ...state,
        teamsAddendum: {
          ...state.teamsAddendum,
          loading: true,
          fetched: false,
          error: null,
        },
      };
    case types.FETCH_TEAMS_ADDENDUM_SUCCESSFUL:
      return {
        ...state,
        teamsAddendum: {
          ...state.teamsAddendum,
          loading: false,
          fetched: true,
          data: payload,
        },
      };
    case types.FETCH_TEAMS_ADDENDUM_FAILED:
      return {
        ...state,
        teamsAddendum: {
          ...state.teamsAddendum,
          loading: false,
          fetched: false,
          error: payload,
        },
      };

    case types.FETCH_ECHANNEL_START:
      return {
        ...state,
        echannel: {
          ...state.echannel,
          loading: true,
          fetched: false,
          error: null,
        },
      };
    case types.FETCH_ECHANNEL_SUCCESSFUL:
      return {
        ...state,
        echannel: {
          ...state.echannel,
          loading: false,
          fetched: true,
          data: payload,
        },
      };
    case types.FETCH_ECHANNEL_FAILED:
      return {
        ...state,
        echannel: {
          ...state.echannel,
          loading: false,
          fetched: false,
          error: payload,
        },
      };

    case types.FETCH_UKO_START:
      return {
        ...state,
        uko: {
          ...state.teams,
          loading: true,
          fetched: false,
          error: null,
        },
      };
    case types.FETCH_UKO_SUCCESSFUL:
      return {
        ...state,
        uko: {
          ...state.uko,
          loading: false,
          fetched: true,
          data: payload,
        },
      };
    case types.FETCH_UKO_FAILED:
      return {
        ...state,
        uko: {
          ...state.uko,
          loading: false,
          fetched: false,
          error: payload,
        },
      };
    default:
      return state;
  }
}
