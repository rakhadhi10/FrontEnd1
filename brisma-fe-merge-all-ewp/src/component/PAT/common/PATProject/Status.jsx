export default function Status({ status }) {
  const text = status === "sudah" ? "Sudah diisi" : "Belum diisi";
  const color = status === "sudah" ? "bg-primary-green" : "bg-red-500";

  return (
    <div className="flex justify-start items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <div className="text-xs">{text}</div>
    </div>
  );
}
