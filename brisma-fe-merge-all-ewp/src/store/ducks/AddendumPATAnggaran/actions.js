import moment from "moment";
import { backendFormat } from "../../../utils/momentHelpers";
import { getToken } from "../auth/selectors";
import { fetchRefKategoriAnggaran } from "../reference/actions";
import { getRefKategoriAnggaran } from "../reference/selectors";
import {
  getAnggota,
  getBiayaDinas,
  getBiayaKegiatan,
  getCurrentEditedId,
  getCurrentPage,
  getFilters,
  getFormStepOne,
} from "./selectors";
import * as types from "./types";

export const updateFilterForm = (filters) => ({
  type: types.UPDATE_FILTER_FORM,
  payload: filters,
});

export const updateSortBy = (value) => ({
  type: types.UPDATE_SORT_BY,
  payload: value,
});

export const updateFormStepOne = (newForm) => {
  if (newForm.start_date) {
    newForm.start_date = newForm.start_date.format(backendFormat);
  }
  if (newForm.end_date) {
    newForm.end_date = newForm.end_date.format(backendFormat);
  }
  return {
    type: types.UPDATE_FORM_STEP_1,
    payload: newForm,
  };
};

export const updateFormStepOneStatus = (isFilled) => {
  return {
    type: types.UPDATE_FORM_STEP_1_STATUS,
    payload: isFilled,
  };
};

export const updateFormStepTwoStatus = (isFilled) => {
  return {
    type: types.UPDATE_FORM_STEP_2_STATUS,
    payload: isFilled,
  };
};

export const goNextStep = () => ({ type: types.GO_NEXT_STEP });
export const goPrevStep = () => ({ type: types.GO_PREV_STEP });

export const fetchAnggaran = (pat_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_START });

  const filters = { ...getFilters(getState()) };
  if (filters.start_date)
    filters.start_date = moment(filters.start_date).format("YYYY/MM/DD");
  if (filters.end_date)
    filters.end_date = moment(filters.end_date).format("YYYY/MM/DD");
  filters.anggaran = filters.anggaran
    ? `${filters.modifier === "less" ? "<" : ">"} ${filters.anggaran}`
    : "";

  const { error, data, page } = await api.getAllKegiatanLainAddendum(
    getToken(getState()),
    pat_id,
    getCurrentPage(getState()),
    filters,
  );

  if (!error) {
    dispatch({
      type: types.FETCH_SUCCESSFUL,
      payload: {
        data: { kegiatan_lain: data, jadwal_sbp: [], jadwal_audit: [] },
        page,
      },
    });
  } else {
    dispatch({
      type: types.FETCH_FAILED,
      payload: error,
    });
  }

  return !error;
};

export const submitForm =
  (pat_id, alasan_adendum) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_START });

    const formStepOne = getFormStepOne(getState());
    const prepareStepOne = {
      nama: formStepOne.nama_kegiatan,
      orgeh_induk: formStepOne.uker.orgeh.child,
      orgeh_name: formStepOne.uker.orgeh.my_name,
      branch_induk: formStepOne.uker.branch.branch,
      branch_name: formStepOne.uker.branch.brdesc,
      pelaksanaan_start: formStepOne.start_date,
      pelaksanaan_end: formStepOne.end_date,
    };

    const formStepTwo = getAnggota(getState());
    const prepareStepTwo = formStepTwo.map((anggota) => ({
      pn: anggota.pn,
      nama: anggota.nama,
      jabatan: anggota.jabatan,
    }));

    const kategori_anggaran = getRefKategoriAnggaran(getState());
    const biaya_kegiatan = getBiayaKegiatan(getState());
    const anggaran_kegiatan = [];
    Object.keys(biaya_kegiatan).forEach((p) => {
      const kategori = kategori_anggaran.find((k) => k.nama === p);
      Object.keys(biaya_kegiatan[p]).forEach((c) => {
        const sub_kategori = kategori.ref_sub_kategori_anggarans.find(
          (s) => s.nama === c,
        );
        anggaran_kegiatan.push({
          ref_sub_kategori_anggaran_kode: {
            ref_sub_kategori_anggaran_kode: sub_kategori.id,
            ref_sub_kategori_anggaran_name: sub_kategori.nama,
          },
          amount: biaya_kegiatan[p][c],
        });
      });
    });

    const prepareStepThree = {
      anggaran_dinas: [...getBiayaDinas(getState())],
      anggaran_kegiatan,
    };

    let total_anggaran = 0;
    prepareStepThree.anggaran_dinas.forEach((a) => {
      total_anggaran += Number(a.biaya_perjalanan_hari) || 0;
      total_anggaran += Number(a.biaya_tiket_pp) || 0;
      total_anggaran += Number(a.biaya_transport_lokal) || 0;
      total_anggaran += Number(a.biaya_akomodasi) || 0;
    });
    prepareStepThree.anggaran_kegiatan.forEach(
      (a) => (total_anggaran += Number(a.amount) || 0),
    );

    const finalForm = {
      pat_id,
      kegiatan_lain_id: "new",
      total_anggaran,
      ...prepareStepOne,
      anggota: [...prepareStepTwo],
      ...prepareStepThree,
    };

    const result = {
      pat_id,
      part: "kegiatan_lain",
      alasan_adendum,
      sesudah: finalForm,
    };

    // console.log("Final form: ", result);

    // dispatch({ type: types.SUBMIT_SUCCESSFUL });
    // return false;

    const { error } = await api.updateAddendum(getToken(getState()), result);

    if (!error) {
      dispatch({ type: types.SUBMIT_SUCCESSFUL });
    } else {
      dispatch({ type: types.SUBMIT_FAILED });
    }

    return !error;
  };

