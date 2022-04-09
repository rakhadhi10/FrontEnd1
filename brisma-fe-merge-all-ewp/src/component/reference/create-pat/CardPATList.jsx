import { Pagination, Spin } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { changePage, fetchPATs } from "../../../store/ducks/CreatePAT/actions";
import { getCurrentPage, getError, getItemPerPage, getLoading, getPATs, getTotalPage } from "../../../store/ducks/CreatePAT/selectors";
import CardPAT from "./CardPAT";

function CardPATList({
  fetchPATs,
  changePage,
  error = null,
  loading = false,
  pats = [],
  currentPage = 1,
  totalPage = 1,
  itemsPerPage = 12,
}) {
  useEffect(() => fetchPATs(currentPage), [fetchPATs, currentPage])

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
            {pats.map((pat, idx) => {
              return <CardPAT key={idx} {...pat}/>
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

const mapStateToProps = state => ({
  error: getError(state),
  loading: getLoading(state),
  pats: getPATs(state),
  currentPage: getCurrentPage(state),
  totalPage: getTotalPage(state),
  itemsPerPage: getItemPerPage(state)
})

const mapDispatchToProps = {
  fetchPATs: fetchPATs,
  changePage: changePage
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPATList);