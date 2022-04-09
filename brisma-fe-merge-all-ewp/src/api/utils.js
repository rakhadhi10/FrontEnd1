export const splitPNAndName = (value) =>
  value.split("-").map((str) => str.trim());
export const getCode = (value) => {
  if (typeof value !== "string") return value;
  return value.split("-")[0].trim();
};
export const getEselonNumber = (value) => {
  if (typeof value !== "string") return value;
  return Number(value.slice(1));
};
export const bearerPrefix = (token) => `bearer ${token}`;

export const prepareCreateTimAuditBody = (pat_id, form) => {
  const atas = form.atas.map((ata) => {
    let uker_binaans = [];

    if (ata.uker.length !== 0) {
      ata.uker.forEach((uker) => {
        if (uker) {
          if (uker.orgeh && uker.branch) {
            uker_binaans.push({
              orgeh: uker.orgeh && uker.orgeh.child,
              branch: uker.branch && uker.branch.branch,
            });
          }
        }
      });
    }

    return {
      pn: ata.nama.pn,
      nama: ata.nama.nama,
      jabatan: ata.nama.jabatan,
      uker_binaans,
    };
  });

  return {
    pat_id,
    name: form.name,
    pn_ma: form.ma,
    pn_kta: form.kta,
    atas_ukers: atas,
  };
};

export const prepareCreateAddendumTimAuditBody = (pat_id, tim_id, form) => {
  const atas = form.atas.map((ata) => {
    let uker_binaans = [];

    if (ata.uker.length !== 0) {
      ata.uker.forEach((uker) => {
        if (uker) {
          if (uker.orgeh && uker.branch) {
            uker_binaans.push({
              orgeh: uker.orgeh && uker.orgeh.child,
              orgeh_name: uker.orgeh && uker.orgeh.my_name,
              branch: uker.branch && uker.branch.branch,
              branch_name: uker.branch && uker.branch.brdesc,
            });
          }
        }
      });
    }

    return {
      pn: ata.nama.pn,
      nama: ata.nama.nama,
      jabatan: ata.nama.jabatan,
      uker: uker_binaans,
    };
  });

  const result = {
    pat_id,
    tim_audit_id: tim_id,
    name: form.name,
    pn_ma: form.ma,
    pn_kta: form.kta,
    atas,
  };

  return result;
};

export const mapTeamToSebelumForm = (pat_id, tim_id, team) => {
  const atas = team.atas.map((ata) => {
    let uker_binaans = [];

    if (ata.uker.length !== 0) {
      ata.uker.forEach((uker) => {
        if (uker) {
          if (uker.orgeh && uker.branch) {
            uker_binaans.push({
              orgeh: uker.orgeh && uker.orgeh.child,
              orgeh_name: uker.orgeh && uker.orgeh.my_name,
              branch: uker.branch && uker.branch.branch,
              branch_name: uker.branch && uker.branch.brdesc,
            });
          }
        }
      });
    }

    return {
      pn: ata.pn,
      name: ata.name,
      jabatan: ata.jabatan,
      uker: uker_binaans,
    };
  });
  const result = {
    pat_id,
    tim_audit_id: tim_id,
    name: team.name,
    pn_ma: {
      nama: team.nama_ma,
      pn: team.pn_ma,
      jabatan: team.jabatan_ma,
    },
    pn_kta: {
      nama: team.nama_kta,
      pn: team.pn_kta,
      jabatan: team.jabatan_kta,
    },
    atas,
  };

  return result;
};

export const prepareNewAtas = (tim_audit_id, atas) => {
  const mappedAtas = atas.map((ata) => {
    let uker_binaans;

    if (ata.uker.length !== 0) {
      uker_binaans = ata.uker.map((uker) => {
        if (!uker) return undefined;
        return {
          orgeh: getCode(uker.orgeh),
          branch: getCode(uker.branch),
        };
      });
    }

    return {
      pn: ata.name.pn,
      nama: ata.name.nama,
      jabatan: ata.name.jabatan,
      uker_binaans,
    };
  });

  return {
    tim_audit_id,
    atas: mappedAtas,
  };
};

export const prepareUpdateTimAudit = (pat_id, tim_id, form) => {
  const oldAtas = form.atas.filter((ata) => ata.name.id);
  const atas = oldAtas.map((ata) => {
    return {
      id: ata.name.id,
      pn: ata.name.pn,
      nama: ata.name.nama,
      jabatan: ata.name.jabatan,
    };
  });

  let uker = [];
  oldAtas.forEach((ata) => {
    if (ata.uker) {
      ata.uker.forEach((u) => {
        uker.push({
          id: u.id,
          orgeh: typeof u.orgeh === "string" ? getCode(u.orgeh) : u.orgeh,
          branch: typeof u.branch === "string" ? getCode(u.branch) : u.branch,
        });
      });
    }
  });

  return {
    pat_id,
    tim_id,
    name: form.name,
    pn_ma: {
      ...form.ma,
    },
    pn_kta: {
      ...form.kta,
    },
    ata: atas,
    uker,
  };
};
