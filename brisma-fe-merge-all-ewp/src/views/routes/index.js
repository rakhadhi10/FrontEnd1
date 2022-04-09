import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import PortalDashboard from "../pages/PortalDashboard";
import LandingPage from "../pages/LandingPage";
import NotificationPage from "../pages/NotificationPage";
import PATListProjects from "../pages/PAT/PATListProjects";

import { default as NormalPATProject } from "../pages/PAT/normal/PATProject";
import { default as NormalPATLatarBelakang } from "../pages/PAT/normal/PATLatarBelakang";
import { default as NormalPATSumberInformasi } from "../pages/PAT/normal/PATSumberInformasi";
import { default as NormalPATTargetAudit } from "../pages/PAT/normal/PATTargetAudit";
import { default as NormalPATTimAudit } from "../pages/PAT/normal/PATTimAudit";
import { default as NormalPATJadwalAudit } from "../pages/PAT/normal/PATJadwalAudit";
import { default as NormalPATJadwalSBP } from "../pages/PAT/normal/PATJadwalSBP";
import { default as NormalPATAnggaranPage } from "../pages/PAT/normal/PATAnggaranPage";
import { default as NormalPATDocument } from "../pages/PAT/normal/PATDocument";
import { default as PATDocHistory } from "../pages/PAT/normal/PATDocHistory";

import { default as AddendumPATProject } from "../pages/PAT/addendum/PATProject";
import { default as AddendumPATLatarBelakang } from "../pages/PAT/addendum/PATLatarBelakang";
import { default as AddendumPATSumberInformasi } from "../pages/PAT/addendum/PATSumberInformasi";
import { default as AddendumPATTargetAudit } from "../pages/PAT/addendum/PATTargetAudit";
import { default as AddendumPATTimAudit } from "../pages/PAT/addendum/PATTimAudit";
import { default as AddendumPATJadwalAudit } from "../pages/PAT/addendum/PATJadwalAudit";
import { default as AddendumPATJadwalSBP } from "../pages/PAT/addendum/PATJadwalSBP";
import { default as AddendumPATAnggaranPage } from "../pages/PAT/addendum/PATAnggaranPage";
import { default as AddendumPATDocument } from "../pages/PAT/addendum/PATDocument";

import "../../styles/output.css";
import ReferenceDashboard from "../pages/reference/ReferenceDashboard";
import CreatePAT from "../pages/reference/CreatePAT";
import RPMMonitoringDashboard from "../pages/RPM/Monitoring/RPMMonitoringDashboard";

import { default as AuditeeRPMMonitoringListProject } from "../pages/RPM/Monitoring/auditee/RPMMonitoringListProject";
import { default as AuditeeRPMMonitoringProject } from "../pages/RPM/Monitoring/auditee/RPMMonitoringProject";
import { default as AuditeeRPMDocumentHistory } from "../pages/RPM/Monitoring/auditee/RPMDocumentHistory";
import { default as AuditeeRPMActionPlan } from "../pages/RPM/Monitoring/auditee/ActionPlan";
import { default as AuditeeRPMSurat } from "../pages/RPM/Monitoring/auditee/Surat";

import { default as AuditorRPMMonitoringListProject } from "../pages/RPM/Monitoring/auditor/RPMMonitoringListProject";
import { default as AuditorRPMMonitoringProject } from "../pages/RPM/Monitoring/auditor/RPMMonitoringProject";
import { default as AuditorRPMDocumentHistory } from "../pages/RPM/Monitoring/auditor/RPMDocumentHistory";
import { default as AuditorRPMActionPlan } from "../pages/RPM/Monitoring/auditor/ActionPlan";
import { default as AuditorRPMSurat } from "../pages/RPM/Monitoring/auditor/Surat";

import RPMProjectNegosiasi from "../pages/RPM/Negosiasi/RPMProjectNegosiasi";
import RPMProjectNegosiasiAttendence from "../pages/RPM/Negosiasi/RPMProjectNegosiasiAttandence";
import RPMProjectNegosiasiNotulen from "../pages/RPM/Negosiasi/Notulen";
import RPMProjectNegosiasiBeritaAcara from "../pages/RPM/Negosiasi/BeritaAcara";
import RPMProjectNegosiasiMeetingRincian from "../pages/RPM/Negosiasi/Rincian";
import RPMProjectNegosiasiPilihKKPT from "../pages/RPM/Negosiasi/RPMProjectNegosiasiPilihKKPT";
import AttendanceLogin from "../pages/RPM/Negosiasi/AttendanceLogin";

