import PropTypes from "prop-types";

export default function Status({ text, colorClass }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${colorClass}`} />
      <div className="text-xs">{text}</div>
    </div>
  );
}

Status.defaultProps = {
  text: "Default",
  colorClass: "bg-primary-green",
};

Status.propTypes = {
  text: PropTypes.string,
  colorClass: PropTypes.string,
};
