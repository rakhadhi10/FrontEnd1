import { Pagination, Spin } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router";

export default function CardsJadwalAuditList({
  addendum,
  fetchAllJadwalAudit,
  changePage,
  jadwals,
  error,
  loading,
  currentPage,
  totalPage,
  itemsPerPage,
  card: Card
}) {
  const { pat_id } = useParams()

  useEffect(() => fetchAllJadwalAudit(pat_id, currentPage), [fetchAllJadwalAudit, pat_id, currentPage])

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
          <section className="my-8 grid grid-cols-3 items-start gap-8">
            {jadwals.map((item, idx) => (
              <Card
                key={idx}
                addendum={addendum}
                {...item}
              />
            ))}
          </section>
          <div className="flex flex-row justify-center pb-10">
            <Pagination
              onChange={(page) => changePage(page)}
              current={currentPage}
              pageSize={itemsPerPage}
              total={totalPage * itemsPerPage}
            />
          </div>
        </>
      }
    </>
  );
}