export const submitEditForm =
  (pat_id, alasan_adendum) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_START });

    const formStepOne = getFormStepOne(getState());
    const prepareStepOne = {
      nama: formStepOne.nama_kegiatan,
      orgeh_induk: formStepOne.uker.orgeh.child,
      orgeh_name: formStepOne.uker.orgeh.my_name,
      branch_induk: formStepOne.uker.branch.branch,
      branch_name: formStepOne.uker.branch.brdesc,
      pelaksanaan_start: formStepOne.start_date,
      pelaksanaan_end: formStepOne.end_date,
    };

    const formStepTwo = getAnggota(getState());
    const prepareStepTwo = formStepTwo.map((anggota) => ({
      pn: anggota.pn,
      nama: anggota.nama,
      jabatan: anggota.jabatan,
    }));

    const kategori_anggaran = getRefKategoriAnggaran(getState());
    const biaya_kegiatan = getBiayaKegiatan(getState());
    const anggaran_kegiatan = [];
    Object.keys(biaya_kegiatan).forEach((p) => {
      const kategori = kategori_anggaran.find((k) => k.nama === p);
      Object.keys(biaya_kegiatan[p]).forEach((c) => {
        const sub_kategori = kategori.ref_sub_kategori_anggarans.find(
          (s) => s.nama === c,
        );
        anggaran_kegiatan.push({
          ref_sub_kategori_anggaran_kode: {
            ref_sub_kategori_anggaran_kode: sub_kategori.id,
            ref_sub_kategori_anggaran_name: sub_kategori.nama,
          },
          amount: biaya_kegiatan[p][c],
        });
      });
    });

    const prepareStepThree = {
      anggaran_dinas: [...getBiayaDinas(getState())],
      anggaran_kegiatan,
    };

    let total_anggaran = 0;
    prepareStepThree.anggaran_dinas.forEach((a) => {
      total_anggaran += Number(a.biaya_perjalanan_hari) || 0;
      total_anggaran += Number(a.biaya_tiket_pp) || 0;
      total_anggaran += Number(a.biaya_transport_lokal) || 0;
      total_anggaran += Number(a.biaya_akomodasi) || 0;
    });
    prepareStepThree.anggaran_kegiatan.forEach(
      (a) => (total_anggaran += Number(a.amount) || 0),
    );

    const finalForm = {
      pat_id,
      kegiatan_lain_id: getCurrentEditedId(getState()),
      total_anggaran,
      ...prepareStepOne,
      anggota: [...prepareStepTwo],
      ...prepareStepThree,
    };

    const result = {
      pat_id,
      part: "kegiatan_lain",
      alasan_adendum,
      sesudah: finalForm,
    };

    // console.log("Final form: ", result);
    // return false;

    const { error } = await api.updateAddendum(getToken(getState()), result);
    if (!error) {
      dispatch({ type: types.SUBMIT_SUCCESSFUL });
    } else {
      dispatch({ type: types.SUBMIT_FAILED });
    }

    return !error;
  };

export const deleteKegiatanLain =
  (pat_id, kegiatan_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.DELETE_START });

    const form = {
      part: "kegiatan_lain",
      pat_id,
      kegiatan_lain_id: kegiatan_id,
    };

    const { error } = await api.deleteAddendum(getToken(getState()), form);

    if (!error) {
      dispatch({ type: types.DELETE_SUCCESSFUL, payload: kegiatan_id });
    } else {
      dispatch({
        type: types.DELETE_FAILED,
        payload: error,
      });
    }

    return !error;
  };

