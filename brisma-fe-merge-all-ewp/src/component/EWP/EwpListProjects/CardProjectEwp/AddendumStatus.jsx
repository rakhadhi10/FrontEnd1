import PropTypes from "prop-types";
import Status from "./Status";

export default function AddendumStatus({ num }) {
  const colorClass = num > 0 ? "bg-primary-purple" : "bg-primary-gray"
  const text = `Addendum ke-${num}`

  return (
    <Status text={text} colorClass={colorClass} />
  );
}

AddendumStatus.defaultProps = {
  num: 0
}

AddendumStatus.propTypes = {
  num: PropTypes.number
}

