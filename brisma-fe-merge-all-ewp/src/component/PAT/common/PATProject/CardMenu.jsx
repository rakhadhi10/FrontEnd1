import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import Status from "./Status";

export default function CardMenu({ title, description, status, image, src, addendum }) {
  let navigate = useNavigate();

  function handleOnClick(e) {
    e.preventDefault();
    navigate(src);
  }

  const border = `1px solid ${addendum ? "#ED0000" : "rgba(60, 100, 177, 1)"}`

  return (
    <div
      className="bg-white p-4 rounded-2xl cursor-pointer"
      style={{ minWidth: 150, maxWidth: 250, border: border }}
      onClick={handleOnClick}
    >
      <div className="flex flex-col gap-4 h-full">
        <div
          className="text-primary-blue font-semibold px-4 py-2"
          style={{ border: border }}
        >
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
  title: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.oneOf(["belum", "sudah"]),
  image: PropTypes.string,
};

CardMenu.defaultProps = {
  title: "Default",
  description: "Default",
  status: "belum",
  image: "/pat-project-1.png",
};
