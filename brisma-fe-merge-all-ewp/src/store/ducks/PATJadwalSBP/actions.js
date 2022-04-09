import moment from "moment";
import { backendFormat } from "../../../utils/momentHelpers";
import { getToken } from "../auth/selectors";
import { fetchRefKategoriAnggaran } from "../reference/actions";
import { getRefKategoriAnggaran } from "../reference/selectors";
import {
  getBiayaDinas,
  getBiayaKegiatan,
  getCurrentEditedId,
  getCurrentPage,
  getFilters,
  getFormStepOne,
  getFormStepTwo,
  getPembicara,
  getPenanggungJawab,
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

export const updateFormStepTwo = (newForm) => {
  return {
    type: types.UPDATE_FORM_STEP_2,
    payload: newForm,
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

export const submitForm = (pat_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.SUBMIT_START });

  const formStepOne = getFormStepOne(getState());
  const prepareStepOne = {
    name: !formStepOne.kegiatan.id ? formStepOne.kegiatan.nama : null,
    sbp_id: formStepOne.kegiatan.id ? formStepOne.kegiatan.id : null,
    orgeh_induk: formStepOne.uker.orgeh.child,
    branch_induk: formStepOne.uker.branch.branch,
    pelaksanaan_start: formStepOne.start_date,
    pelaksanaan_end: formStepOne.end_date,
  };

  const formStepTwo = getFormStepTwo(getState());
  const prepareStepTwo = {
    ...formStepTwo,
  };

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

  // const anggaran_dinas = []
  // // Jika ada pembicara / PIC yang tidak terdata di anggaran_dinas, masukkan semua nya tapi anggarannya diisi 0
  // getPembicara(getState()).forEach(p => {
  //   const biaya_dinas = getBiayaDinas(getState())
  //   if (!biaya_dinas.pembicara.some((b) => b.pn_auditor.pn === p.pn)) {
  // 		const a = {
  // 			pn_auditor: { ...p },
  // 			biaya_tiket_pp: 0,
  // 			biaya_transport_lokal: 0,
  // 			biaya_perjalanan_hari: 0,
  // 			biaya_akomodasi: 0,
  // 		};
  // 		anggaran_dinas.push(a);
  // 	}
  //   if (!biaya_dinas.penanggung_jawab.some((b) => b.pn_auditor.pn === p.pn)) {
  // 		const a = {
  // 			pn_auditor: { ...p },
  // 			biaya_tiket_pp: 0,
  // 			biaya_transport_lokal: 0,
  // 			biaya_perjalanan_hari: 0,
  // 			biaya_akomodasi: 0,
  // 		};
  // 		anggaran_dinas.push(a);
  // 	}
  // })

  const prepareStepThree = {
    anggaran_dinas: [
      // ...anggaran_dinas,
      ...getBiayaDinas(getState()).pembicara,
      ...getBiayaDinas(getState()).penanggung_jawab,
    ],
    anggaran_kegiatan,
  };

  const finalForm = {
    pat_id,
    ...prepareStepOne,
    ...prepareStepTwo,
    ...prepareStepThree,
  };

  // console.log("Final: ", finalForm)
  // return false;

  // console.log("Final: ", finalForm);
  // return false;
  const { error } = await api.createJadwalSbp(getToken(getState()), finalForm);
  if (!error) {
    dispatch({ type: types.SUBMIT_SUCCESSFUL });
  } else {
    dispatch({ type: types.SUBMIT_FAILED });
  }

  // console.log("Final: ", finalForm);

  return !error;
};

export const submitEditForm = (pat_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.SUBMIT_START });

  const formStepOne = getFormStepOne(getState());
  // console.log(formStepOne);
  const prepareStepOne = {
    name: !formStepOne.kegiatan.id ? formStepOne.kegiatan.nama : null,
    sbp_id: formStepOne.kegiatan.id ? formStepOne.kegiatan.id : null,
    orgeh_induk: formStepOne.uker.orgeh.child,
    branch_induk: formStepOne.uker.branch.branch,
    pelaksanaan_start: formStepOne.start_date,
    pelaksanaan_end: formStepOne.end_date,
  };

  const formStepTwo = getFormStepTwo(getState());
  const prepareStepTwo = {
    pembicara: formStepTwo.pn_pembicara,
    penanggung_jawab: formStepTwo.pn_penanggung_jawab,
  };

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
    anggaran_dinas: [
      ...getBiayaDinas(getState()).pembicara,
      ...getBiayaDinas(getState()).penanggung_jawab,
    ],
    anggaran_kegiatan,
  };

  const finalForm = {
    pat_id,
    jadwal_sbp_id: getCurrentEditedId(getState()),
    ...prepareStepOne,
    ...prepareStepTwo,
    ...prepareStepThree,
  };

  // console.log("Final: ", finalForm)
  // return false;

  const { error } = await api.updateJadwalSbp(getToken(getState()), finalForm);
  if (!error) {
    dispatch({ type: types.SUBMIT_SUCCESSFUL });
  } else {
    dispatch({ type: types.SUBMIT_FAILED });
  }

  return !error;
};

