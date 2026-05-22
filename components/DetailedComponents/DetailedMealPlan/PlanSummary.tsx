import styles from "./PlanSummary.module.css";

export function DetailedPlanSummary() {


  return (
    <div className={""}>
      <InfoCard title={"Total Calories"} value={2500} />
      <InfoCard title={"Total Protein"} value={200} />
      <InfoCard title={"Total Carbs"} value={350} />
      <InfoCard title={"Total Fats"} value={90} />
    </div>
  )
}





function InfoCard({ title, value }: { title: string; value: number;}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 hover:bg-white/10 transition">
      <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
      <p className="mt-1 text-xl font-semibold text-emerald-300 tabular-nums">{value}</p>
    </div>
  );
}