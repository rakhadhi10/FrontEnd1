import PropTypes from "prop-types";
import { MinusOutlined } from "@ant-design/icons";

export default function DaftarIsiItem({ label, onClick }) {
  return (
    <div
      className="cursor-pointer flex flex-wrap items-center gap-2 py-1 px-1 rounded-lg hover:bg-primary-blue hover:text-white"
      onClick={onClick}
    >
      <MinusOutlined />
      <p>{label}</p>
    </div>
  );
}

DaftarIsiItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

DaftarIsiItem.defaultProps = {
  onClick: () => null,
};
