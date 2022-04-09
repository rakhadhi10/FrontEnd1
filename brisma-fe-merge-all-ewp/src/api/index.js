import axios from "axios";
import { bearerPrefix } from "./utils";

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;
const PAT_URL = process.env.REACT_APP_PAT_URL;
const REF_URL = process.env.REACT_APP_REF2_URL;
const REF2_URL = process.env.REACT_APP_REF2_URL;
const CDN_URL = process.env.REACT_APP_CDN_URL;
const RPM_URL = process.env.REACT_APP_RPM_URL;
const MAPA_URL = process.env.REACT_APP_MAPA_URL_AFIF;
const MAPA2_URL = process.env.REACT_APP_MAPA_URL_ALIF;
const EWP_URL = process.env.REACT_APP_EWP_URL;
const KKPA_URL = process.env.REACT_APP_KKPA_URL;
const KKPT_URL = process.env.REACT_APP_KKPT_URL;
const REF_KKPT = process.env.REACT_APP_REF_KKPT_URL;

class Api {
  constructor() {
    this.axiosInstance = axios.create({
      timeout: 20000,
    });
  }

  async login(pn, password) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${LOGIN_URL}/login`,
        {
          pn,
          password,
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getUserProfile(token) {
    try {
      const { status, data } = await this.axiosInstance.get(`${LOGIN_URL}`, {
        headers: { Authorization: bearerPrefix(token) },
      });
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: "Get user profile failed. Please try again",
      };
    }
  }

  async getAllPATForReference(token, page, filters = {}) {
    const queries = new URLSearchParams();
    queries.set("page", page);
    Object.keys(filters).forEach((key) => {
      queries.set(key, filters[key] ? filters[key] : "");
    });
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/admins/pat?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No PAT found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async createPAT(token, tahun) {
    try {
      await this.axiosInstance.post(
        `${PAT_URL}/admins`,
        { tahun },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getAllPAT(token, page, filters = {}) {
    const queries = new URLSearchParams();
    queries.set("page", page);
    Object.keys(filters).forEach((key) => {
      queries.set(key, filters[key] ? filters[key] : "");
    });
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/auditors?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No PAT found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getPATStatus(token, pat_id) {
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/auditors/id?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getAddendumStatus(token, pat_id) {
    // localhost:3000/adendum/?pat_id=20
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/adendum?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response && error.response.status === 404)
        return { data: {}, error: null };
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getPATMakers(token, pat_id) {
    // localhost:3000/admins/pic?pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/admins/pic?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async updatePATMakers(token, pat_id, form) {
    // localhost:3000/admins/pic?pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${PAT_URL}/admins/pic?${queries.toString()}`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getLatarBelakang(token, pat_id) {
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/ltb?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postLatarBelakang(token, pat_id, latar_belakang) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${PAT_URL}/ltb`,
        { pat_id, latar_belakang },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getSumberInformasi(token, pat_id) {
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/si?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postSumberInformasi(token, pat_id, sumber_informasi) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${PAT_URL}/si`,
        { pat_id, sumber_informasi },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getTargetAudit(token, pat_id) {
    // localhost:3000/target/?pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/target?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getAllTimAudit(token, pat_id, page, filters = {}) {
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    queries.set("page", page);
    Object.keys(filters).forEach((key) => {
      queries.set(key, filters[key] ? filters[key] : "");
    });
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/tim/all?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No team found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getTimAuditById(token, pat_id, tim_id) {
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    queries.set("id", tim_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/tim?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { data: data.data.tim_audit[0], error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No team found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async createTimAudit(token, form) {
    try {
      await this.axiosInstance.post(
        `${PAT_URL}/tim`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async updateTimAudit(token, form) {
    try {
      await this.axiosInstance.patch(
        `${PAT_URL}/tim`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async deleteTimAudit(token, id) {
    const queries = new URLSearchParams();
    queries.set("id", id);
    try {
      await this.axiosInstance.delete(`${PAT_URL}/tim?${queries.toString()}`, {
        headers: {
          Authorization: bearerPrefix(token),
        },
      });
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async createAtas(token, tim_audit_id, form) {
    // 139.162.18.33:3000/tim/atas
    try {
      await this.axiosInstance.post(
        `${PAT_URL}/tim/atas`,
        {
          tim_audit_id,
          ...form,
        },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async deleteAtas(token, tim_audit_id, ids) {
    try {
      await this.axiosInstance.delete(`${PAT_URL}/tim/atas`, {
        headers: {
          Authorization: bearerPrefix(token),
        },
        data: {
          tim_audit_id,
          atas: ids,
        },
      });
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async createUker(token, ata_id, tim_audit_id, ukers) {
    try {
      await this.axiosInstance.post(
        `${PAT_URL}/tim/ukers`,
        {
          ata_id,
          tim_audit_id,
          ukers,
        },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getAllJadwalAudit(token, pat_id, page, filters = {}) {
    // localhost:3000/jadwal/all?pat_id=1&page=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    queries.set("page", page);
    Object.keys(filters).forEach((key) => {
      queries.set(key, filters[key] ? filters[key] : "");
    });
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/jadwal/all?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200)
        return { data: data.data, page: data.detailPage, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Jadwal audit is not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getJadwalAuditDetail(token, pat_id, id) {
    // localhost:3000/jadwal/details?id=1&pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    queries.set("id", id);
    try {
      const { data } = await this.axiosInstance.get(
        `${PAT_URL}/jadwal/details?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Jadwal audit is not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async createJadwalAudit(token, form) {
    try {
      await this.axiosInstance.post(
        `${PAT_URL}/jadwal`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async updateJadwalAudit(token, form) {
    // localhost:3000/jadwal
    try {
      await this.axiosInstance.patch(
        `${PAT_URL}/jadwal`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async deleteJadwalAudit(token, pat_id, jadwal_audit_id) {
    // localhost:3000/jadwal/?id=8&pat_id=20
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    queries.set("id", jadwal_audit_id);
    try {
      await this.axiosInstance.delete(
        `${PAT_URL}/jadwal?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getAllSbp(token, pat_id, page, filters = {}) {
    // 139.162.18.33:3000/sbp/all?pat_id=1&page=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    queries.set("page", page);
    Object.keys(filters).forEach((key) => {
      queries.set(key, filters[key] ? filters[key] : "");
    });
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/sbp/all?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200)
        return {
          error: null,
          data: data.data.jadwal_sbp,
          page: data.detailPage,
        };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No SBP found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getDetailSbp(token, pat_id, sbp_id) {
    // localhost:3000/sbp/?id=2&pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    queries.set("id", sbp_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/sbp?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200)
        return {
          error: null,
          data: data.data,
        };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No SBP found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async createJadwalSbp(token, form) {
    try {
      await this.axiosInstance.post(
        `${PAT_URL}/sbp`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async deleteJadwalSbp(token, id) {
    try {
      await this.axiosInstance.delete(`${PAT_URL}/sbp?id=${id}`, {
        headers: {
          Authorization: bearerPrefix(token),
        },
      });
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async updateJadwalSbp(token, form) {
    try {
      await this.axiosInstance.patch(
        `${PAT_URL}/sbp`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getAllKegiatan(token, pat_id, page, filters = {}) {
    // 139.162.18.33:3000/kegiatan/all?pat_id=1&page=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    queries.set("page", page);
    Object.keys(filters).forEach((key) => {
      queries.set(key, filters[key] ? filters[key] : "");
    });
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/kegiatan/all?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) {
        const mappedData = {
          jadwal_sbp: data.data.anggaranSBP && data.data.anggaranSBP.jadwal_sbp,
          kegiatan_lain:
            data.data.anggaranKegiatan &&
            data.data.anggaranKegiatan.kegiatan_lain,
          jadwal_audit:
            data.data.anggaranAudit && data.data.anggaranAudit.jadwal_audit,
        };
        return {
          error: null,
          data: mappedData,
          page: data.detailPage,
        };
      }
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No Kegiatan found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getDetailKegiatan(token, pat_id, kegiatan_id) {
    // localhost:3000/kegiatan?pat_id=1&id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    queries.set("id", kegiatan_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/kegiatan?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200)
        return {
          error: null,
          data: data.data,
        };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No SBP found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async createKegiatanLain(token, form) {
    try {
      await this.axiosInstance.post(
        `${PAT_URL}/kegiatan`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async deleteKegiatanLain(token, pat_id, kegiatan_id) {
    try {
      await this.axiosInstance.delete(
        `${PAT_URL}/kegiatan?pat_id=${pat_id}&id=${kegiatan_id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async updateKegiatanLain(token, form) {
    try {
      await this.axiosInstance.patch(
        `${PAT_URL}/kegiatan`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getDocumentInfo(token, pat_id) {
    // localhost:3000/mcs?pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/mcs?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200)
        return {
          error: null,
          data: data.data,
        };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Document info was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getDocLatarBelakang(token, pat_id) {
    // localhost:3000/document/lbt/?pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { data } = await this.axiosInstance.get(
        `${PAT_URL}/document/lbt?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return {
        error: null,
        data: data.data,
        comments: data.comments,
      };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Latar Belakang was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getDocSumberInformasi(token, pat_id) {
    // localhost:3000/document/si/?pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { data } = await this.axiosInstance.get(
        `${PAT_URL}/document/si?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return {
        error: null,
        data: data.data,
        comments: data.comments,
      };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Sumber Informasi was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getDocTargetAudit(token, pat_id) {
    // localhost:3000/document/target/?pat_id=21
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { data } = await this.axiosInstance.get(
        `${PAT_URL}/document/target?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return {
        error: null,
        data: data.data,
        comments: data.comments,
      };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Target audit was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getDocJadwalAudit(token, pat_id) {
    // localhost:3000/document/audit/?pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { data } = await this.axiosInstance.get(
        `${PAT_URL}/document/audit?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return {
        error: null,
        data: data.data,
        comments: data.comments,
      };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Jadwal audit was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getDocJadwalSBP(token, pat_id) {
    // localhost:3000/document/sbp/?pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { data } = await this.axiosInstance.get(
        `${PAT_URL}/document/sbp?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return {
        error: null,
        data: data.data,
        comments: data.comments,
      };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Latar Belakang was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getDocKegiatanLain(token, pat_id) {
    // localhost:3000/document/lain/?pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { data } = await this.axiosInstance.get(
        `${PAT_URL}/document/lain?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return {
        error: null,
        data: data.data,
        comments: data.comments,
      };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Kegiatan Lain was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getDocTimAudit(token, pat_id) {
    // localhost:3000/document/tim/?pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { data } = await this.axiosInstance.get(
        `${PAT_URL}/document/tim?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return {
        error: null,
        data: data.data,
        comments: data.comments,
      };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Tim audit was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getDocAnggaran(token, pat_id) {
    // localhost:3000/document/anggaran/?pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { data } = await this.axiosInstance.get(
        `${PAT_URL}/document/anggaran?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return {
        error: null,
        data: data.data,
        comments: data.comments,
      };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Tim audit was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async createNewComment(token, form) {
    // localhost:3000/comment
    try {
      const { data } = await this.axiosInstance.post(
        `${PAT_URL}/comment`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null, data: data.data };
    } catch (error) {
      return { error: error.message };
    }
  }

  async closeComment(token, parent_id) {
    // localhost:3000/comment?parent=4
    try {
      await this.axiosInstance.patch(
        `${PAT_URL}/comment?parent=${parent_id}`,
        null,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getLogPersetujuan(token, pat_id) {
    // localhost:3000/mcs/log?pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/mcs/log?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200)
        return {
          error: null,
          data: data.data,
        };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Document info was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async createMakerUKA(token, form) {
    // localhost:3000/mcs/uka
    try {
      await this.axiosInstance.post(
        `${PAT_URL}/mcs/uka`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async createMakerPusat(token, form) {
    // localhost:3000/mcs/pusat
    try {
      await this.axiosInstance.post(
        `${PAT_URL}/mcs/pusat`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async reject(token, form) {
    // localhost:3000/mcs/reject
    try {
      await this.axiosInstance.post(
        `${PAT_URL}/mcs/reject`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async approve(token, form) {
    // localhost:3000/mcs/approve
    try {
      await this.axiosInstance.post(
        `${PAT_URL}/mcs/approve`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async searchAuditors(token, keyword) {
    // reference/search/auditor/175
    try {
      const { data } = await this.axiosInstance.get(
        `${REF_URL}/reference/search/auditor/${keyword}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async searchOrgehBranch(token, keyword) {
    // /reference/search/orgeh/5012
    try {
      const { data } = await this.axiosInstance.get(
        `${REF_URL}/reference/search/orgeh/${keyword}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async searchBranch(token, keyword) {
    // /reference/search/branch/surabaya
    try {
      const { data } = await this.axiosInstance.get(
        `${REF_URL}/reference/search/branch/${keyword}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async searchOrgeh(token, keyword) {
    // /reference/search/os/50000602
    try {
      const { data } = await this.axiosInstance.get(
        `${REF_URL}/reference/search/os/${keyword}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async searchSbp(token, keyword, pat_id) {
    const queries = new URLSearchParams();
    queries.set("keyword", keyword);
    queries.set("pat_id", pat_id);
    try {
      const { data } = await this.axiosInstance.get(
        `${PAT_URL}/search/sbp?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async searchBranchChildren(token, branchCode) {
    // /reference/search/branch_child/46
    try {
      const { data } = await this.axiosInstance.get(
        `${REF_URL}/reference/search/branch_child/${branchCode}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getRefTipeAudit(token, uka) {
    // {{base_url}}/reference/mtd_stc_audit_type
    try {
      const { data } = await this.axiosInstance.get(
        `${REF_URL}/reference/mtd_stc_audit_type?uka=${uka}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getRefTemaAudit(token) {
    // {{base_url}}/reference/stc_tema_audit
    try {
      const { data } = await this.axiosInstance.get(
        `${REF_URL}/reference/stc_tema_audit`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getRefTipeObjek(token) {
    // {{base_url}}/reference/stc_aiti_tipe_objek
    try {
      const { data } = await this.axiosInstance.get(
        `${REF_URL}/reference/stc_aiti_tipe_objek`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getRefKategoriAnggaran(token) {
    // localhost:3000/ref/anggaran
    try {
      const { data } = await this.axiosInstance.get(`${PAT_URL}/ref/anggaran`, {
        headers: {
          Authorization: bearerPrefix(token),
        },
      });
      return { data: data.data, error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getRefTeams(token, pat_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/tim/pat?pat_id=${pat_id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No team found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getRefTeamsAddendum(token, pat_id) {
    // localhost:3000/adendum/search_tim?pat_id=21
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/adendum/search_tim?pat_id=${pat_id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No team found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getRefEchannel(token) {
    // localhost:8000/reference/echannel_type
    try {
      const { data } = await this.axiosInstance.get(
        `${REF_URL}/reference/echannel_type`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No echannels found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async createAddendum(token, pat_id, maker) {
    // localhost:3000/adendum/
    try {
      await this.axiosInstance.post(
        `${PAT_URL}/adendum`,
        { pat_id, by: maker },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async updateAddendum(token, form) {
    // localhost:3000/adendum/data
    try {
      const { data } = await this.axiosInstance.post(
        `${PAT_URL}/adendum/data`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { ...data, error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async deleteAddendum(token, form) {
    // localhost:3000/adendum/data
    try {
      const { data } = await this.axiosInstance.delete(`${PAT_URL}/adendum`, {
        headers: {
          Authorization: bearerPrefix(token),
        },
        data: { ...form },
      });
      return { ...data, error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getLatarBelakangAddendum(token, pat_id) {
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/adendum/lbt?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getSumberInformasiAddendum(token, pat_id) {
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/adendum/si?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getAllTimAuditAddendum(token, pat_id, page, filters = {}) {
    // localhost:3000/adendum/tim?pat_id=1&page=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    queries.set("page", page);
    Object.keys(filters).forEach((key) => {
      queries.set(key, filters[key] ? filters[key] : "");
    });
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/adendum/tim?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No team found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getTimAuditByIdAddendum(token, pat_id, tim_id) {
    // localhost:3000/adendum/tim_details?tim_audit_id=1&pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    queries.set("tim_audit_id", tim_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/adendum/tim_details?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { data: data.data.tim_audit[0], error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No team found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getAllSbpAddendum(token, pat_id, page, filters = {}) {
    // localhost:3000/adendum/sbp?pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    queries.set("page", page);
    Object.keys(filters).forEach((key) => {
      queries.set(key, filters[key] ? filters[key] : "");
    });
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/adendum/sbp?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200)
        return { data: data.data, page: data.detailPage, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Jadwal consulting was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getJadwalSbpByIdAddendum(token, pat_id, jadwal_sbp_id) {
    // localhost:3000/adendum/sbp_details?jadwal_sbp_id=1&pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    queries.set("jadwal_sbp_id", jadwal_sbp_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/adendum/sbp_details?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { data: data.data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Jadwal consulting was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getAllKegiatanLainAddendum(token, pat_id, page, filters = {}) {
    // localhost:3000/adendum/lain?pat_id=1&page=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    queries.set("page", page);
    Object.keys(filters).forEach((key) => {
      queries.set(key, filters[key] ? filters[key] : "");
    });
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/adendum/lain?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200)
        return { data: data.data, page: data.detailPage, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Kegiatan lain was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getKegiatanLainByIdAddendum(token, pat_id, kegiatan_lain_id) {
    // localhost:3000/adendum/lain_details?pat_id=1&kegiatan_lain_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    queries.set("kegiatan_lain_id", kegiatan_lain_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/adendum/lain_details?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { data: data.data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Kegiatan lain was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getAllJadwalAuditAddendum(token, pat_id, page, filters = {}) {
    // localhost:3000/adendum/audit?pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    queries.set("page", page);
    Object.keys(filters).forEach((key) => {
      queries.set(key, filters[key] ? filters[key] : "");
    });
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/adendum/audit?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200)
        return { data: data.data, page: data.detailPage, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Jadwal audit was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getJadwalAuditByIdAddendum(token, pat_id, jadwal_audit_id) {
    // localhost:3000/adendum/audit_details/?pat_id=1&jadwal_audit_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    queries.set("jadwal_audit_id", jadwal_audit_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/adendum/audit_details?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { data: data.data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Jadwal audit was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getTargetAuditAddendum(token, pat_id) {
    // localhost:3000/adendum/target?pat_id=20
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/adendum/target?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200)
        return { data: data.data, page: data.detailPage, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Jadwal audit was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getDocumentInfoAddendum(token, pat_id) {
    // localhost:3000/adendum/mcs?pat_id=1
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/adendum/mcs?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200)
        return {
          error: null,
          data: data.data,
        };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Document info was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getLogPersetujuanAddendum(token, pat_id) {
    // localhost:3000/adendum/log?pat_id=20
    const queries = new URLSearchParams();
    queries.set("pat_id", pat_id);
    try {
      const { status, data } = await this.axiosInstance.get(
        `${PAT_URL}/adendum/log?${queries.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200)
        return {
          error: null,
          data: data.data,
        };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Document info was not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async createMakerUKAAddendum(token, form) {
    // localhost:3000/adendum/uka
    try {
      await this.axiosInstance.post(
        `${PAT_URL}/adendum/uka`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async createMakerPusatAddendum(token, form) {
    // localhost:3000/adendum/pusat
    try {
      await this.axiosInstance.post(
        `${PAT_URL}/adendum/pusat`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async rejectAddendum(token, form) {
    // localhost:3000/adendum/reject
    try {
      await this.axiosInstance.post(
        `${PAT_URL}/adendum/reject`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async approveAddendum(token, form) {
    // localhost:3000/adendum/approve
    try {
      await this.axiosInstance.post(
        `${PAT_URL}/adendum/approve`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async createNewCommentAddendum(token, form) {
    // localhost:3000/adendum/comment
    try {
      const { data } = await this.axiosInstance.post(
        `${PAT_URL}/adendum/comment`,
        { ...form },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null, data: data.data };
    } catch (error) {
      return { error: error.message };
    }
  }

  async closeCommentAddendum(token, parent_id) {
    // localhost:3000/adendum/comment?parent=1
    try {
      await this.axiosInstance.patch(
        `${PAT_URL}/adendum/comment?parent=${parent_id}`,
        null,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getDocumentAddendum(token, pat_id) {
    // localhost:3000/adendum/document?pat_id=20
    try {
      const { data } = await this.axiosInstance.get(
        `${PAT_URL}/adendum/document?pat_id=${pat_id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null, ...data };
    } catch (error) {
      return { error: error.message };
    }
  }

  async getDocumentHistory(token, pat_id) {
    // localhost:3000/document?pat_id=1
    try {
      const { data } = await this.axiosInstance.get(
        `${PAT_URL}/document?pat_id=${pat_id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null, ...data };
    } catch (error) {
      return { error: error.message };
    }
  }

  async searchSigner(token, pat_id, pn, isAddendum, addendum_no) {
    // localhost:3000/signer?pat_id=1&pn=120830&isAdendum=true&adendum_no=1
    const params = new URLSearchParams();
    params.append("pat_id", pat_id);
    params.append("pn", pn);
    params.append("isAdendum", isAddendum);
    params.append("adendum_no", addendum_no);

    try {
      const { data } = await this.axiosInstance.get(
        `${PAT_URL}/signer?${params.toString()}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null, ...data };
    } catch (error) {
      return { error: error.message };
    }
  }

  async uploadFilePAT(token, options) {
    const { file, onSuccess, onError, onProgress } = options;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("modul", "PAT");

    try {
      const { data } = await axios.post(CDN_URL, fd, {
        onUploadProgress: (e) => {
          onProgress({ percent: (e.loaded / e.total) * 100 });
        },
      });
      onSuccess(data);
      return { error: null, data: data };
    } catch (err) {
      let error = "Error when uploading file";
      if (err.response) {
        error = err.response.data.message;
      } else {
        error = err.message;
      }
      onError(error);
      return { error };
    }
  }

  async resetAddendum(token, part, pat_id) {
    // localhost:3000/adendum/reset
    try {
      await axios.patch(
        `${PAT_URL}/adendum/reset`,
        { part, pat_id },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { error: null };
    } catch (err) {
      let error = "Error reset addendum";
      if (err.response) {
        error = err.response.data.message;
      } else {
        error = err.message;
      }
      return { error };
    }
  }

  async getAllRPMProjects(token) {
    // localhost:2000/projects/
    try {
      const { data } = await this.axiosInstance.get(`${RPM_URL}/projects`, {
        headers: { Authorization: bearerPrefix(token) },
      });
      return { data: data.data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getProjectDetails(token, project_rpm_id) {
    // localhost:2000/projects/details?project_rpm_id=1
    try {
      const { data } = await this.axiosInstance.get(
        `${RPM_URL}/projects/details?project_rpm_id=${project_rpm_id}`,
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getMCS(token, project_id) {
    // localhost:2000/mcs?project_rpm_id=1
    try {
      const { data } = await this.axiosInstance.get(
        `${RPM_URL}/mcs?project_rpm_id=${project_id}`,
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async updateMCS(token, project_rpm_id, mcs) {
    // localhost:2000/mcs
    try {
      await this.axiosInstance.post(
        `${RPM_URL}/mcs`,
        {
          project_rpm_id,
          ...mcs,
        },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getAllKKPT(token, project_rpm_id) {
    // localhost:2000/projects/kkpt?project_rpm_id=1
    try {
      const { data } = await this.axiosInstance.get(
        `${RPM_URL}/projects/kkpt?project_rpm_id=${project_rpm_id}`,
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getKKPTDetails(token, kkpt_id, project_rpm_id) {
    // localhost:2000/projects/rec?kkpt_id=1&project_rpm_id=1
    try {
      const { data } = await this.axiosInstance.get(
        `${RPM_URL}/projects/rec?kkpt_id=${kkpt_id}&project_rpm_id=${project_rpm_id}`,
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getSuratDetails(token, kkpt_id, project_rpm_id) {
    // localhost:2000/projects/surat?kkpt_id=1&project_rpm_id=1
    try {
      const { data } = await this.axiosInstance.get(
        `${RPM_URL}/projects/surat?kkpt_id=${kkpt_id}&project_rpm_id=${project_rpm_id}`,
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return {
        data: {
          ...data.data,
          logMaker: data.logMaker,
          logChecker: data.logChecker,
          logSigner: data.logSigner,
        },
        error: null,
      };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async approveActionPlanMaker(
    token,
    project_rpm_id,
    kkpt_id,
    rekomendasi_kkpt,
    action_plan_kkpt,
    lampiran,
    deskripsi
  ) {
    // localhost:2000/mcs/approve
    try {
      await this.axiosInstance.post(
        `${RPM_URL}/mcs/approve`,
        {
          project_rpm_id,
          kkpt_id,
          rekomendasi_kkpt,
          action_plan_kkpt,
          lampiran,
          deskripsi,
        },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async approveActionPlanChecker(
    token,
    project_rpm_id,
    kkpt_id,
    rekomendasi_kkpt,
    action_plan_kkpt,
    isApproved,
    alasan
  ) {
    // localhost:2000/mcs/approve
    try {
      await this.axiosInstance.post(
        `${RPM_URL}/mcs/approve`,
        {
          project_rpm_id,
          kkpt_id,
          rekomendasi_kkpt,
          action_plan_kkpt,
          isApproved,
          note: alasan,
        },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async rejectActionPlanChecker(
    token,
    project_rpm_id,
    kkpt_id,
    rekomendasi_kkpt,
    action_plan_kkpt,
    isApproved,
    alasan
  ) {
    // localhost:2000/mcs/reject
    try {
      await this.axiosInstance.post(
        `${RPM_URL}/mcs/reject`,
        {
          project_rpm_id,
          kkpt_id,
          rekomendasi_kkpt,
          action_plan_kkpt,
          isApproved,
          note: alasan,
        },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async approveActionPlanSigner(
    token,
    project_rpm_id,
    kkpt_id,
    rekomendasi_kkpt,
    action_plan_kkpt,
    isApproved,
    alasan
  ) {
    // localhost:2000/mcs/approve
    try {
      await this.axiosInstance.post(
        `${RPM_URL}/mcs/approve`,
        {
          project_rpm_id,
          kkpt_id,
          rekomendasi_kkpt,
          action_plan_kkpt,
          isApproved,
          note: alasan,
        },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async rejectActionPlanSigner(
    token,
    project_rpm_id,
    kkpt_id,
    rekomendasi_kkpt,
    action_plan_kkpt,
    isApproved,
    alasan
  ) {
    // localhost:2000/mcs/reject
    try {
      await this.axiosInstance.post(
        `${RPM_URL}/mcs/reject`,
        {
          project_rpm_id,
          kkpt_id,
          rekomendasi_kkpt,
          action_plan_kkpt,
          isApproved,
          note: alasan,
        },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async approveSuratMaker(token, project_rpm_id, kkpt_id, text) {
    // localhost:2000/mcs/approve_surat
    try {
      await this.axiosInstance.post(
        `${RPM_URL}/mcs/approve_surat`,
        {
          project_rpm_id,
          kkpt_id,
          text,
        },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async approveSuratChecker(token, project_rpm_id, kkpt_id, note) {
    // localhost:2000/mcs/approve_surat
    try {
      await this.axiosInstance.post(
        `${RPM_URL}/mcs/approve_surat`,
        {
          project_rpm_id,
          kkpt_id,
          note,
        },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async rejectSuratChecker(token, project_rpm_id, kkpt_id, note) {
    // localhost:2000/mcs/reject_surat
    try {
      await this.axiosInstance.post(
        `${RPM_URL}/mcs/reject_surat`,
        {
          project_rpm_id,
          kkpt_id,
          note,
        },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async approveSuratSigner(token, project_rpm_id, kkpt_id, note) {
    // localhost:2000/mcs/approve_surat
    try {
      await this.axiosInstance.post(
        `${RPM_URL}/mcs/approve_surat`,
        {
          project_rpm_id,
          kkpt_id,
          note,
        },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async rejectSuratSigner(token, project_rpm_id, kkpt_id, note) {
    // localhost:2000/mcs/reject_surat
    try {
      await this.axiosInstance.post(
        `${RPM_URL}/mcs/reject_surat`,
        {
          project_rpm_id,
          kkpt_id,
          note,
        },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async approveAllAuditee(token, project_rpm_id, kkpt_id, note) {
    // localhost:2000/mcs/approve_all
    try {
      await this.axiosInstance.post(
        `${RPM_URL}/mcs/approve_all`,
        {
          project_rpm_id,
          kkpt_id,
          note,
        },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async approveActionPlanMakerAuditor(
    token,
    project_rpm_id,
    kkpt_id,
    rekomendasi_kkpt,
    action_plan_kkpt,
    hasil_evaluasi
  ) {
    // localhost:2000/mcs/approve
    try {
      await this.axiosInstance.post(
        `${RPM_URL}/mcs/approve`,
        {
          project_rpm_id,
          kkpt_id,
          rekomendasi_kkpt,
          action_plan_kkpt,
          hasil_evaluasi,
        },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getAllAttendance(token, project_rpm_id) {
    // localhost:2000/negosiasi?project_rpm_id=1
    try {
      const { data } = await this.axiosInstance.get(
        `${RPM_URL}/negosiasi?project_rpm_id=${project_rpm_id}`,
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async loginAttendance(token, pn, password, project_rpm_id) {
    // localhost:2000/negosiasi/login
    try {
      await this.axiosInstance.post(
        `${RPM_URL}/negosiasi/login`,
        { pn, password, project_rpm_id },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async deleteAttendance(token, project_rpm_id, pn) {
    // localhost:2000/negosiasi
    try {
      await this.axiosInstance.delete(`${RPM_URL}/negosiasi`, {
        headers: { Authorization: bearerPrefix(token) },
        data: {
          project_rpm_id,
          pn,
        },
      });
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async closeAttendance(token, project_rpm_id) {
    // localhost:2000/negosiasi/close
    try {
      await this.axiosInstance.patch(
        `${RPM_URL}/negosiasi/close`,
        { project_rpm_id },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getTimAudit(token, project_rpm_id) {
    // localhost:2000/search?project_rpm_id=1
    try {
      const { data } = await this.axiosInstance.get(
        `${RPM_URL}/search?project_rpm_id=${project_rpm_id}`,
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async createNegosiasi(token, project_rpm_id) {
    // localhost:3000/negosiasi
    try {
      const { data } = await this.axiosInstance.post(
        `${RPM_URL}/negosiasi`,
        { project_rpm_id },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null, ...data };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async addNegosiasi(token, project_rpm_id, kkpt_id, rekomendasi) {
    // localhost:2000/negosiasi/meet
    try {
      await this.axiosInstance.post(
        `${RPM_URL}/negosiasi/meet`,
        { project_rpm_id, kkpt_id, rekomendasi },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getKKPTNego(token, project_rpm_id) {
    // localhost:2000/negosiasi/kkpt?project_rpm_id=1
    try {
      const { data } = await this.axiosInstance.get(
        `${RPM_URL}/negosiasi/kkpt?project_rpm_id=${project_rpm_id}`,
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return {
        data: {
          ...data,
        },
        error: null,
      };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getActionPlanNego(token, project_rpm_id, kkpt_id) {
    // localhost:2000/negosiasi/meet?project_rpm_id=1&kkpt_id=1
    try {
      const { data } = await this.axiosInstance.get(
        `${RPM_URL}/negosiasi/meet?project_rpm_id=${project_rpm_id}&kkpt_id=${kkpt_id}`,
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return {
        data: {
          ...data,
        },
        error: null,
      };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async approveRejectNego(token, project_rpm_id, kkpt_id, isApproved, note) {
    // localhost:2000/negosiasi/meet
    try {
      await this.axiosInstance.patch(
        `${RPM_URL}/negosiasi/meet`,
        { project_rpm_id, kkpt_id, approve: isApproved, note },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getNotulen(token, project_rpm_id) {
    // localhost:2000/negosiasi/notulen?project_rpm_id=1
    try {
      const { data } = await this.axiosInstance.get(
        `${RPM_URL}/negosiasi/notulen?project_rpm_id=${project_rpm_id}`,
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return {
        data: {
          ...data,
        },
        error: null,
      };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async updateNotulen(token, form) {
    // localhost:2000/negosiasi/notulen
    try {
      await this.axiosInstance.patch(
        `${RPM_URL}/negosiasi/notulen`,
        { ...form },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getBeritaAcara(token, project_rpm_id) {
    // localhost:2000/negosiasi/ba?project_rpm_id=1
    try {
      const { data } = await this.axiosInstance.get(
        `${RPM_URL}/negosiasi/ba?project_rpm_id=${project_rpm_id}`,
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return {
        data: {
          ...data,
        },
        error: null,
      };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async updateBeritaAcara(token, form) {
    // localhost:2000/negosiasi/ba
    try {
      await this.axiosInstance.patch(
        `${RPM_URL}/negosiasi/ba`,
        { ...form },
        {
          headers: { Authorization: bearerPrefix(token) },
        }
      );
      return { error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async uploadFileRPM(token, options) {
    const { file, onSuccess, onError, onProgress } = options;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("modul", "RPM");

    try {
      const { data } = await axios.post(CDN_URL, fd, {
        onUploadProgress: (e) => {
          onProgress({ percent: (e.loaded / e.total) * 100 });
        },
      });
      onSuccess(data);
      return { error: null, data: data };
    } catch (err) {
      let error = "Error when uploading file";
      if (err.response) {
        error = err.response.data.message;
      } else {
        error = err.message;
      }
      onError(error);
      return { error };
    }
  }

  async getAllDocuments(token, project_rpm_id) {
    // localhost:2000/document/?project_rpm_id=1
    try {
      const { data } = await this.axiosInstance.get(
        `${RPM_URL}/document/?project_rpm_id=${project_rpm_id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      return { data: data.data, error: null };
    } catch (error) {
      return { error: error.message };
    }
  }

  //EWP
  async getEwp(token, filters = {}) {
    try {
      const { status, data } = await this.axiosInstance.get(`${MAPA_URL}/ewp`, {
        headers: {
          Authorization: bearerPrefix(token),
        },
        params: filters,
      });
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No Ewp found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postEwp(token, dataEwp) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${MAPA_URL}/ewp`,
        dataEwp,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      console.log(status);
      if (status === 201 || status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async patchDisableEwp(token, dataEwp) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${MAPA_URL}/ewp`,
        dataEwp,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      console.log(status);
      if (status === 201) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getApprovalEwp(token) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/list_need_approved`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postAuditInfoEwp(token, mapa_id, dataPost) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${MAPA_URL}/ewp/${mapa_id}/audit_info`,
        dataPost,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );

      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getAuditInfoEwp(token, mapa_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/${mapa_id}/audit_info`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );

      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No Audit found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getApprovalDetailEwp(token, mapa_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/detail_project_need_approved/${mapa_id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No Ewp found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postApprovalEwp(token, dataForm) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${MAPA_URL}/ewp/detail_project_need_approved`,
        dataForm,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 201) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No Ewp found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getPatEwp(token, params) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/pat`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
          params: params,
        }
      );
      if (status === 200) {
        return { ...data, error: null };
      }
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getSingleEwp(token, id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/${id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "No Ewp found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  //mapa
  async getDashboardMapa(token, mapa_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/status`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );

      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getLatarBelakangMapa(token, mapa_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/latar_belakang`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postLatarBelakangMapa(token, mapa_id, latar_belakang) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${MAPA_URL}/ewp/mapa/latar_belakang`,
        { id: mapa_id, latar_belakang: latar_belakang },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getTujuanMapa(token, mapa_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/tujuan`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postTujuanMapa(token, mapa_id, tujuan) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${MAPA_URL}/ewp/mapa/tujuan`,
        { id: mapa_id, tujuan: tujuan },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getSumberInformasiMapa(token, mapa_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/sumber_informasi`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postSumberInformasiMapa(token, mapa_id, sumber_informasi) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${MAPA_URL}/ewp/mapa/sumber_informasi`,
        { id: mapa_id, sumber_informasi: sumber_informasi },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getTimAuditMapa(token, mapa_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/tim_audit`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postTimAuditMapa(token, mapa_id, values) {
    try {
      console.log(values);
      const { status, data } = await this.axiosInstance.post(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/tim_audit`,
        values,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getUkerAssesmentMapa(token, mapa_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/ua`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getReffTypeUko(token) {
    try {
      const { data, status } = await this.axiosInstance.get(
        `${REF2_URL}/reference/uko_type/all`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postUkerAssesmentMapa(token, mapa_id, values) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/ua`,
        values,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getApaPicMapa(token, mapa_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/apa/pic`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postApaPicMapa(token, mapa_id, aktivitas) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/apa/pic`,
        aktivitas,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getAktivitas(token, mapa_id, uker_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/aktivitas/${uker_id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 201 || status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async delSubAktivitas(token, aktivitas_id) {
    try {
      const { status, data } = await this.axiosInstance.delete(
        `${MAPA_URL}/ewp/mapa/subaktivitas/${aktivitas_id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) {
        return { ...data, error: null };
      }
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getSubAktivitas(token, mapa_id, aktivitas_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/subaktivitas/${aktivitas_id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 201) {
        return { ...data, error: null };
      } else if (status === 200) {
        return { data: [], error: null };
      }
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getAnalyzing(token, mapa_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/apa/status`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postAnalisaAktivitas(token, mapa_id, body) {
    try {
      const { data, status } = await this.axiosInstance.post(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/apa/uraian_aktivitas`,
        body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postApprovalAnalisa(token, mapa_id, body) {
    try {
      const { data, status } = await this.axiosInstance.post(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/send_approval`,
        body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getCommentApprovalAnalisa(token, mapa_id, params) {
    try {
      const { data, status } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/aktivitas_komen`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
          params: params,
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getMapaMCR(token, mapa_id, subaktivitas_kode) {
    try {
      const { data, status } = await this.axiosInstance.get(
        `${MAPA2_URL}/mapa/${mapa_id}/apa/mcr/${subaktivitas_kode}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postUpdateMapaMCR(token, mapa_id, body) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${MAPA2_URL}/mapa/${mapa_id}/apa/mcr`,
        body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getReffAktivitasSubAktivitas(token, filter) {
    try {
      const { data, status } = await this.axiosInstance.get(
        `${REF2_URL}/reference/mtd_aktivitas/get?kode=${filter}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postMcrProgramAudit(token, mapa_id, body) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${MAPA2_URL}/mapa/${mapa_id}/apa/mcr/program-audit`,
        body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postMcrKriteriaAudit(token, mapa_id, body) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${MAPA2_URL}/mapa/${mapa_id}/apa/mcr/kriteria`,
        body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getMapaAnalizingSummary(token, mapa_id, params) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/summary`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
          params: params ? params : {},
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getTeknikSample(token) {
    try {
      const { data, status } = await this.axiosInstance.get(
        `${REF2_URL}/reference/stc_teknik_sampling`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getMapaSample(token, mapa_id, mcr_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA2_URL}/mapa/${mapa_id}/apa/mcr/info/${mcr_id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postMapaSample(token, mapa_id, body) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${MAPA2_URL}/mapa/${mapa_id}/apa/mcr/sample-info`,
        body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getMapaJadwalAudit(token, mapa_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA2_URL}/mapa/${mapa_id}/jadwal-audit`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postMapaJadwalAudit(token, mapa_id, body) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${MAPA2_URL}/mapa/${mapa_id}/jadwal-audit`,
        body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getMapaAnggaran(token, mapa_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA2_URL}/mapa/${mapa_id}/anggaran`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getMapaAnggaranInit(token, mapa_id) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${MAPA2_URL}/mapa/${mapa_id}/anggaran/init`,
        {},
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postMapaAnggaran(token, mapa_id, body) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${MAPA2_URL}/mapa/${mapa_id}/anggaran`,
        body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getTipeAnggaran(token) {
    try {
      const { data, status } = await this.axiosInstance.get(
        `${REF2_URL}/reference/stc_mapa_tipe_anggaran`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async putMapaAnggaran(token, mapa_id, mapa_anggaran_id, body) {
    try {
      const { status, data } = await this.axiosInstance.put(
        `${MAPA2_URL}/mapa/${mapa_id}/anggaran/${mapa_anggaran_id}`,
        body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async deleteMapaAnggaran(token, mapa_id, mapa_anggaran_id) {
    try {
      const { status, data } = await this.axiosInstance.delete(
        `${MAPA2_URL}/mapa/${mapa_id}/anggaran/${mapa_anggaran_id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getMapaPenugasan(token, mapa_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${EWP_URL}/mapa/${mapa_id}/penugasan/get`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getSummaryMapaPenugasan(token, mapa_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${EWP_URL}/mapa/${mapa_id}/penugasan/summary`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getMapaSamplePenugasan(token, mcr_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${EWP_URL}/mapa/mcr/${mcr_id}/mapa_sample/detail`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async patchSetAuditorPenugasan(token, body) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${EWP_URL}/mapa/penugasan/mapa_sample/set`,
        body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getDokumenMapa(token, mapa_id, params) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/dokumen`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
          params: params,
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postApprovalMapaDoc(token, mapa_id, body) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/mapa_approval`,
        body && body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  //Mapa Sample

  async getMapaSampleCSV(token, mcr_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${EWP_URL}/mapa/mcr/${mcr_id}/mapa_sample/csv/list`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getPoolSampleCSV(token) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${EWP_URL}/mapa/pool-samples/csv`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getContentPoolSampleCSV(token, mcr_id, body) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${EWP_URL}/mapa/mcr/${mcr_id}/pool-samples/csv/bulk_content`,
        body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postPoolMapaSampleCSV(token, mapa_id, mcr_id, file, body) {
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("data", JSON.stringify(body));
      const { status, data } = await this.axiosInstance.post(
        `${EWP_URL}/mapa/${mapa_id}/apa/mcr/${mcr_id}/pool-samples/csv/upload`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async patchUpdateMapaSampleCSV(token, mcr_id, body) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${EWP_URL}/mapa/mcr/${mcr_id}/mapa_sample/csv/update`,
        body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async deleteMapaSampleCSV(token, mcr_id, body) {
    try {
      const { status, data } = await this.axiosInstance.delete(
        `${EWP_URL}/mapa/mcr/${mcr_id}/mapa_sample/csv/delete`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
          data: body,
        }
      );
      if (status === 200) return { ...data, error: null };
      else return { ...data };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.response,
      };
    }
  }

  async deletePoolSampleCSV(token, csv_pool_id) {
    try {
      const { status, data } = await this.axiosInstance.delete(
        `${EWP_URL}/mapa/pool-samples/csv/delete/${csv_pool_id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          data: error.response.data.data,
          error: error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
        data: "failed",
      };
    }
  }

  //mapa comment
  async getKomenMapaDokumen(token, mapa_id, bab) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/komen/${bab}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
        data: "failed",
      };
    }
  }

  async postKomenMapaDokumen(token, mapa_id, body) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/komen`,
        body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 201) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
        data: "failed",
      };
    }
  }

  async patchCloseKomenMapaDokumen(token, mapa_id, parent_id) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${MAPA_URL}/ewp/mapa/${mapa_id}/close`,
        {
          id: parent_id,
        },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
        data: "failed",
      };
    }
  }

  //Mapa Sample File
  async getMapaSampleFile(token, mcr_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${EWP_URL}/mapa/mcr/${mcr_id}/mapa_sample/file/list`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getPoolSampleFile(token, mcr_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${EWP_URL}/mapa/mcr/${mcr_id}/pool-samples/file`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postUploadSampleFile(token, mapa_id, mcr_id, file, desc) {
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("description", desc);
      const { status, data } = await this.axiosInstance.post(
        `${EWP_URL}/mapa/${mapa_id}/apa/mcr/${mcr_id}/pool-samples/file/upload`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async patchUpdateMapaSampleFile(token, body) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${EWP_URL}/mapa/pool-samples/file/update_desc`,
        body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async postSaveMapaSampleFile(token, mcr_id, body) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${EWP_URL}/mapa/mcr/${mcr_id}/mapa_sample/file/save_selected`,
        body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async deleteMapaSampleFile(token, mcr_id, body) {
    try {
      const { status, data } = await this.axiosInstance.delete(
        `${EWP_URL}/mapa/mcr/${mcr_id}/mapa_sample/file/delete`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
          data: body,
        }
      );
      if (status === 200) return { ...data, error: null };
      else return { ...data };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.response,
      };
    }
  }

  async deletePoolSampleFile(token, file_pool_id) {
    try {
      const { status, data } = await this.axiosInstance.delete(
        `${EWP_URL}/mapa/pool-samples/file/delete/${file_pool_id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          data: error.response.data.data,
          error: error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
        data: "failed",
      };
    }
  }

  //mapa sample monber

  async getMapaSampleMonber(token, mcr_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${EWP_URL}/mapa/mcr/${mcr_id}/mapa_sample/mbr/list`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getPoolSampleMonber(token) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${EWP_URL}/mapa/pool-samples/mbr`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getContentPoolSampleMonber(token, mcr_id, pool_monber_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${EWP_URL}/mapa/mcr/${mcr_id}/pool-samples/mbr/content/${pool_monber_id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async patchMapaSampleMonber(token, mcr_id, body) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${EWP_URL}/mapa/mcr/${mcr_id}/mapa_sample/mbr/update`,
        body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async deleteMapaSampleMonber(token, mcr_id, body) {
    try {
      const { status, data } = await this.axiosInstance.delete(
        `${EWP_URL}/mapa/mcr/${mcr_id}/mapa_sample/mbr/delete`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
          data: body,
        }
      );
      if (status === 200) return { ...data, error: null };
      else return { ...data };
    } catch (error) {
      return {
        status: "failed",
        error: error.response,
      };
    }
  }

  //Mapa Sample FRD
  async getMapaSampleFRD(token, mcr_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${EWP_URL}/mapa/mcr/${mcr_id}/mapa_sample/frd/list`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getPoolSampleFRD(token) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${EWP_URL}/mapa/pool-samples/frd`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getContentPoolSampleFRD(token, mcr_id, pool_frd_id) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${EWP_URL}/mapa/mcr/${mcr_id}/pool-samples/frd/content/${pool_frd_id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async patchMapaSampleFRD(token, mcr_id, body) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${EWP_URL}/mapa/mcr/${mcr_id}/mapa_sample/frd/update`,
        body,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      if (error.response) {
        return {
          error:
            error.response.status === 404
              ? "Data not found"
              : error.response.data.message,
        };
      }
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async deleteMapaSampleFRD(token, mcr_id, body) {
    try {
      const { status, data } = await this.axiosInstance.delete(
        `${EWP_URL}/mapa/mcr/${mcr_id}/mapa_sample/frd/delete`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
          data: body,
        }
      );
      if (status === 200) return { ...data, error: null };
      else return { ...data };
    } catch (error) {
      return {
        status: "failed",
        error: error.response,
      };
    }
  }

  //kkpa

  async fetchKppaListApi(token, idmapa) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPA_URL}/kkpa/all_list/${idmapa}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async fetchKppaInfoApi(token, idkkpa) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPA_URL}/kkpa/info/${idkkpa}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async fetchDaftarIsiApi(token) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPA_URL}/ref_bab_kkpa`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async storeDataProAuditApi(payload) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${KKPA_URL}/kkpa/program_audit`,
        {
          ...payload,
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async storeDataPengujianKontrolApi(token, payload) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${KKPA_URL}/kkpa/pengujian_control`,
        {
          ...payload,
        },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }
  async storeDataKriteriaApi(token, payload) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${KKPA_URL}/kkpa/kriteria`,
        {
          ...payload,
        },
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async createKkptListByKkpaApi(token, payload) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${KKPT_URL}/kkpt/create/`,
        payload,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }
  async getKkptListByKkpaApi(token, idkkpa) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPT_URL}/kkpt/get-by-kkpa/${idkkpa}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async fetchListControlApi(token, akd) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${REF_KKPT}/reference/mtd_risk_control_matrix/${akd}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async fetchContentApi(token, id_kkpa, id_bab) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPA_URL}/kkpa/${id_kkpa}/bab_docs?bab=${id_bab}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async fetchCommentApi(token, id_kkpa, id_bab) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPA_URL}/kkpa_comment/${id_kkpa}/bab/${id_bab}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getSampleKkpaApi(token, idkkpa) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPA_URL}/kkpa_sample/show/${idkkpa}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async storeCommentApi(token, datacomment) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${KKPA_URL}/kkpa_comment`,
        datacomment,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }
  async closeCommentApi(idchildcomment) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${KKPA_URL}/kkpa_comment/close/${idchildcomment}`
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async updateKesimpulanKkpaApi(token, id_kkpa) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${KKPA_URL}/kkpa/kesimpulan/${id_kkpa}`,
        {},
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }
  async updateApproval(token, id_kkpa) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${KKPA_URL}/kkpa/send_approval/${id_kkpa}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }
  async updateNa(token, datas) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${KKPA_URL}/kkpa/isNA`,
        datas,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getKpptListApi(token, idmapa) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPT_URL}/kkpt/with-aktivitas/${idmapa}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getKpptRefBab(token) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPT_URL}/ref_bab_kkpt`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getDetailOfKkpt(token, idkkpt) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPT_URL}/kkpt/detail/${idkkpt}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async saveInfoKkptApi(token, payload) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${KKPT_URL}/kkpt`,
        payload,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }
  async saveKondisiKkptApi(token, payload) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${KKPT_URL}/kkpt/kondisi`,
        payload,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }
  async saveKelemahanKkptApi(token, payload) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${KKPT_URL}/kkpt/kpi`,
        payload,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }
  async saveKriteriaKkptApi(token, payload) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${KKPT_URL}/kkpt/kriteria`,
        payload,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getSampleKkptApi(token, idkkpt) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPT_URL}/kkpt/samples/${idkkpt}/show`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async savePenyebabKkptApi(token, payload) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${KKPT_URL}/kkpt/penyebab`,
        payload,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getPenyebabKkptApi(token, idkkpt) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPT_URL}/kkpt/penyebab-list/${idkkpt}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async deletePenyebabApi(token, id) {
    try {
      const { status, data } = await this.axiosInstance.delete(
        `${KKPT_URL}/kkpt/penyebab/${id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getControlKkptApi(token, idkkpt) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPT_URL}/kkpt/controls/${idkkpt}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async updateControlKkptApi(token, payload) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${KKPT_URL}/kkpt/controls`,
        payload,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getLikehoodKkptApi(token, idkkpt) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPT_URL}/kkpt/likelihood/${idkkpt}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getKategoriKkptApi(token, idkkpt) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPT_URL}/kkpt/kategori/${idkkpt}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async updateKategoriKkptApi(token, payload) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${KKPT_URL}/kkpt/kategori/adjustment`,
        payload,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getRekomendasiKkptApi(token, idkkpt) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPT_URL}/kkpt/rekomendasi/${idkkpt}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async updateRekomendasiKkptApi(token, payload, kkpt_id) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${KKPT_URL}/kkpt/rekomendasi/${kkpt_id}`,
        payload,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }
  async deleteRekomendasiKkptApi(token, kkpt_id) {
    try {
      const { status, data } = await this.axiosInstance.delete(
        `${KKPT_URL}/kkpt/rekomendasi/${kkpt_id}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async editRekomendasiKkptApi(token, form, kkpt_id) {
    try {
      const { status, data } = await this.axiosInstance.patch(
        `${KKPT_URL}/kkpt/rekomendasi/${kkpt_id}`,
        form,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async updateSampleKkptApi(token, payload) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${KKPT_URL}/kkpt/samples`,
        payload,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getReferencePenyebabListKkptApi(token) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${REF_KKPT}/reference/mtd_penyebab/all`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async updateMergeKkptApi(token, payload) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${KKPT_URL}/kkpt/merge`,
        payload,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getReferenceImpactFinancialpi(token) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${REF_KKPT}/reference/mtd_stc_impact_nonfinancial_type/all`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async updateDampakKkptApi(token, payload) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${KKPT_URL}/kkpt/dampak`,
        payload,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getKkptaDampakApi(token, id_kkpt) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPT_URL}/kkpt/dampak/${id_kkpt}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }
  async getKkptMergeHistoryApi(token, idproject) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPT_URL}/kkpt/merge-history/${idproject}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }
  async approvalKkptApi(token, id_kkpt) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${KKPT_URL}/kkpt/send-approval/${id_kkpt}`,
        {},
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }
  async naKkptApi(token, payload) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${KKPT_URL}/kkpt/isNA`,
        payload,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getKkptCommentApi(token, id_kkpt, id_bab) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPT_URL}/kkpt-comment/${id_kkpt}/bab/${id_bab}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async saveCommentKkptApi(token, payload) {
    try {
      const { status, data } = await this.axiosInstance.post(
        `${KKPT_URL}/kkpt-comment`,
        payload,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getKkptDataApi(token, id_kkpt) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${KKPT_URL}/kkpt/data/${id_kkpt}`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getReferenceRiskTypeKkptDataApi(token) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${REF_KKPT}/reference/mtd_stc_risk_type`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }

  async getReferenceAuditFocusKkptDataApi(token) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${REF_KKPT}/reference/mtd_stc_audit_focus`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }
  async getReferenceProdukKkptDataApi(token) {
    try {
      const { status, data } = await this.axiosInstance.get(
        `${REF_KKPT}/reference/mtd_produk`,
        {
          headers: {
            Authorization: bearerPrefix(token),
          },
        }
      );
      if (status === 200) return { ...data, error: null };
    } catch (error) {
      return {
        status: "failed",
        error: error.message,
      };
    }
  }
}

export default Api;
