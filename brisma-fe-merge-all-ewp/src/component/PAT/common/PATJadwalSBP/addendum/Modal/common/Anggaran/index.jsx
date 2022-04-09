import { createErrorNotification, createSuccessNotification } from "../../../../../../../utils/notifications";
import AnggaranTabs from "../../../../../FormAnggaran/AnggaranTabs";
import BiayaPerjalananDinas from "./BiayaPerjalananDinas";
import BiayaSelamaKegiatan from "./BiayaSelamaKegiatan";

const showErrorNotif = createErrorNotification("Jadwal Consulting", "Gagal menyimpan jadwal consulting")
const showSuccessNotif = createSuccessNotification("Jadwal Consulting", "Berhasil menyimpan jadwal consulting")

export default function Anggaran(props) {
  return (
    <AnggaranTabs
      {...props}
      saveLabel="Simpan Jadwal Consulting"
      showErrorNotif={showErrorNotif}
      showSuccessNotif={showSuccessNotif}
      dinas={BiayaPerjalananDinas}
      kegiatan={BiayaSelamaKegiatan}
    />
  )
}
