import { Button, Tabs } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { createErrorNotification, createSuccessNotification } from "../../../../utils/notifications";
import TableAssign from "./TableAssign";

const { TabPane } = Tabs;

const originData = [];

for (let i = 0; i < 5; i++) {
  originData.push({
    key: i.toString(),
    nama: {
      pn: 123,
      nama: "Edward",
      jabatan: "Kepala Auditor Intern Wilayah"
    },
    posisi: "Auditee",
    deskripsi: `Auditee kepala auditor intern wilayah`,
  });
}

export default function TabsAssign(props) {
  const [editing, setEditing] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [makerData, setMakerData] = useState([]);
  const [checkerData, setCheckerData] = useState([]);
  const [signerData, setSignerData] = useState([]);

  const { makers, checkers, signers } = props.initialValues;

  useEffect(() => {
    setMakerData(makers.map((a, idx) => ({ key: idx, nama: a, posisi: a.jabatan, deskripsi: a.deskripsi_tugas })))
    setCheckerData(checkers.map((a, idx) => ({ key: idx, nama: a, posisi: a.jabatan, deskripsi: a.deskripsi_tugas })))
    setSignerData(signers.map((a, idx) => ({ key: idx, nama: a, posisi: a.jabatan, deskripsi: a.deskripsi_tugas })))
  }, [makers, checkers, signers])

  return (
    <>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Maker" key="1">
          <TableAssign
            {...props}
            addButtonLabel="Add Maker"
            data={makerData}
            updateData={setMakerData}
            setEditing={setEditing}
          />
        </TabPane>
        <TabPane tab="Checker" key="2">
          <TableAssign
            {...props}
            addButtonLabel="Add Checker"
            data={checkerData}
            updateData={setCheckerData}
            setEditing={setEditing}
          />
        </TabPane>
        <TabPane tab="Signer" key="3">
          <TableAssign
            {...props}
            addButtonLabel="Add Signer"
            data={signerData}
            updateData={setSignerData}
            setEditing={setEditing}
          />
        </TabPane>
      </Tabs>
      <div className="mt-8 flex justify-between items-center">
        <p className="font-semibold">Mohon isi semua data sebelum ke tahap selanjutnya</p>
        <div className="flex flex-row justify-end gap-4">
          <Button
            type="primary"
            disabled={editing}
            loading={submitting}
            onClick={async () => {
              setSubmitting(true)
              const m = makerData.map(a => ({ ...a.nama, pn: String(a.nama.pn), jabatan: a.posisi || a.nama.jabatan, deskripsi_tugas: a.deskripsi }))
              const c = checkerData.map(a => ({ ...a.nama, pn: String(a.nama.pn), jabatan: a.posisi || a.nama.jabatan, deskripsi_tugas: a.deskripsi }))
              const s = signerData.map(a => ({ ...a.nama, pn: String(a.nama.pn), jabatan: a.posisi || a.nama.jabatan, deskripsi_tugas: a.deskripsi }))

              const success = await props.updateMCS({ makers: m, checkers: c, signers: s })
              setSubmitting(false)
              if (success) {
                createSuccessNotification("Assign", "Berhasil assign maker/checker/signer")()
                props.onCancel()
              } else {
                createErrorNotification("Assign", "Gagal assign maker/checker/signer")()
              }
            }}
          >
            Assign
          </Button>
        </div>
      </div>
    </>
  )
}