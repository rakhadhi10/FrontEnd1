import { Button, Tabs } from "antd";
import { useParams } from "react-router-dom";
import DialogAlasanAddendum from "../DialogAlasanAddendum";

const { TabPane } = Tabs;

export default function AnggaranTabs({
  addendum,
  saveLabel = "Simpan",
  loading,
  error,
  prev,
  submitForm,
  closeModal,
  fetchAllJadwalAudit,
  showErrorNotif,
  showSuccessNotif,
  dinas: BiayaPerjalananDinas,
  kegiatan: BiayaSelamaKegiatan
}) {
  const { pat_id } = useParams()

  const handleOnSubmit = async (e) => {
    if (addendum) {
      DialogAlasanAddendum(async (alasan) => {
        const success = await submitForm(pat_id, alasan)
        if (success) {
          closeModal()
          showSuccessNotif()
          fetchAllJadwalAudit(pat_id)
        } else {
          showErrorNotif()
        }
        return success
      })
    } else {
      const success = await submitForm(pat_id)
      if (success) {
        closeModal()
        showSuccessNotif()
        fetchAllJadwalAudit(pat_id)
      } else {
        showErrorNotif()
      }
    }
  }

  return (
    <>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Biaya Perjalanan Dinas" key="1">
          <BiayaPerjalananDinas />
        </TabPane>
        <TabPane tab="Biaya Selama Kegiatan" key="2">
          <BiayaSelamaKegiatan />
        </TabPane>
      </Tabs>
      <div className="mt-8 flex justify-between items-center">
        <p className="font-semibold">Mohon isi semua data sebelum ke tahap selanjutnya</p>
        <div className="flex flex-row justify-end gap-4">
          <Button
            disabled={false}
            onClick={prev}
          >
            Back
          </Button>
          <Button
            type={addendum ? "danger" : "primary"}
            htmlType="submit"
            disabled={false}
            loading={loading}
            onClick={handleOnSubmit}
          >
            {saveLabel}
          </Button>
        </div>
      </div>
    </>
  );
}
