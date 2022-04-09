import { Pagination, Spin } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router";
import CardTimAudit from "./CardTimAudit";

export default function CardsTimAuditList({
  addendum,
  fetchAllTimAudit,
  changePage,
  teams,
  error,
  loading,
  currentPage,
  totalPage,
  itemsPerPage,
  onClickEdit,
  onClickDelete
}) {
  const { pat_id } = useParams()

  useEffect(() => fetchAllTimAudit(pat_id, currentPage), [fetchAllTimAudit, pat_id, currentPage])

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
            {teams.map((tim, idx) => {
              return <CardTimAudit
                {...tim}
                key={tim.id}
                addendum={addendum}
                onClickEdit={() => onClickEdit({ ...tim })}
                onClickDelete={async () => await onClickDelete(tim.id, pat_id)}
              />
            })}
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