import MapaDashboard from "../pages/EWP/Mapa/MapaDashboard";
import MapaLatarBelakang from "../pages/EWP/Mapa/MapaLatarBelakang";
import MapaTujuan from "../pages/EWP/Mapa/MapaTujuan";
import MapaSumberInformasi from "../pages/EWP/Mapa/MapaSumberInformasi";
import MapaUkerAssesment from "../pages/EWP/Mapa/MapaUkerAssesment";
import MapaAnalisisPerencanaan from "../pages/EWP/Mapa/MapaAnalisisPerencanaan/MapaAnalisisPerencanaan";
import MapaTimAudit from "../pages/EWP/Mapa/MapaTimAudit";
import MapaJadwalAudit from "../pages/EWP/Mapa/MapaJadwalAudit";
import MapaAnggaran from "../pages/EWP/Mapa/MapaAnggaran";
import MapaPenugasan from "../pages/EWP/Mapa/MapaPenugasan";
import MapaDokumen from "../pages/EWP/Mapa/MapaDokumen";
import "../../styles/output.css";
import "antd/dist/antd.css";
import EWPListProject from "../pages/EWP/EWPListProject";
import EWPAuditInfo from "../pages/EWP/AuditInfo/EWPAuditInfo";
import EWPapproval from "../pages/EWP/EWPapproval";

import EwpKkpaList from "../pages/EWP/KKPA/EwpKkpaList";
import EwpKkpa from "../pages/EWP/KKPA/EwpKkpa";
import EwpKkpaProgramAudit from "../pages/EWP/KKPA/EwpKkpaProgramAudit";
import EwpKkpaKriteria from "../pages/EWP/KKPA/EwpKkpaKriteria";
import EwpKkpaRuangLingkup from "../pages/EWP/KKPA/EwpKkpaRuangLingkup";
import EwpKkpaPengujianSample from "../pages/EWP/KKPA/EwpKkpaSample.jsx";
import EwpKkpaPengujianKontrol from "../pages/EWP/KKPA/EwpKkpaPengujianKontrol";
import EwpKkpaKesimpulan from "../pages/EWP/KKPA/EwpKkpaKesimpulan";