export const fetchAllSbp = (pat_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.FETCH_START });

  const filters = { ...getFilters(getState()) };
  if (filters.start_date)
    filters.start_date = moment(filters.start_date).format("YYYY/MM/DD");
  if (filters.end_date)
    filters.end_date = moment(filters.end_date).format("YYYY/MM/DD");
  filters.anggaran = filters.anggaran
    ? `${filters.modifier === "less" ? "<" : ">"} ${filters.anggaran}`
    : "";
  const { error, data, page } = await api.getAllSbp(
    getToken(getState()),
    pat_id,
    getCurrentPage(getState()),
    filters,
  );

  if (!error) {
    dispatch({ type: types.FETCH_SUCCESSFUL, payload: { data, page } });
  } else {
    dispatch({
      type: types.FETCH_FAILED,
      payload: error,
    });
  }

  return !error;
};

export const deleteJadwalSbp =
  (jadwal_sbp_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.DELETE_START });

    const { error } = await api.deleteJadwalSbp(
      getToken(getState()),
      jadwal_sbp_id,
    );

    if (!error) {
      dispatch({ type: types.DELETE_SUCCESSFUL, payload: jadwal_sbp_id });
    } else {
      dispatch({
        type: types.DELETE_FAILED,
        payload: error,
      });
    }

    return !error;
  };

export const addPembicara = (pembicara) => (dispatch, getState, api) => {
  dispatch({ type: types.ADD_PEMBICARA, payload: pembicara });
  dispatch({ type: types.UPDATE_BIAYA_DINAS_PEMBICARA, payload: [] });
};

export const addPenanggungJawab =
  (penanggung_jawab) => (dispatch, getState, api) => {
    dispatch({ type: types.ADD_PENANGGUNG_JAWAB, payload: penanggung_jawab });
    dispatch({ type: types.UPDATE_BIAYA_DINAS_PENANGGUNG_JAWAB, payload: [] });
  };

