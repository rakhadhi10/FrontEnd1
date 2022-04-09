import { Pagination, Spin } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePage, fetchProjects } from "../../../../store/ducks/PATListProjects/actions";
import { getCurrentPage, getError, getItemPerPage, getLoading, getProjects, getTotalPage } from "../../../../store/ducks/PATListProjects/selectors";
import CardProject from "./CardProject/CardProject";
import ModalDetailProject from "./ModalDetailProject";

export function CardProjectsList({
  error,
  loading,
  projects,
  currentPage,
  totalPage,
  itemsPerPage,
  fetchPAT,
  changePage
}) {
  useEffect(() => fetchPAT(currentPage), [fetchPAT, currentPage])
  const navigate = useNavigate()
  const [detailVisible, setDetailVisible] = useState(false)
  const toggleDetailModal = (bool) => setDetailVisible(bool)

  const getContent = () => {
    let result = null
    if (error && !loading) result = <p>{error}</p>
    else if (loading) result = <div className="flex justify-center items-center" ><Spin /></div>
    else if (!projects || projects.length === 0) result = <p>Nothing found</p>
    else result = (
      <>
        <ModalDetailProject visible={detailVisible} onCancel={() => toggleDetailModal(false)} />
        <div className="grid grid-cols-3 gap-8">
          {projects.map(project => (
            <CardProject
              {...project}
              key={project.id}
              onClickDoc={() => navigate(`/pat/projects/${project.id}/riwayat-dokumen`)}
              onClickDetails={() => toggleDetailModal(true)}
            />
          ))}
        </div>
        <div className="flex flex-row justify-center py-10">
          <Pagination
            onChange={(page) => changePage(page)}
            current={currentPage}
            pageSize={itemsPerPage}
            total={totalPage * itemsPerPage}
          />
        </div>
      </>
    )
    return result
  }

  return getContent()
}

const mapStateToProps = state => ({
  error: getError(state),
  loading: getLoading(state),
  projects: getProjects(state),
  currentPage: getCurrentPage(state),
  totalPage: getTotalPage(state),
  itemsPerPage: getItemPerPage(state)
})

const mapDispatchToProps = {
  fetchPAT: fetchProjects,
  changePage: changePage
}

export default connect(mapStateToProps, mapDispatchToProps)(CardProjectsList)