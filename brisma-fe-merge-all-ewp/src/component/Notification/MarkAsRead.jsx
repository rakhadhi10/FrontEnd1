import PropTypes from "prop-types";

export default function MarkAsRead({ onClick }){
  return (
    <p 
      className="text-right text-primary-blue font-normal underline mt-4 cursor-pointer"
      onClick={onClick}
    >
      Mark all as Read
    </p>
  );
}

MarkAsRead.propTypes = {
  onClick: PropTypes.func
}

MarkAsRead.defaultProps = {
  onClick: () => null
}