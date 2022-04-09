import { generateHtmlAddendumAikp } from "../../../templates/addendum AIKP";
import { generateHtmlAddendumAiti } from "../../../templates/addendum AITI";
import { generateHtmlAddendumAiw } from "../../../templates/addendum AIW";
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

  const { error, data } = await api.getDocumentInfoAddendum(
    getToken(getState()),
    pat_id,
  );
  const { error: logError, data: logData } =
    await api.getLogPersetujuanAddendum(getToken(getState()), pat_id);

  if (!error) {
    const newData = {
      pn_maker_akhir: data.maker.pn_maker_akhir,
      pn_maker_pusat: data.maker.pn_maker_pusat,
      stc_status_kode: data.maker.status_kode,
      stc_persetujuan_kode: data.maker.persetujuan_kode,
      checkers_ukas: data.checkers_ukas,
      signers_ukas: data.signers_ukas,
      checkers_pusats: data.checkers_pusats,
      signers_pusats: data.signers_pusats,
    };
    dispatch({
      type: types.FETCH_INFO_SUCCESSFUL,
      payload: { ...newData, logs: logData ? logData : [] },
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

  const { error } = await api.createMakerUKAAddendum(
    getToken(getState()),
    form,
  );

  return !error;
};

export const createMakerPusat = (pat_id) => async (dispatch, getState, api) => {
  const { checkers, signers } = getFormPusat(getState());
  const form = {
    pat_id,
    checkers: checkers.filter((c) => c),
    signers: signers.filter((s) => s),
  };

  const { error } = await api.createMakerPusatAddendum(
    getToken(getState()),
    form,
  );

  return !error;
};

export const reject = (pat_id) => async (dispatch, getState, api) => {
  const form = {
    pat_id,
    note: getAlasan(getState()),
  };
  const { error } = await api.rejectAddendum(getToken(getState()), form);

  return !error;
};

const generateDocument = async (pat_id, state, api) => {
  const result = { data: null, error: null };

  const token = getToken(state);
  const tahun = getAllStatus(state).tahun;
  const addendum_no = getAllStatus(state).riwayat_adendum;
  const { error, data } = await api.getDocumentAddendum(token, pat_id);

  if (error) {
    result.error = error;
    return result;
  }

  const signData = await Promise.all(
    getSignersUka(state).map((s) =>
      api.searchSigner(token, pat_id, s.pn, true, addendum_no),
    ),
  );

  const anySignerError = data.find((d) => d.error);
  if (anySignerError) {
    result.error = anySignerError.error;
    return result;
  }

  const obj = {
    tahun,
    data,
    signers: signData.map((s) => s.data),
  };
  const kode_pat = getAllStatus(state).kode || "";
  if (kode_pat.includes("kns")) {
    result.data = generateHtmlAddendumAiw(obj);
  } else if (kode_pat.includes("aikp")) {
    result.data = generateHtmlAddendumAikp(obj);
  } else if (kode_pat.includes("aiti")) {
    result.data = generateHtmlAddendumAiti(obj);
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

  const { error } = await api.approveAddendum(getToken(getState()), form);

  return !error;
};

export const addNewComment =
  (pat_id, comment) => async (dispatch, getState, api) => {
    const form = {
      parent_comment_id: null,
      pat_id,
      ref_bab_pat_kode: getRefBabPatKode(getState()),
      deskripsi: comment,
    };
    const { error, data } = await api.createNewCommentAddendum(
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
    const { error, data } = await api.createNewCommentAddendum(
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
  const { error } = await api.closeCommentAddendum(
    getToken(getState()),
    parent_id,
  );

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

export const fetchDocContent = (pat_id) => async (dispatch, getState, api) => {
  const { error, data, comment } = await api.getDocumentAddendum(
    getToken(getState()),
    pat_id,
  );
  if (!error) dispatch(updateComments(comment ? comment : []));
  return { error, data, comments: comment ? comment : [] };
};
