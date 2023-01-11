import "./categoryCard.css";

export function CategoryCard({ name, color }) {
  return (
    <div
      className={`rounded-lg drop-shadow-md ${color} p-8 w-[208] flex justify-center`}
    >
      <span>{name}</span>
    </div>
  );
}
