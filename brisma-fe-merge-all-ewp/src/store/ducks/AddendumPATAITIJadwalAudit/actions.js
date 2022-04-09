import moment, { isMoment } from "moment";
import { backendFormat } from "../../../utils/momentHelpers";
import { getToken } from "../auth/selectors";
import {
  fetchRefEchannel,
  fetchRefKategoriAnggaran,
  fetchRefTipeObjek,
} from "../reference/actions";
import {
  getRefEchannel,
  getRefKategoriAnggaran,
  getRefTeamsAddendum,
  getRefTemaAudit,
  getRefTipeAudit,
  getRefTipeObjek,
} from "../reference/selectors";
import {
  getBiayaDinas,
  getBiayaKegiatan,
  getCurrentEditedId,
  getCurrentPage,
  getEchannels,
  getFilters,
  getFormStepOne,
  getJadwalAudit,
  getRows,
  getSelectedTemaAudit,
  getSelectedTim,
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

export const updateJadwalAudit = (newJadwal) => ({
  type: types.UPDATE_JADWAL,
  payload: newJadwal,
});

export const openCreateModal = () => ({ type: types.OPEN_CREATE_MODAL });
export const closeCreateModal = () => ({ type: types.CLOSE_CREATE_MODAL });

export const goNextStep = () => ({ type: types.GO_NEXT_STEP });
export const goPrevStep = () => ({ type: types.GO_PREV_STEP });

export const changePage = (page) => ({
  type: types.CHANGE_PAGE,
  payload: page,
});

export const updateFormStepOne = (newForm) => (dispatch, getState) => {
  if (newForm.start_date) {
    newForm.start_date = newForm.start_date.format(backendFormat);
  }
  if (newForm.end_date) {
    newForm.end_date = newForm.end_date.format(backendFormat);
  }

  if (newForm.tim !== getSelectedTim(getState())) {
    dispatch({ type: types.UPDATE_BIAYA_DINAS, payload: [] });
  }

  dispatch({
    type: types.UPDATE_FORM_STEP_1,
    payload: newForm,
  });
};

export const updateFormStepOneStatus = (isFilled) => {
  return {
    type: types.UPDATE_FORM_STEP_1_STATUS,
    payload: isFilled,
  };
};

export const updateRowBranch = (newData) => {
  return {
    type: types.UPDATE_ROWS,
    payload: newData,
  };
};

export const updateEchannel = (echannels) => {
  const copyEchannels = { ...echannels };
  Object.keys(copyEchannels).forEach((key) => {
    if (copyEchannels[key].posisi_data) {
      copyEchannels[key].posisi_data = moment(
        copyEchannels[key].posisi_data,
      ).format(backendFormat);
    }
  });
  return {
    type: types.UPDATE_ECHANNELS,
    payload: copyEchannels,
  };
};

export const addBiayaKegiatan =
  ({ kegiatan, ...biaya }) =>
  (dispatch, getState, api) => {
    dispatch({
      type: types.ADD_BIAYA_KEGIATAN,
      payload: { [kegiatan]: { ...biaya } },
    });
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

    const ref_teams = getRefTeamsAddendum(getState());
    const selectedTimId = getSelectedTim(getState());
    const anggota = ref_teams.find((t) => t.id === selectedTimId);
    const anggotaSamaJabatan = [];
    if (anggota.pn_kta.jabatan === posisi_jabatan) {
      anggotaSamaJabatan.push({
        pn: anggota.pn_kta.pn,
        nama: anggota.pn_kta.nama,
        jabatan: anggota.pn_kta.jabatan,
      });
    }
    if (anggota.pn_ma.jabatan === posisi_jabatan) {
      anggotaSamaJabatan.push({
        pn: anggota.pn_ma.pn,
        nama: anggota.pn_ma.nama,
        jabatan: anggota.pn_ma.jabatan,
      });
    }
    const atas = anggota.ref_tim_audit_ata || anggota.atas;
    atas
      .filter((item) => item.jabatan === posisi_jabatan)
      .forEach((ata) => {
        anggotaSamaJabatan.push({
          pn: ata.pn_ata,
          nama: ata.nama_ata,
          jabatan: ata.jabatan,
        });
      });
    anggotaSamaJabatan.forEach((p) => {
      const payload = {
        pn_auditor: { ...p },
        ...biaya,
      };
      dispatch({ type: types.ADD_BIAYA_DINAS_ANGGOTA, payload });
    });
  };

export const submitForm =
  (pat_id, alasan_adendum) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_START });

    const formStepOne = getFormStepOne(getState());
    const ref_tipe_audit = getRefTipeAudit(getState()).find(
      (ta) => ta.kode === formStepOne.tipe_audit,
    );
    const tema_audit = getRefTemaAudit(getState()).find(
      (t) => t.kode === getSelectedTemaAudit(getState()),
    );

    const prepareStepOne = {
      name_kegiatan_audit: formStepOne.nama_kegiatan_audit,
      tim_audit_id: formStepOne.tim,
      pelaksanaan_start: formStepOne.start_date,
      pelaksanaan_end: formStepOne.end_date,
      audit_type: {
        audit_kode: ref_tipe_audit.kode,
        audit_type: ref_tipe_audit.nama,
      },
      tema_audit,
    };

    // console.log("Step one: ", prepareStepOne);

    await dispatch(fetchRefTipeObjek());
    const objek_audit = [];
    const ref_tipe_objek = getRefTipeObjek(getState());
    getRows(getState()).forEach((row) => {
      const curr_tipe_objek = ref_tipe_objek.find(
        (t) => t.name === row.tipe_objek,
      );
      const tipe_objek = {
        id: curr_tipe_objek.kode,
        name: curr_tipe_objek.name,
      };
      const curr_objek = curr_tipe_objek.stc_aiti_objek.find(
        (o) => o.name === row.objek,
      );
      const objek = {
        kode: curr_objek.kode,
        name: curr_objek.name,
      };
      const a = {
        tipe_objek,
        objek,
        deskripsi: row.deskripsi,
        attachments: row.attachments || [],
      };
      objek_audit.push(a);
    });
    // console.log("Objek Audit: ", objek_audit);

    await dispatch(fetchRefEchannel());
    const formEchannel = [];
    Object.keys(getEchannels(getState())).forEach((key) => {
      const ref_echannel = getRefEchannel(getState()).find(
        (e) => e.name === key,
      );
      const ref_echanel_type_kode = {
        kode: ref_echannel.kode,
        name: ref_echannel.name,
      };
      const echannel_data = getEchannels(getState())[key];
      formEchannel.push({
        ref_echanel_type_kode,
        jumlah_existing: echannel_data.jumlah_existing,
        jumlah_target: echannel_data.jumlah_target,
        posisi_data: isMoment(echannel_data.posisi_data)
          ? moment(echannel_data.posisi_data).format(backendFormat)
          : echannel_data.posisi_data,
      });
    });

    // console.log("Echannel: ", formEchannel)

    const anggaran_dinas = [...getBiayaDinas(getState())];
    // console.log("anggaran_dinas: ", anggaran_dinas);

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
    // console.log("anggaran_kegiatan: ", anggaran_kegiatan);

    let total_anggaran = 0;
    anggaran_dinas.forEach((a) => {
      total_anggaran += Number(a.biaya_perjalanan_hari) || 0;
      total_anggaran += Number(a.biaya_tiket_pp) || 0;
      total_anggaran += Number(a.biaya_transport_lokal) || 0;
      total_anggaran += Number(a.biaya_akomodasi) || 0;
    });
    anggaran_kegiatan.forEach((a) => (total_anggaran += Number(a.amount) || 0));

    const finalForm = {
      pat_id,
      jadwal_audit_id: "new",
      total_anggaran,
      tema_audit,
      ...prepareStepOne,
      objek_audit,
      echannel: formEchannel,
      anggaran_kegiatan,
      anggaran_dinas,
    };

    const result = {
      pat_id,
      part: "jadwal_audit",
      alasan_adendum,
      sesudah: finalForm,
    };

    // console.log("Final: ", result);
    // dispatch({ type: types.SUBMIT_FAILED, payload: "ERROR TESTING" });
    // return false;

    const { error } = await api.updateAddendum(getToken(getState()), result);
    if (!error) {
      dispatch({ type: types.SUBMIT_SUCCESSFUL });
    } else {
      dispatch({ type: types.SUBMIT_FAILED, payload: error });
    }

    return !error;
  };

