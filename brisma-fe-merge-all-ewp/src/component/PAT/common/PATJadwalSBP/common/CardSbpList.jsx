import { Pagination, Spin } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router";
import CardSbp from "./CardSbp";

export default function CardSbpList({
  addendum,
  loading,
  error,
  jadwal,
  currentPage,
  totalPage,
  itemsPerPage,
  fetchAllSbp,
  openEditModal,
  deleteJadwalSbp,
  changePage,
}) {
  const { pat_id } = useParams()

  useEffect(() => fetchAllSbp(pat_id, currentPage), [fetchAllSbp, pat_id, currentPage])

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
          <div className="mb-8 grid grid-cols-3 items-start gap-8">
            {jadwal.map((x) => (
              <CardSbp
                {...x}
                key={x.id}
                addendum={addendum}
                openEditModal={() => openEditModal(pat_id, x.id)}
                deleteJadwalSbp={() => deleteJadwalSbp(x.id, pat_id)}
              />
            ))}
          </div>
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
  );
}