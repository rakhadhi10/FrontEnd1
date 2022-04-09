const mockProjectDetails = {
  project: {
    id: 1,
    nama_project: "AIW A",
    num_project: "12345",
    num_evaluasi: 2,
    batas_waktu: "2022-07-19T17:00:00.000Z",
    status_project: "On Auditee",
    auditee_pn: ["12345"],
    pic_auditee: {
      pn: "6767",
      nama: "Abc",
      jabatan: "Auditee",
    },
    makers_auditee: [
      {
        pn: "12345",
        nama: "abc",
        jabatan: "Auditor",
      },
      {
        pn: "12345",
        nama: "abc",
        jabatan: "Auditor",
      },
    ],
    checkers_auditee: [
      {
        pn: "12345",
        nama: "abc",
        jabatan: "Auditor",
      },
      {
        pn: "12345",
        nama: "abc",
        jabatan: "Auditor",
      },
    ],
    signers_auditee: [
      {
        pn: "12345",
        nama: "abc",
        jabatan: "Auditor",
        isSigned: false,
        suratSigned: false,
      },
      {
        pn: "12345",
        nama: "abc",
        jabatan: "Auditor",
        isSigned: false,
        suratSigned: false,
      },
    ],
    makers_auditor: null,
    checkers_auditor: null,
    signers_auditor: null,
  },
  total_rekomendasi: "3",
  total_action_plan: "3",
  minor: 1,
  moderat: 1,
  major: 1,
};

export default mockProjectDetails;
