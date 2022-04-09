import { createErrorNotification, createSuccessNotification } from "../../../../../../../utils/notifications";
import AnggaranTabs from "../../../../../../common/FormAnggaran/AnggaranTabs";
import BiayaPerjalananDinas from "./BiayaPerjalananDinas";
import BiayaSelamaKegiatan from "./BiayaSelamaKegiatan";

const showErrorNotif = createErrorNotification("Jadwal Audit", "Gagal menyimpan jadwal audit")
const showSuccessNotif = createSuccessNotification("Jadwal Audit", "Berhasil menyimpan jadwal audit")

export default function Anggaran(props) {
  return (
    <AnggaranTabs
      {...props}
      saveLabel="Simpan Jadwal Audit"
      showErrorNotif={showErrorNotif}
      showSuccessNotif={showSuccessNotif}
      dinas={BiayaPerjalananDinas}
      kegiatan={BiayaSelamaKegiatan}
    />
  )
}
