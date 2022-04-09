import { generateHtmlAikp } from "../../../templates/AIKP";
import { generateHtmlAiti } from "../../../templates/AITI";
import { generateHtmlAiw } from "../../../templates/AIW";
import { getToken, getUserPN } from "../auth/selectors";
import { getAllStatus } from "../PATProject/selectors";
import {
  getAlasan,
  getComments,
  getFormPusat,
  getFormUka,
  getRefBabPatKode,
  getSignersPusat,
  getSignersUka,
  getStatusCode,
} from "./selectors";
import * as types from "./types";

export const updateFormUka = (newForm) => ({
  type: types.UPDATE_FORM_UKA,
  payload: newForm,
});
export const updateFormPusat = (newForm) => ({
  type: types.UPDATE_FORM_PUSAT,
  payload: newForm,
});
export const updateAlasan = (alasan) => ({
  type: types.UPDATE_ALASAN,
  payload: alasan,
});
export const updateComments = (comments) => ({
  type: types.UPDATE_COMMENTS,
  payload: comments,
});
export const updateRefBabPatKode = (kode) => ({
  type: types.UPDATE_REF_BAB_PAT_KODE,
  payload: kode,
});

export const fetchDocInfo = (pat_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_INFO_START });

  const { error, data } = await api.getDocumentInfo(
    getToken(getState()),
    pat_id,
  );
  const { error: logError, data: logData } = await api.getLogPersetujuan(
    getToken(getState()),
    pat_id,
  );

  if (!error) {
    dispatch({
      type: types.FETCH_INFO_SUCCESSFUL,
      payload: { ...data, logs: logData ? logData : [] },
    });
  } else {
    dispatch({ type: types.FETCH_INFO_FAILED, payload: error });
  }

  return !error && !logError;
};

export const createMakerUKA = (pat_id) => async (dispatch, getState, api) => {
  const { checkers, signers } = getFormUka(getState());
  const form = {
    pat_id,
    checkers: checkers.filter((c) => c),
    signers: signers.filter((s) => s),
  };

  const { error } = await api.createMakerUKA(getToken(getState()), form);

  return !error;
};

export const createMakerPusat = (pat_id) => async (dispatch, getState, api) => {
  const { checkers, signers } = getFormPusat(getState());
  const form = {
    pat_id,
    checkers: checkers.filter((c) => c),
    signers: signers.filter((s) => s),
  };

  const { error } = await api.createMakerPusat(getToken(getState()), form);

  return !error;
};

export const reject = (pat_id) => async (dispatch, getState, api) => {
  const form = {
    pat_id,
    note: getAlasan(getState()),
  };
  const { error } = await api.reject(getToken(getState()), form);

  return !error;
};

const generateDocument = async (pat_id, state, api) => {
  const result = { data: null, error: null };

  const token = getToken(state);
  const tahun = getAllStatus(state).tahun;
  const latar_belakang = api.getDocLatarBelakang(token, pat_id);
  const sumber_informasi = api.getDocSumberInformasi(token, pat_id);
  const target_audit = api.getDocTargetAudit(token, pat_id);
  const jadwal_audit = api.getDocJadwalAudit(token, pat_id);
  const sbp = api.getDocJadwalSBP(token, pat_id);
  const jadwal_lain = api.getDocKegiatanLain(token, pat_id);
  const tim_audit = api.getDocTimAudit(token, pat_id);
  const anggaran = api.getDocAnggaran(token, pat_id);

  const data = await Promise.all([
    latar_belakang,
    sumber_informasi,
    target_audit,
    jadwal_audit,
    sbp,
    jadwal_lain,
    tim_audit,
    anggaran,
  ]);

  const anyError = data.find((d) => d.error);
  if (anyError) {
    result.error = anyError.error;
    return result;
  }

  const signData = await Promise.all(
    getSignersUka(state).map((s) =>
      api.searchSigner(token, pat_id, s.pn, false, null),
    ),
  );

  const anySignerError = data.find((d) => d.error);
  if (anySignerError) {
    result.error = anySignerError.error;
    return result;
  }

  const [lb, si, ta, ja, s, jl, tima, ang] = data;

  const obj = {
    tahun,
    latar_belakang: lb.data,
    sumber_informasi: si.data,
    target_audit_data: ta.data,
    jadwal_audit_data: ja.data,
    sbp_data: s.data.jadwal_sbp,
    jadwal_lain_data: jl.data.kegiatan_lain,
    tim_audit_data: tima.data.tim_audit,
    biaya_total_data: ang.data.totalAnggaran,
    biaya_dinas_data: ang.data.allAnggaranDinas,
    biaya_lain_data: ang.data.allAnggaranKegiatan,
    signers: signData.map((s) => s.data),
  };
  const kode_pat = getAllStatus(state).kode || "";
  if (kode_pat.includes("kns")) {
    result.data = generateHtmlAiw(obj);
  } else if (kode_pat.includes("aikp")) {
    result.data = generateHtmlAikp(obj);
  } else if (kode_pat.includes("aiti")) {
    result.data = generateHtmlAiti(obj);
  }
  return result;
};