export const addAnggota = (anggota) => (dispatch, getState, api) => {
  dispatch({ type: types.ADD_ANGGOTA, payload: anggota });
  dispatch({ type: types.UPDATE_BIAYA_DINAS, payload: [] });
};

export const addBiayaDinas =
  ({ posisi_jabatan, ...biaya }) =>
  (dispatch, getState, api) => {
    const biaya_dinas = getBiayaDinas(getState());
    if (
      biaya_dinas.some((biaya) => biaya.pn_auditor.jabatan === posisi_jabatan)
    ) {
      const copy = biaya_dinas.map((p) => {
        if (p.pn_auditor.jabatan === posisi_jabatan) {
          return {
            ...p,
            ...biaya,
          };
        }
        return p;
      });
      dispatch({ type: types.UPDATE_BIAYA_DINAS, payload: [...copy] });
      return;
    }

    const anggota = getAnggota(getState());
    const anggotaSamaJabatan = anggota.filter(
      (item) => item.jabatan === posisi_jabatan,
    );
    anggotaSamaJabatan.forEach((p) => {
      const payload = {
        pn_auditor: { ...p },
        ...biaya,
      };
      dispatch({ type: types.ADD_BIAYA_DINAS_ANGGOTA, payload });
    });
  };

export const addBiayaKegiatan =
  ({ kegiatan, ...biaya }) =>
  (dispatch, getState, api) => {
    dispatch({
      type: types.ADD_BIAYA_KEGIATAN,
      payload: { [kegiatan]: { ...biaya } },
    });
  };

export const changePage = (page) => ({
  type: types.CHANGE_PAGE,
  payload: page,
});

export const openCreateModal = () => ({ type: types.OPEN_CREATE_MODAL });
export const closeCreateModal = () => ({ type: types.CLOSE_CREATE_MODAL });

export const openEditModal =
  (pat_id, kegiatan_id) => async (dispatch, getState, api) => {
    const { error, data } = await api.getKegiatanLainByIdAddendum(
      getToken(getState()),
      pat_id,
      kegiatan_id,
    );
    if (error) return;

    dispatch({ type: types.SET_CURRENT_EDITED_ID, payload: kegiatan_id });

    // Mapping response data to Info Kegiatan form
    const mapStepOne = {
      nama_kegiatan: data.kegiatan_lain.nama,
      uker: {
        orgeh: {
          child: data.kegiatan_lain.orgeh_induk,
          my_name: data.orgeh_name || data.kegiatan_lain.orgeh_name,
        },
        branch: {
          branch: data.kegiatan_lain.branch_induk,
          brdesc: data.branch_name || data.kegiatan_lain.branch_name,
        },
      },
      start_date: moment(data.kegiatan_lain.pelaksanaan_start, backendFormat),
      end_date: moment(data.kegiatan_lain.pelaksanaan_end, backendFormat),
    };
    dispatch(updateFormStepOne(mapStepOne));

    // Mapping response data to Tim form
    data.anggota_kegiatan.forEach((a) => {
      const b = {
        pn: a.pn || a.pn_anggota,
        nama: a.nama || a.nama_anggota,
        jabatan: a.jabatan,
      };
      dispatch({ type: types.ADD_ANGGOTA, payload: b });
    });

    // Mapping response data to Biaya Dinas and Biaya Kegiatan form
    dispatch({
      type: types.UPDATE_BIAYA_DINAS,
      payload: [...data.anggaran_dinas] || [],
    });

    await dispatch(fetchRefKategoriAnggaran());
    const ref_kategori_anggaran = getRefKategoriAnggaran(getState());
    data.anggaran_kegiatan.forEach((k) => {
      const amount = k.amount;
      const sub_kategori_nama =
        k.ref_sub_kategori_anggaran_kode.ref_sub_kategori_anggaran_name;
      const parent = ref_kategori_anggaran.find((r) =>
        r.ref_sub_kategori_anggarans.some((s) => s.nama === sub_kategori_nama),
      );

      const currentBiaya = getBiayaKegiatan(getState())[parent.nama];
      const newBiaya = {
        ...currentBiaya,
        [sub_kategori_nama]: amount,
      };
      dispatch(addBiayaKegiatan({ kegiatan: parent.nama, ...newBiaya }));
    });

    dispatch({ type: types.OPEN_EDIT_MODAL });
  };
export const setCurrentEditedId = (kegiatan_id) => ({
  type: types.SET_CURRENT_EDITED_ID,
  payload: kegiatan_id,
});
export const closeEditModal = () => ({ type: types.CLOSE_EDIT_MODAL });

export const reset = (pat_id) => async (dispatch, getState, api) => {
  const { error } = await api.resetAddendum(
    getToken(getState()),
    "kegiatan_lain",
    pat_id,
  );
  return !error;
};