export const addBiayaDinas =
  ({ posisi_jabatan, ...biaya }) =>
  (dispatch, getState, api) => {
    const [posisi, jabatan] = posisi_jabatan.split(",");

    if (posisi === "pembicara") {
      const biaya_dinas = getBiayaDinas(getState());
      if (
        biaya_dinas.pembicara.some(
          (biaya) => biaya.pn_auditor.jabatan === jabatan,
        )
      ) {
        const copy = biaya_dinas.pembicara.map((p) => {
          if (p.pn_auditor.jabatan === jabatan) {
            return {
              ...p,
              ...biaya,
            };
          }
          return p;
        });
        dispatch({
          type: types.UPDATE_BIAYA_DINAS_PEMBICARA,
          payload: [...copy],
        });
        return;
      }

      const pembicara = getPembicara(getState());
      const pembicaraSamaJabatan = pembicara.filter(
        (item) => item.jabatan === jabatan,
      );
      pembicaraSamaJabatan.forEach((p) => {
        const biaya_dinas = getBiayaDinas(getState());
        const payload = {
          pn_auditor: { ...p },
          ...biaya,
        };
        dispatch({
          type: types.UPDATE_BIAYA_DINAS_PEMBICARA,
          payload: [...biaya_dinas.pembicara, payload],
        });
      });
    } else if (posisi === "pic") {
      const biaya_dinas = getBiayaDinas(getState());
      if (
        biaya_dinas.penanggung_jawab.some(
          (biaya) => biaya.pn_auditor.jabatan === jabatan,
        )
      ) {
        const copy = biaya_dinas.penanggung_jawab.map((p) => {
          if (p.pn_auditor.jabatan === jabatan) {
            return {
              ...p,
              ...biaya,
            };
          }
          return p;
        });
        dispatch({
          type: types.UPDATE_BIAYA_DINAS_PENANGGUNG_JAWAB,
          payload: [...copy],
        });
        return;
      }

      const penanggung_jawab = getPenanggungJawab(getState());
      const penanggungJawabSamaJabatan = penanggung_jawab.filter(
        (item) => item.jabatan === jabatan,
      );
      penanggungJawabSamaJabatan.forEach((p) => {
        const biaya_dinas = getBiayaDinas(getState());
        const payload = {
          pn_auditor: { ...p },
          ...biaya,
        };
        dispatch({
          type: types.UPDATE_BIAYA_DINAS_PENANGGUNG_JAWAB,
          payload: [...biaya_dinas.penanggung_jawab, payload],
        });
      });
    }
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
  (pat_id, sbp_id) => async (dispatch, getState, api) => {
    const { error, data } = await api.getDetailSbp(
      getToken(getState()),
      pat_id,
      sbp_id,
    );

    if (error) return error;
    const mapStepOne = {
      kegiatan: {
        nama: data.jadwal.sbp_name,
        id: data.jadwal.id_sbp,
      },
      uker: {
        orgeh: {
          child: data.jadwal.orgeh_induk,
          my_name: data.jadwal.orgeh_name,
        },
        branch: {
          branch: data.jadwal.branch_induk,
          brdesc: data.jadwal.branch_name,
        },
      },
      start_date: moment(data.jadwal.pelaksanaan_start, backendFormat),
      end_date: moment(data.jadwal.pelaksanaan_end, backendFormat),
    };

    dispatch(updateFormStepOne(mapStepOne));

    const pembicara = data.pembicara.map((p) => ({
      pn: p.pn || p.id_pembicara,
      jabatan: p.jabatan,
      nama: p.nama_pembicara,
    }));

    const penanggung_jawab = data.penanggung_jawab.map((p) => ({
      pn: p.pn || p.id_penanggung_jawab,
      jabatan: p.jabatan,
      nama: p.nama_penanggung_jawab,
    }));

    dispatch(
      updateFormStepTwo({
        pn_pembicara: pembicara,
        pn_penanggung_jawab: penanggung_jawab,
      }),
    );

    data.anggaran_dinas.forEach((a) => {
      const biaya_dinas = getBiayaDinas(getState());
      const pn = a.pn_auditor.pn;
      const foundInPembicara = data.pembicara.some((p) => p.pn === pn);
      if (foundInPembicara) {
        dispatch({
          type: types.UPDATE_BIAYA_DINAS_PEMBICARA,
          payload: [...biaya_dinas.pembicara, a],
        });
        return;
      }
      const foundInPIC = data.penanggung_jawab.some((p) => p.pn === pn);
      if (foundInPIC) {
        dispatch({
          type: types.UPDATE_BIAYA_DINAS_PENANGGUNG_JAWAB,
          payload: [...biaya_dinas.penanggung_jawab, a],
        });
        return;
      }
    });
    // Mapping response data to Biaya Dinas and Biaya Kegiatan form
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
    dispatch(setCurrentEditedId(sbp_id));
    dispatch({ type: types.OPEN_EDIT_MODAL });
  };
export const setCurrentEditedId = (sbp_id) => ({
  type: types.SET_CURRENT_EDITED_ID,
  payload: sbp_id,
});
export const closeEditModal = () => ({ type: types.CLOSE_EDIT_MODAL });
