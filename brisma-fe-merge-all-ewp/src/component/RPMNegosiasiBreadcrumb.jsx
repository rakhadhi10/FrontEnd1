import { Breadcrumb } from "antd";
import { connect } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";

const mapPathToLabel = {
  "": "BRISMA",
  "rpm": "RPM",
  "attendance": "Attendance",
  "notulen": "Notulen",
  "berita-acara": "Berita Acara",
  "kkpt": "LIST KKPT"
}

const RPMNegosiasiBreadcrumb = (props) => {
  const { pathname } = useLocation()
  const { kkpt_id } = useParams()

  if (kkpt_id) mapPathToLabel[kkpt_id] = "KKPT"

  const breadcrumbItems = getBreadcrumbItems(pathname, mapPathToLabel)

  return (
    <Breadcrumb
      separator=">"
    >
      {breadcrumbItems}
    </Breadcrumb>
  )
}

export default connect()(RPMNegosiasiBreadcrumb);

const getBreadcrumbItems = (path, mapPathToLabel) => {
  const splitPath = path.split("/")
  const addendumIndex = splitPath.indexOf("negosiasi")
  const part = "negosiasi/" + splitPath[addendumIndex + 1]
  splitPath.splice(addendumIndex + 1, 1)
  splitPath.splice(addendumIndex, 1, part)

  mapPathToLabel[part] = "Negosiasi"

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