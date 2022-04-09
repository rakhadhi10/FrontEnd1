import PropTypes from "prop-types";

export default function CardList({ title, description, status, image, onClick, url }) {

    return (
        <div
            style={{ minWidth: 150, maxWidth: 250 }}
            className="bg-white p-4 rounded-2xl border border-primary-blue cursor-pointer"
            onClick={onClick}
        >
            <div className="flex flex-col gap-4 h-full">
                <div className="border border-primary-blue text-primary-blue font-semibold px-4 py-2">
                    {title}
                </div>
                <p>{description}</p>
                <div className="grid grid-cols-2 items-end mt-auto">
                    <div className="flex justify-start items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-primary-green`} />
                        <div className="text-xs">
                            {status}
                        </div>
                    </div>
                    <img src={image} alt={description} />
                </div>
            </div>
        </div>

    );
}

CardList.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    image: PropTypes.string,
}

CardList.defaultProps = {
    title: "Default",
    description: "Default",
    status: "",
    image: "/pat-project-1.png"
}
