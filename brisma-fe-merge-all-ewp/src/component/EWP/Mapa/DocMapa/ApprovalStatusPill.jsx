import PropTypes from "prop-types";

export default function ApprovalStatusPill({ status }){
  let color = "#D6330F"

  switch (status) {
    case "Approved":
      color = "#3C8231"
      break;
    case "Rejected":
      color = "#D6330F"
      break
    default:
      color = "#D6330F"
      break;
  }
  
  return (
    <p
      style={{
        backgroundColor: color
      }}
      className="px-2 rounded-lg text-white text-xs"
    >
      {status}
    </p>
  );
}

ApprovalStatusPill.propTypes = {
  status: PropTypes.oneOf(["Approved", "Rejected"]).isRequired
}