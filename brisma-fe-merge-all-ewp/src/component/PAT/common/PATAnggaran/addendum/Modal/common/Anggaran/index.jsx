import { createErrorNotification, createSuccessNotification } from "../../../../../../../utils/notifications";
import AnggaranTabs from "../../../../../FormAnggaran/AnggaranTabs";
import BiayaPerjalananDinas from "./BiayaPerjalananDinas";
import BiayaSelamaKegiatan from "./BiayaSelamaKegiatan";

const showErrorNotif = createErrorNotification("Kegiatan Lain", "Gagal menyimpan kegiatan lain")
const showSuccessNotif = createSuccessNotification("Kegiatan Lain", "Berhasil menyimpan kegiatan lain")

export default function Anggaran(props) {
  return (
    <AnggaranTabs
      {...props}
      saveLabel="Simpan Kegiatan Lain"
      showErrorNotif={showErrorNotif}
      showSuccessNotif={showSuccessNotif}
      dinas={BiayaPerjalananDinas}
      kegiatan={BiayaSelamaKegiatan}
    />
  )
}
