export function Pill({ name }) {
  return (
    <div>
      <span className={`text-slate-500 capitalize ${name} rounded-lg px-3`}>
        {name}
      </span>
    </div>
  );
}
