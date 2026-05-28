import styles from "./PlanSummary.module.css";
import {DetailedCompleteOverviewDTO} from "@/Types/DetailedTypes";

interface overviewSource {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

export function DetailedPlanSummary({dataSource}: {dataSource: overviewSource}) {

  return (
    <div className={styles.totals}>
      <InfoCard title={"Total Calories"} value={dataSource.totalCalories} />
      <InfoCard title={"Total Protein"} value={dataSource.totalProtein} />
      <InfoCard title={"Total Carbs"} value={dataSource.totalCarbs} />
      <InfoCard title={"Total Fats"} value={dataSource.totalFats} />
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