export const approve = (pat_id) => async (dispatch, getState, api) => {
  let genInfo = {
    data: null,
    error: null,
  };

  const state = getState();
  const isSignerPusat = getStatusCode(state) === "6";
  if (isSignerPusat) {
    const signersPusat = getSignersPusat(state);
    const signersLeft = signersPusat.filter((s) => !s.is_signed);
    const notSignedCount = signersLeft.length;
    if (notSignedCount === 1) {
      if (Number(signersLeft[0].pn) === Number(getUserPN(state))) {
        // Generate dokumen
        genInfo = await generateDocument(pat_id, state, api);
      }
    }
  }

  if (genInfo.error) return !genInfo.error;

  const form = {
    pat_id,
    note: getAlasan(getState()),
    data: genInfo.data,
  };

  const { error } = await api.approve(getToken(getState()), form);

  return !error;
};

export const fetchDocLatarBelakang =
  (pat_id) => async (dispatch, getState, api) => {
    const { error, data, comments } = await api.getDocLatarBelakang(
      getToken(getState()),
      pat_id,
    );
    if (!error) dispatch(updateComments(comments));
    return { error, data, comments };
  };
export const fetchDocSumberInformasi =
  (pat_id) => async (dispatch, getState, api) => {
    const { error, data, comments } = await api.getDocSumberInformasi(
      getToken(getState()),
      pat_id,
    );
    if (!error) dispatch(updateComments(comments));
    return { error, data, comments };
  };
export const fetchDocJadwalAudit =
  (pat_id) => async (dispatch, getState, api) => {
    const { error, data, comments } = await api.getDocJadwalAudit(
      getToken(getState()),
      pat_id,
    );
    if (!error) dispatch(updateComments(comments));
    return { error, data, comments };
  };
export const fetchDocJadwalSBP =
  (pat_id) => async (dispatch, getState, api) => {
    const { error, data, comments } = await api.getDocJadwalSBP(
      getToken(getState()),
      pat_id,
    );
    if (!error) dispatch(updateComments(comments));
    return { error, data, comments };
  };
export const fetchDocJadwalLainnya =
  (pat_id) => async (dispatch, getState, api) => {
    const { error, data, comments } = await api.getDocKegiatanLain(
      getToken(getState()),
      pat_id,
    );
    if (!error) dispatch(updateComments(comments));
    return { error, data, comments };
  };
export const fetchDocTimAudit = (pat_id) => async (dispatch, getState, api) => {
  const { error, data, comments } = await api.getDocTimAudit(
    getToken(getState()),
    pat_id,
  );
  if (!error) dispatch(updateComments(comments));
  return { error, data, comments };
};
export const fetchDocTargetAudit =
  (pat_id) => async (dispatch, getState, api) => {
    const { error, data, comments } = await api.getDocTargetAudit(
      getToken(getState()),
      pat_id,
    );
    if (!error) dispatch(updateComments(comments ? comments : []));
    return { error, data, comments };
  };
export const fetchDocAnggaran = (pat_id) => async (dispatch, getState, api) => {
  const { error, data, comments } = await api.getDocAnggaran(
    getToken(getState()),
    pat_id,
  );
  if (!error) dispatch(updateComments(comments ? comments : []));
  return { error, data, comments };
};

export const addNewComment =
  (pat_id, comment) => async (dispatch, getState, api) => {
    const form = {
      parent_comment_id: null,
      pat_id,
      ref_bab_pat_kode: getRefBabPatKode(getState()),
      deskripsi: comment,
    };
    const { error, data } = await api.createNewComment(
      getToken(getState()),
      form,
    );

    if (!error) {
      const comments = getComments(getState());
      const newComment = {
        ...data,
        pn_create_by: data.create_by.pn,
        nama_create_by: data.create_by.nama,
      };
      dispatch(updateComments([[newComment], ...comments]));
    }

    return !error;
  };

export const reply =
  (pat_id, parent_id, comment) => async (dispatch, getState, api) => {
    const form = {
      parent_comment_id: parent_id,
      pat_id,
      ref_bab_pat_kode: getRefBabPatKode(getState()),
      deskripsi: comment,
    };
    const { error, data } = await api.createNewComment(
      getToken(getState()),
      form,
    );

    if (!error) {
      const comments = getComments(getState());
      const otherThreads = comments.filter(
        (c) => !c.some((a) => a.id === parent_id),
      );
      const thisThread = comments.filter((c) =>
        c.some((a) => a.id === parent_id),
      )[0];

      const newComment = {
        ...data,
        pn_create_by: data.create_by.pn,
        nama_create_by: data.create_by.nama,
      };
      thisThread.push(newComment);
      dispatch(updateComments([thisThread, ...otherThreads]));
    }

    return !error;
  };

export const closeComment = (parent_id) => async (dispatch, getState, api) => {
  const { error } = await api.closeComment(getToken(getState()), parent_id);

  if (!error) {
    const comments = getComments(getState());
    const otherThreads = comments.filter(
      (c) => !c.some((a) => a.id === parent_id),
    );
    const thisThread = comments.filter((c) =>
      c.some((a) => a.id === parent_id),
    )[0];
    const newThisComment = thisThread.map((t) => ({
      ...t,
      is_closed: true,
    }));
    dispatch(updateComments([newThisComment, ...otherThreads]));
  }

  return !error;
};
