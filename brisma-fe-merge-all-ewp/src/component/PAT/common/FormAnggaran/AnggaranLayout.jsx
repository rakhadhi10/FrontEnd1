export default function AnggaranLayout({ children }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {children}
    </div>
  );
}