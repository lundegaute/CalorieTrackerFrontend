import styles from "./PlanSummary.module.css";
import {DetailedMealDTO} from "@/Types/DetailedTypes";

export function DetailedPlanSummary({detailedMeals}: {detailedMeals: DetailedMealDTO[]}) {

  const totalCalories = detailedMeals.reduce((acc, meal) => acc + meal.totalCalories, 0);
  const totalProtein = detailedMeals.reduce((acc, meal) => acc + meal.totalProtein, 0);
  const totalCarbs = detailedMeals.reduce((acc, meal) => acc + meal.totalCarbs, 0);
  const totalFats = detailedMeals.reduce((acc, meal) => acc + meal.totalFats, 0);

  return (
    <div className={styles.totals}>
      <InfoCard title={"Total Calories"} value={parseFloat(totalCalories.toFixed(2))} />
      <InfoCard title={"Total Protein"} value={parseFloat(totalProtein.toFixed(2))} />
      <InfoCard title={"Total Carbs"} value={parseFloat(totalCarbs.toFixed(2))} />
      <InfoCard title={"Total Fats"} value={parseFloat(totalFats.toFixed(2))} />
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