export const submitEditForm =
  (pat_id, alasan_adendum) => async (dispatch, getState, api) => {
    dispatch({ type: types.SUBMIT_START });

    const formStepOne = getFormStepOne(getState());
    const ref_tipe_audit = getRefTipeAudit(getState()).find(
      (ta) => ta.kode === formStepOne.tipe_audit,
    );
    const tema_audit = getRefTemaAudit(getState()).find(
      (t) => t.kode === getSelectedTemaAudit(getState()),
    );

    const prepareStepOne = {
      name_kegiatan_audit: formStepOne.nama_kegiatan_audit,
      tim_audit_id: formStepOne.tim,
      pelaksanaan_start: formStepOne.start_date,
      pelaksanaan_end: formStepOne.end_date,
      audit_type: {
        audit_kode: ref_tipe_audit.kode,
        audit_type: ref_tipe_audit.nama,
      },
      tema_audit,
    };

    // console.log("Step one: ", prepareStepOne);

    await dispatch(fetchRefTipeObjek());
    const objek_audit = [];
    const ref_tipe_objek = getRefTipeObjek(getState());
    getRows(getState()).forEach((row) => {
      const curr_tipe_objek = ref_tipe_objek.find(
        (t) => t.name === row.tipe_objek,
      );
      const tipe_objek = {
        id: curr_tipe_objek.kode,
        name: curr_tipe_objek.name,
      };
      const curr_objek = curr_tipe_objek.stc_aiti_objek.find(
        (o) => o.name === row.objek,
      );
      const objek = {
        kode: curr_objek.kode,
        name: curr_objek.name,
      };
      const a = {
        tipe_objek,
        objek,
        deskripsi: row.deskripsi,
        attachments: row.attachments || [],
      };
      objek_audit.push(a);
    });
    // console.log("Objek Audit: ", objek_audit);

    await dispatch(fetchRefEchannel());
    const formEchannel = [];
    Object.keys(getEchannels(getState())).forEach((key) => {
      const ref_echannel = getRefEchannel(getState()).find(
        (e) => e.name === key,
      );
      const ref_echanel_type_kode = {
        kode: ref_echannel.kode,
        name: ref_echannel.name,
      };
      const echannel_data = getEchannels(getState())[key];
      formEchannel.push({
        ref_echanel_type_kode,
        jumlah_existing: echannel_data.jumlah_existing,
        jumlah_target: echannel_data.jumlah_target,
        posisi_data: isMoment(echannel_data.posisi_data)
          ? moment(echannel_data.posisi_data).format(backendFormat)
          : echannel_data.posisi_data,
      });
    });

    // console.log("Echannel: ", formEchannel)

    const anggaran_dinas = [...getBiayaDinas(getState())];
    // console.log("anggaran_dinas: ", anggaran_dinas);

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
    // console.log("anggaran_kegiatan: ", anggaran_kegiatan);

    let total_anggaran = 0;
    anggaran_dinas.forEach((a) => {
      total_anggaran += Number(a.biaya_perjalanan_hari) || 0;
      total_anggaran += Number(a.biaya_tiket_pp) || 0;
      total_anggaran += Number(a.biaya_transport_lokal) || 0;
      total_anggaran += Number(a.biaya_akomodasi) || 0;
    });
    anggaran_kegiatan.forEach((a) => (total_anggaran += Number(a.amount) || 0));

    const finalForm = {
      pat_id,
      jadwal_audit_id: getCurrentEditedId(getState()),
      total_anggaran,
      tema_audit,
      ...prepareStepOne,
      objek_audit,
      echannel: formEchannel,
      anggaran_kegiatan,
      anggaran_dinas,
    };

    const result = {
      pat_id,
      part: "jadwal_audit",
      alasan_adendum,
      sesudah: finalForm,
    };

    // console.log("Final: ", result);
    // dispatch({ type: types.SUBMIT_FAILED, payload: "ERROR TESTING" });
    // return false;

    const { error } = await api.updateAddendum(getToken(getState()), result);
    if (!error) {
      dispatch({ type: types.SUBMIT_SUCCESSFUL });
    } else {
      dispatch({ type: types.SUBMIT_FAILED, payload: error });
    }

    return !error;
  };

