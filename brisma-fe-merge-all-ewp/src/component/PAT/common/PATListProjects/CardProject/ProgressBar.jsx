import PropTypes from "prop-types";

export default function ProgressBar({ percent }) {
  return (
    <div className="relative" style={{ backgroundColor: "#D6D5D2" }}>
      <div class="bg-primary-red h-1" style={{ width: `${percent}%` }}></div>
      <p className="absolute right-0 text-xs text-primary-gray">{percent}%</p>
    </div>
  );
}

ProgressBar.defaultProps = {
  percent: 0,
};

ProgressBar.propTypes = {
  percent: PropTypes.number,
};
