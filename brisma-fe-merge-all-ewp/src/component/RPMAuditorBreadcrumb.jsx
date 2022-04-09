import { Breadcrumb } from "antd";
// import { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchAllKKPT, fetchKKPTDetails } from "../store/ducks/RPMAuditor/actions";
import { getKKPT, getKKPTMCS } from "../store/ducks/RPMAuditor/selectors";

const mapPathToLabel = {
  "": "BRISMA",
  "rpm": "RPM",
  "auditor/projects": "LIST RPM",
  "surat": "Surat",
  "riwayat-dokumen": "Dokumen",
}

const RPMAuditorBreadcrumb = ({ mcs, kkpts, fetchAllKKPT, fetchKKPTDetails }) => {
  const { pathname } = useLocation()
  const { id, kkpt_id } = useParams()

  // useEffect(() => {
  //   if (id) fetchAllKKPT(id)
  // }, [id, fetchAllKKPT])

  // useEffect(() => {
  //   if (id && kkpt_id) fetchKKPTDetails(kkpt_id, id)
  // }, [id, kkpt_id, fetchKKPTDetails])

  // if (mcs && mcs.nama_project) {
  //   mapPathToLabel[id] = mcs.nama_project
  // }

  if (id) mapPathToLabel[id] = "LIST KKPT"
  if (kkpt_id) mapPathToLabel[`kkpt/${kkpt_id}`] = "KKPT"

  // const currKKPT = kkpts && kkpts.find(a => Number(a.id) === Number(kkpt_id))

  // if (currKKPT) {
  //   mapPathToLabel[`kkpt/${kkpt_id}`] = currKKPT.nama_kkpt
  // }


  const breadcrumbItems = getBreadcrumbItems(pathname, mapPathToLabel)

  return (
    <Breadcrumb
      separator=">"
    >
      {breadcrumbItems}
    </Breadcrumb>
  )
}

const mapStateToProps = (state) => ({
  mcs: getKKPTMCS(state),
  kkpts: getKKPT(state),
})

const mapDispatchToProps = {
  fetchAllKKPT: fetchAllKKPT,
  fetchKKPTDetails: fetchKKPTDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(RPMAuditorBreadcrumb);

const getBreadcrumbItems = (path, mapPathToLabel) => {
  const splitPath = path.split("/")
  const addendumIndex = splitPath.indexOf("auditor")
  const part = "auditor/" + splitPath[addendumIndex + 1]
  splitPath.splice(addendumIndex + 1, 1)
  splitPath.splice(addendumIndex, 1, part)

  const kkptIndex = splitPath.indexOf("kkpt")
  if (kkptIndex !== -1) {
    const kkptPart = "kkpt/" + splitPath[kkptIndex + 1]
    splitPath.splice(kkptIndex + 1, 1)
    splitPath.splice(kkptIndex, 1, kkptPart)
  }

  const combinedArrayOfPaths = splitPath.map((_, index, arr) => {
    const slice = arr.slice(0, index + 1)
    return slice
  })
  const paths = combinedArrayOfPaths.map(arr => (arr.join("/")))

  let items = []
  for (let i = 0; i < splitPath.length; i++) {
    const label = mapPathToLabel[splitPath[i]]
    items.push(
      <Breadcrumb.Item
        key={i}
        className={`${splitPath.length - 1 !== i ? "underline" : null} font-semibold`}
        // overlay={combinedArrayOfPaths[i].length === 5 ? BreadcrumbMenuPAT(splitPath.slice(0, -1).join("/")) : null}
        dropdownProps={{ trigger: "click" }}
      >
        <Link
          replace
          to={paths[i]}
        >
          {label ? label : "Unknown"}
        </Link>
      </Breadcrumb.Item>
    )
  }

  return items
}