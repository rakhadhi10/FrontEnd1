import { Breadcrumb, Menu } from "antd";
import { connect } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { getAllStatus } from "../store/ducks/PATProject/selectors";

const mapPathToLabel = {
  "": "BRISMA",
  "pat": "PAT",
  "projects": "LIST PAT",
  "latar-belakang": "Latar Belakang",
  "sumber-informasi": "Sumber Informasi",
  "target-audit": "Target Audit",
  "tim-audit": "Tim Audit",
  "jadwal-audit": "Jadwal Audit",
  "jadwal-consulting": "Jadwal Consulting",
  "anggaran": "Anggaran",
  "dokumen": "Dokumen",
}

const AddendumPATBreadcrumb = ({ status }) => {
  const { pathname } = useLocation()
  const { pat_id } = useParams()

  if (status) {
    mapPathToLabel[`addendum/${pat_id}`] = `ADDENDUM ${status.pat_name} ${status.tahun}`
  }

  const breadcrumbItems = getBreadcrumbItems(pathname, mapPathToLabel)

  return (
    <Breadcrumb
      separator=">"
    >
      {breadcrumbItems}
    </Breadcrumb>
  )
}

const mapStateToProps = (state) => ({ status: getAllStatus(state) })
export default connect(mapStateToProps)(AddendumPATBreadcrumb);

const getBreadcrumbItems = (path, mapPathToLabel) => {
  const splitPath = path.split("/")
  const addendumIndex = splitPath.indexOf("addendum")
  const part = "addendum/" + splitPath[addendumIndex + 1]
  splitPath.splice(addendumIndex + 1, 1)
  splitPath.splice(addendumIndex, 1, part)
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
        overlay={combinedArrayOfPaths[i].length === 5 ? BreadcrumbMenuPAT(splitPath.slice(0, -1).join("/")) : null}
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

const BreadcrumbMenuPAT = (prefix) => {
  return (
    <Menu>
      <Menu.Item key="1">
        <Link to={`${prefix}/latar-belakang`}>
          Latar Belakang
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`${prefix}/sumber-informasi`}>
          Sumber Informasi
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={`${prefix}/target-audit`}>
          Target Audit
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to={`${prefix}/tim-audit`}>
          Tim Audit
        </Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to={`${prefix}/jadwal-audit`}>
          Jadwal Audit
        </Link>
      </Menu.Item>
      <Menu.Item key="6">
        <Link to={`${prefix}/jadwal-consulting`}>
          Jadwal Consulting
        </Link>
      </Menu.Item>
      <Menu.Item key="7">
        <Link to={`${prefix}/anggaran`}>
          Anggaran
        </Link>
      </Menu.Item>
      <Menu.Item key="8">
        <Link to={`${prefix}/dokumen`}>
          Dokumen
        </Link>
      </Menu.Item>
    </Menu>
  );
}