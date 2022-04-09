import PropTypes from "prop-types";
import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

const sortedPATPaths = [
  "latar-belakang",
  "sumber-informasi",
  "target-audit",
  "tim-audit",
  "jadwal-audit",
  "jadwal-consulting",
  "anggaran",
  "dokumen"
]

const joinPath = (arr, path) => {
  const newArr = [...arr]
  newArr.push(path)
  return newArr.join("/")
}

const getPaths = (currentPath, sortedPaths) => {
  const splitPath = currentPath.split("/")
  const lastPath = splitPath.pop()
  const currentIndex = sortedPaths.findIndex((path) => path === lastPath)
  const before = sortedPaths[currentIndex - 1]
  const beforePath = joinPath(splitPath, before)
  const after = sortedPaths[currentIndex + 1]
  const afterPath = joinPath(splitPath, after)
  return [
    {
      disabled: !before,
      path: beforePath
    },
    {
      disabled: !after,
      path: afterPath
    }
  ]
}

const PrevNextNav = ({ sortedPaths }) => {
  const { pathname } = useLocation()
  const [before, after] = getPaths(pathname, sortedPaths)

  return (
    <div className="flex gap-1">
      <Button
        size="small"
        disabled={before.disabled}
      >
        <Link to={before.path}>
          &lt;
        </Link>
      </Button>
      <Button
        size="small"
        disabled={after.disabled}
      >
        <Link to={after.path}>
          &gt;
        </Link>
      </Button>
    </div>
  )
}

export default PrevNextNav;

PrevNextNav.defaultProps = {
  sortedPaths: sortedPATPaths
}

PrevNextNav.propTypes = {
  sortedPaths: PropTypes.array
}