export const validateAuditor = (rule, value) => {
  const error = !value || !value.pn || !value.nama || !value.jabatan;
  if (error) {
    return Promise.reject(new Error("Please select from the provided options"));
  } else {
    return Promise.resolve();
  }
};

export const validateMA = (rule, value, kta, atas) => {
  if (!value) return Promise.reject("Please select from the provided options");
  const message = "Anggota sudah ada";
  if (typeof kta === "object") {
    if (kta.pn === value.pn) {
      return Promise.reject(message);
    }
  }
  const exists = atas.some((ata) => {
    if (typeof ata.nama === "object") {
      return ata.nama.pn === value.pn;
    }
    return false;
  });
  if (exists) return Promise.reject(message);
  return validateAuditor(rule, value);
};

export const validateKTA = (rule, value, ma, atas) => {
  if (!value) return Promise.reject("Please select from the provided options");
  const message = "Anggota sudah ada";
  if (typeof ma === "object") {
    if (ma.pn === value.pn) {
      return Promise.reject(message);
    }
  }
  const exists = atas.some((ata) => {
    if (typeof ata.nama === "object") {
      return ata.nama.pn === value.pn;
    }
    return false;
  });
  if (exists) return Promise.reject(message);
  return validateAuditor(rule, value);
};

export const validateATA = (rule, value, ma, kta, atas, atasName) => {
  if (!value) return Promise.reject("Please select from the provided options");
  const message = "Anggota sudah ada";
  if (typeof ma === "object") {
    if (ma.pn === value.pn) {
      return Promise.reject(message);
    }
  }
  if (typeof kta === "object") {
    if (kta.pn === value.pn) {
      return Promise.reject(message);
    }
  }
  const exists = atas.some((ata, idx) => {
    if (idx === atasName) return false;
    if (typeof ata.nama === "object") {
      return ata.nama.pn === value.pn;
    }
    return false;
  });
  if (exists) return Promise.reject(message);
  return validateAuditor(rule, value);
};

export const validateOrgehBranch = (rule, value) => {
  const { orgeh, branch } = value;
  if (typeof orgeh === "object" && typeof branch === "object") {
    return Promise.resolve();
  } else {
    return Promise.reject("Please select from the provided options");
  }
};
