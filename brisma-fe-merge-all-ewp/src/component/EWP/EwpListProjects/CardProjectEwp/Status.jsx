import PropTypes from "prop-types";

export default function Status({ text, colorClass }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${colorClass}`} />
      <div className="">{text}</div>
    </div>
  );
}

Status.defaultProps = {
  text: "Default",
  colorClass: "bg-primary-green",
}

Status.propTypes = {
  text: PropTypes.string,
  colorClass: PropTypes.string
}