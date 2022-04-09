import PropTypes from "prop-types";
import Status from "./Status";

export default function CardMenu({ title, description, status, url, image, handleClicked }) {
  return (
    <div
      onClick={() => {
        handleClicked(url);
      }}
      style={{ minWidth: 150, maxWidth: 250 }}
      className="bg-white p-4 rounded-2xl border border-primary-blue cursor-pointer"
    >
      <div className="flex flex-col gap-4 h-full">
        <div className="border border-primary-blue text-primary-blue font-semibold px-4 py-2">
          {title}
        </div>
        <p>{description}</p>
        <div className="grid grid-cols-2 items-end mt-auto">
          <Status status={status} />
          <img src={image} alt={description} />
        </div>
      </div>
    </div>
  );
}

CardMenu.propTypes = {
  handleClicked: PropTypes.any,
  title: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.oneOf(["belum", "sudah"]),
  image: PropTypes.string,
};

CardMenu.defaultProps = {
  handleClicked: "Default",
  url: "Default",
  title: "Default",
  description: "Default",
  status: "belum",
  image: "/pat-project-1.png",
};