import KKPTListProject from "../pages/EWP/KKPT/KKPTListProject";
import KKPTDokumenPIC from "../pages/EWP/KKPT/KKPTDokumenPIC";
import KKPTInfoKkpt from "../pages/EWP/KKPT/KKPTInfoKkpt";
import KKPTKondisi from "../pages/EWP/KKPT/KKPTKondisi";
import KKPTWorksheet from "../pages/EWP/KKPT/KKPTWorksheet";
import KKPTKontrol from "../pages/EWP/KKPT/KKPTKontrol";
import KKPTKriteria from "../pages/EWP/KKPT/KKPTKriteria";
import KKPTRekomendasi from "../pages/EWP/KKPT/KKPTRekomendasi";
import KKPTPenyebab from "../pages/EWP/KKPT/KKPTPenyebab";
import KKPTKategori from "../pages/EWP/KKPT/KKPTKategori";
import KKPTDampak from "../pages/EWP/KKPT/KKPTDampak";
import KKPTLikehood from "../pages/EWP/KKPT/KKPTLikehood";
import KKPTMenu from "../pages/EWP/KKPT/KKPTMenu";
import KKPTMerge from "../pages/EWP/KKPT/KKPTMerge";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/notification" element={<NotificationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<PortalDashboard />} />
      <Route path="/pat/projects" element={<PATListProjects />} />
      <Route path="/pat/projects/:pat_id" element={<NormalPATProject />} />
      <Route
        path="/pat/projects/:pat_id/latar-belakang"
        element={<NormalPATLatarBelakang />}
      />
      <Route
        path="/pat/projects/:pat_id/sumber-informasi"
        element={<NormalPATSumberInformasi />}
      />
      <Route
        path="/pat/projects/:pat_id/target-audit"
        element={<NormalPATTargetAudit />}
      />
      <Route
        path="/pat/projects/:pat_id/jadwal-audit"
        element={<NormalPATJadwalAudit />}
      />
      <Route
        path="/pat/projects/:pat_id/jadwal-consulting"
        element={<NormalPATJadwalSBP />}
      />
      <Route
        path="/pat/projects/:pat_id/tim-audit"
        element={<NormalPATTimAudit />}
      />
      <Route
        path="/pat/projects/:pat_id/anggaran"
        element={<NormalPATAnggaranPage />}
      />
      <Route
        path="/pat/projects/:pat_id/dokumen"
        element={<NormalPATDocument />}
      />
      <Route
        path="/pat/projects/:pat_id/riwayat-dokumen"
        element={<PATDocHistory />}
      />
      <Route
        path="/pat/projects/addendum/:pat_id"
        element={<AddendumPATProject />}
      />
      <Route
        path="/pat/projects/addendum/:pat_id/latar-belakang"
        element={<AddendumPATLatarBelakang />}
      />
      <Route
        path="/pat/projects/addendum/:pat_id/sumber-informasi"
        element={<AddendumPATSumberInformasi />}
      />
      <Route
        path="/pat/projects/addendum/:pat_id/target-audit"
        element={<AddendumPATTargetAudit />}
      />
      <Route
        path="/pat/projects/addendum/:pat_id/tim-audit"
        element={<AddendumPATTimAudit />}
      />
      <Route
        path="/pat/projects/addendum/:pat_id/jadwal-audit"
        element={<AddendumPATJadwalAudit />}
      />
      <Route
        path="/pat/projects/addendum/:pat_id/jadwal-consulting"
        element={<AddendumPATJadwalSBP />}
      />
      <Route
        path="/pat/projects/addendum/:pat_id/anggaran"
        element={<AddendumPATAnggaranPage />}
      />
      <Route
        path="/pat/projects/addendum/:pat_id/dokumen"
        element={<AddendumPATDocument />}
      />

      <Route path="/reference" element={<ReferenceDashboard />} />
      <Route path="/reference/create-pat" element={<CreatePAT />} />
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/notification" element={<NotificationPage />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/dashboard" element={<PortalDashboard />} />
      <Route path="/rpm" element={<RPMMonitoringDashboard />} />
      <Route
        path="/rpm/auditee/projects"
        element={<AuditeeRPMMonitoringListProject />}
      />
      <Route
        path="/rpm/auditee/projects/:id"
        element={<AuditeeRPMMonitoringProject />}
      />
      <Route
        path="/rpm/auditee/projects/:id/riwayat-dokumen"
        element={<AuditeeRPMDocumentHistory />}
      />
      <Route
        path="/rpm/auditee/projects/:id/kkpt/:kkpt_id"
        element={<AuditeeRPMActionPlan />}
      />
      <Route
        path="/rpm/auditee/projects/:id/kkpt/:kkpt_id/surat"
        element={<AuditeeRPMSurat />}
      />
      <Route
        path="/rpm/auditor/projects/:id/riwayat-dokumen"
        element={<AuditorRPMDocumentHistory />}
      />
      <Route
        path="/rpm/auditor/projects"
        element={<AuditorRPMMonitoringListProject />}
      />
      <Route
        path="/rpm/auditor/projects/:id"
        element={<AuditorRPMMonitoringProject />}
      />
      <Route
        path="/rpm/auditor/projects/:id/kkpt/:kkpt_id"
        element={<AuditorRPMActionPlan />}
      />
      <Route
        path="/rpm/auditor/projects/:id/kkpt/:kkpt_id/surat"
        element={<AuditorRPMSurat />}
      />
      <Route path="/rpm/negosiasi/:id" element={<RPMProjectNegosiasi />} />
      <Route
        path="/rpm/negosiasi/:id/attendance"
        element={<RPMProjectNegosiasiAttendence />}
      />
      <Route
        path="/rpm/negosiasi/:id/notulen"
        element={<RPMProjectNegosiasiNotulen />}
      />
      <Route
        path="/rpm/negosiasi/:id/berita-acara"
        element={<RPMProjectNegosiasiBeritaAcara />}
      />
      <Route
        path="/rpm/negosiasi/:id/kkpt"
        element={<RPMProjectNegosiasiPilihKKPT />}
      />
      <Route
        path="/rpm/negosiasi/:id/kkpt/:kkpt_id"
        element={<RPMProjectNegosiasiMeetingRincian />}
      />
      <Route path="/rpm/attendance/:id" element={<AttendanceLogin />} />

      <Route exact path="/ewp/project" element={<EWPListProject />} />
      <Route exact path="/ewp/approval" element={<EWPapproval />} />

      <Route
        exact
        path="/ewp/audit-info/:project_id"
        element={<EWPAuditInfo />}
      />

      <Route
        exact
        path="/ewp/mapa/dashboard/:project_id"
        element={<MapaDashboard />}
      />
      <Route
        exact
        path="/ewp/mapa/latar-belakang/:project_id"
        element={<MapaLatarBelakang />}
      />
      <Route
        exact
        path="/ewp/mapa/tujuan/:project_id"
        element={<MapaTujuan />}
      />
      <Route
        exact
        path="/ewp/mapa/sumber-informasi/:project_id"
        element={<MapaSumberInformasi />}
      />
      <Route
        exact
        path="/ewp/mapa/tim-audit/:project_id"
        element={<MapaTimAudit />}
      />
      <Route
        exact
        path="/ewp/mapa/uker-assesment/:project_id"
        element={<MapaUkerAssesment />}
      />
      <Route
        exact
        path="/ewp/mapa/analisis-perencanaan/:project_id"
        element={<MapaAnalisisPerencanaan />}
      />
      <Route
        exact
        path="/ewp/mapa/anggaran/:project_id"
        element={<MapaAnggaran />}
      />
      <Route
        exact
        path="/ewp/mapa/jadwal/:project_id"
        element={<MapaJadwalAudit />}
      />
      <Route
        exact
        path="/ewp/mapa/penugasan/:project_id"
        element={<MapaPenugasan />}
      />
      <Route exact path="/ewp/mapa/doc/:project_id" element={<MapaDokumen />} />

      <Route
        exact
        path="/ewp/kkpa/:project_id/:kkpa_id"
        element={<EwpKkpa />}
      />
      <Route
        exact
        path="/ewp/kkpa/program-audit/:project_id/:kkpa_id"
        element={<EwpKkpaProgramAudit />}
      />
      <Route
        exact
        path="/ewp/kkpa/kriteria/:project_id/:kkpa_id"
        element={<EwpKkpaKriteria />}
      />
      <Route
        exact
        path="/ewp/kkpa/ruang-lingkup/:project_id/:kkpa_id"
        element={<EwpKkpaRuangLingkup />}
      />
      <Route
        exact
        path="/ewp/kkpa/pengujian-sample/:project_id/:kkpa_id"
        element={<EwpKkpaPengujianSample />}
      />
      <Route
        exact
        path="/ewp/kkpa/pengujian-kontrol/:project_id/:kkpa_id"
        element={<EwpKkpaPengujianKontrol />}
      />
      <Route
        exact
        path="/ewp/kkpa/kesimpulan/:project_id/:kkpa_id"
        element={<EwpKkpaKesimpulan />}
      />
      <Route
        exact
        path="/ewp/kkpa/kkpa-list/:project_id"
        element={<EwpKkpaList />}
      />

      <Route
        exact
        path="/ewp/project/kkpt/:project_id"
        element={<KKPTMenu />}
      />
      <Route
        exact
        path="/ewp/project/kkpt/dokumen/:project_id"
        element={<KKPTDokumenPIC />}
      />
      <Route
        exact
        path="/ewp/project/kkpt/merge/:project_id"
        element={<KKPTMerge />}
      />
      <Route
        exact
        path="/ewp/project/kkpt/project/:project_id/:kkpt_id"
        element={<KKPTListProject />}
      />
      <Route
        exact
        path="/ewp/project/kkpt/info-kkpt/:project_id/:kkpt_id"
        element={<KKPTInfoKkpt />}
      />
      <Route
        exact
        path="/ewp/project/kkpt/kondisi/:project_id/:kkpt_id"
        element={<KKPTKondisi />}
      />
      <Route
        exact
        path="/ewp/project/kkpt/worksheet/:project_id/:kkpt_id"
        element={<KKPTWorksheet />}
      />
      <Route
        exact
        path="/ewp/project/kkpt/kontrol/:project_id/:kkpt_id"
        element={<KKPTKontrol />}
      />
      <Route
        exact
        path="/ewp/project/kkpt/kriteria/:project_id/:kkpt_id"
        element={<KKPTKriteria />}
      />
      <Route
        exact
        path="/ewp/project/kkpt/rekomendasi/:project_id/:kkpt_id"
        element={<KKPTRekomendasi />}
      />
      <Route
        exact
        path="/ewp/project/kkpt/penyebab/:project_id/:kkpt_id"
        element={<KKPTPenyebab />}
      />
      <Route
        exact
        path="/ewp/project/kkpt/kategori/:project_id/:kkpt_id"
        element={<KKPTKategori />}
      />
      <Route
        exact
        path="/ewp/project/kkpt/dampak/:project_id/:kkpt_id"
        element={<KKPTDampak />}
      />
      <Route
        exact
        path="/ewp/project/kkpt/likehood/:project_id/:kkpt_id"
        element={<KKPTLikehood />}
      />

      <Route path="*" element={<h1>Not found page</h1>} />
    </Routes>
  );
}

export default App;
