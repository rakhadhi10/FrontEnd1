import { Pagination, Spin } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AnggaranLainCard from "./AnggaranLainCard";
import AuditCard from "./AuditCard";
import SBPCard from "./SBPCard";

export default function AnggaranCardsList({
  addendum,
  fetchAnggaran,
  deleteKegiatan,
  openEditModal,
  changePage,
  data,
  error,
  loading,
  currentPage,
  totalPage,
  itemsPerPage,
}) {
  const { pat_id } = useParams()

  useEffect(() => fetchAnggaran(pat_id, currentPage), [fetchAnggaran, pat_id, currentPage])

  return (
    <>
      {loading &&
        <div className="p-8 text-center">
          <Spin />
        </div>
      }
      {error && !loading &&
        <div className="p-8 text-center">
          <p>{error}</p>
        </div>
      }
      {!loading && !error &&
        <>
          <section className="my-8 grid grid-cols-3 gap-8 items-start">
            {data.jadwal_audit && data.jadwal_audit.map((item, idx) => <AuditCard key={idx + item.id} {...item} />)}
            {data.jadwal_sbp && data.jadwal_sbp.map((item, idx) => <SBPCard key={idx + item.id} {...item} />)}
            {data.kegiatan_lain && data.kegiatan_lain.map((item, idx) =>
              <AnggaranLainCard
                {...item}
                key={idx + item.id}
                addendum={addendum}
                openEditModal={() => openEditModal(pat_id, item.id)}
                deleteKegiatan={() => deleteKegiatan(pat_id, item.id)}
              />
            )}
          </section>
          <div className="flex flex-row justify-center pb-10">
            <Pagination
              onChange={(page) => changePage(page)}
              pageSize={itemsPerPage}
              current={currentPage}
              total={totalPage * itemsPerPage}
            />
          </div>
        </>
      }
    </>
  )
}