export const fetchAllJadwalAudit =
  (pat_id) => async (dispatch, getState, api) => {
    dispatch({ type: types.FETCH_START });

    const filters = { ...getFilters(getState()) };
    if (filters.start)
      filters.start = moment(filters.start).format("YYYY/MM/DD");
    if (filters.end) filters.end = moment(filters.end).format("YYYY/MM/DD");

    const { error, data, page } = await api.getAllJadwalAuditAddendum(
      getToken(getState()),
      pat_id,
      getCurrentPage(getState()),
      filters,
    );

    if (!error) {
      dispatch({
        type: types.FETCH_SUCCESSFUL,
        payload: { data, page },
      });
    } else {
      dispatch({
        type: types.FETCH_FAILED,
        payload: error,
      });
    }

    return !error;
  };

export const deleteJadwalAudit =
  (pat_id, jadwal_audit_id) => async (dispatch, getState, api) => {
    const form = {
      part: "jadwal_audit",
      pat_id,
      jadwal_audit_id,
    };

    const { error } = await api.deleteAddendum(getToken(getState()), form);

    if (!error) {
      const newJadwal = getJadwalAudit(getState()).filter(
        (j) => j.jadwal_audit.id !== jadwal_audit_id,
      );
      dispatch({ type: types.UPDATE_JADWAL, payload: newJadwal });
    }

    return !error;
  };

