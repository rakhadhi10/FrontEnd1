export default function ProjectType({ type }) {
  let color = "";

  switch (type) {
    case "reguler":
      color = "#C0D4F3";
      break;
    case "Regular Audit":
      color = "#C0D4F3";
      break;
    case "special":
      color = "#F3C0C3";
      break;
    case "tematik":
      color = "#F3E5C0";
      break;
    default:
      color = "#F3E5C0";
      break;
  }

  return (
    <p
      className="py-1 px-2 rounded-lg text-xs"
      style={{ backgroundColor: color }}
    >
      {type}
    </p>
  );
}