export const openEditModal =
  (id, pat_id) => async (dispatch, getState, api) => {
    const { error, data } = await api.getJadwalAuditByIdAddendum(
      getToken(getState()),
      pat_id,
      id,
    );

    if (error) return;
    // Mapping response data to Info Kegiatan form
    const mapStepOne = {
      nama_kegiatan_audit: data.jadwal.name_kegiatan_audit,
      uker: {
        orgeh: data.jadwal.orgeh_induk,
        branch: data.jadwal.branch_induk,
      },
      tema: data.jadwal.tema_audit ? data.jadwal.tema_audit.kode : null,
      tim: data.jadwal.tim_audit_id,
      tipe_audit: data.jadwal.ref_mtd_stc_audit_type_kode.audit_kode,
      start_date: moment(data.jadwal.pelaksanaan_start, backendFormat),
      end_date: moment(data.jadwal.pelaksanaan_end, backendFormat),
    };
    dispatch(updateFormStepOne(mapStepOne));

    const mapUkerRows = data.auditeeOrObjek.map((o) => ({
      ...o,
      tipe_objek: o.tipe_objek.name,
      objek: o.objek.name,
      attachments: !o.attachments ? [] : o.attachments,
    }));
    dispatch(updateRowBranch(mapUkerRows));

    const mapEchannel = {};
    data.echannel.forEach((e) => {
      mapEchannel[e.ref_echanel_type_kode.name] = {
        ...e,
      };
    });
    dispatch(updateEchannel(mapEchannel));

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

    dispatch({ type: types.SET_CURRENT_EDITED_ID, payload: id });
    dispatch({ type: types.OPEN_EDIT_MODAL });
  };
export const closeEditModal = () => ({ type: types.CLOSE_EDIT_MODAL });

export const removeFile = (index, url) => (dispatch, getState, api) => {
  const rows = getRows(getState());
  rows[index].attachments = rows[index].attachments.filter(
    (a) => a.split("@")[0] !== url,
  );
  dispatch(updateRowBranch([...rows]));
};

export const uploadFile =
  (index, options) => async (dispatch, getState, api) => {
    const { error, data } = await api.uploadFilePAT(
      getToken(getState()),
      options,
    );
    if (!error) {
      const newFiles = data.url;
      const rows = getRows(getState());
      rows[index].attachments = [...newFiles, ...rows[index].attachments];
      dispatch(updateRowBranch([...rows]));
    }
  };

export const reset = (pat_id) => async (dispatch, getState, api) => {
  const { error } = await api.resetAddendum(
    getToken(getState()),
    "jadwal_audit",
    pat_id,
  );
  return !error;
};
