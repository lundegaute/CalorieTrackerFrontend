
import { MealDetails } from "@/components/DataGrids/MealDetails";
import FoodSearchPanel from "@/components/MealDetails/FoodSearchPanel";
import { MacroPieChart } from "@/components/MealDetails/MacroPieChart";
import { QuickMacros } from "@/components/MealDetails/QuickMacros";
import { CreateCustomFood } from "@/components/Form/CreateCustomFood";
import Link from "next/link";

export default async function Meal({ params, searchParams }: {params: Promise<{ id: string }>; searchParams: Promise<{ mealName?: string }>}) {
  const resolvedMealNameId = await params;
  const resolvedMealName = await searchParams;
  const mealNameId = Number(resolvedMealNameId.id);
  const mealName = resolvedMealName.mealName || "Unknown Meal";

  return (
    <main className="mx-auto max-w-7xl min-h-screen px-6 py-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
              Meal: {mealName}
            </h1>
          <p className="mt-2 text-sm text-slate-400">
            Review foods, adjust quantities, and monitor macros.
          </p>
        </div>
        <div className="flex gap-3">
          {/* Placeholder for a client AddFood button/form component */}
          {/* <AddFoodButton mealId={mealId} /> */}
        </div>
      </header>

      {/* 3-column responsive layout */}
      <div className="grid gap-8 xl:grid-cols-[240px_minmax(0,1fr)_280px]">
        {/* Left Rail: Actions / Add Food */}
        <aside className="space-y-5 order-last xl:order-first">
          <Panel title="Add Food">
            <FoodSearchPanel mealId={mealNameId}/>
          </Panel>
          {/* Adding custom food with SweetAlert */}
          <Panel title="Add custom food to Database">
            <CreateCustomFood />
          </Panel>
        </aside>
        {/* Center: Meal Foods Table */}
        <section
          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 md:p-6
                     shadow-[0_4px_18px_-4px_rgba(0,0,0,0.4)] transition"
          aria-label="Meal items"
        >
          <div className="flex items-center justify-between mb-4">
            <Link 
              href={`/Meals`}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-emerald-300 bg-slate-800/50 hover:bg-slate-700/50 rounded-md border border-slate-600/50 hover:border-emerald-400/30 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Meals
            </Link>
            <h2 className="text-lg font-semibold text-slate-200">Foods In Meal</h2>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent mb-4" />
          <div className="flex justify-center">
            <MealDetails mealNameId={mealNameId} />
          </div>
        </section>

        {/* Right Rail: Stats / Charts */}
        <aside className="space-y-5">
          <Panel title="Macro Distribution">
            <MacroPieChart mealNameId={mealNameId} />
          </Panel>
          <Panel title="Quick Macros">
            <QuickMacros mealNameId={mealNameId}/> {/* Show Total calories and macro nutrients for the meal */}
          </Panel>
        </aside>
      </div>
    </main>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-4 hover:bg-white/10 transition">
      <h3 className="text-sm font-semibold text-slate-200 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function PlaceholderButton({ label }: { label: string }) { /* Not in use, but let it stay for now*/
  return (
    <div className="inline-flex items-center rounded-md border border-emerald-400/30 px-3 py-1.5 text-xs font-medium text-emerald-200
                    bg-emerald-500/10 hover:bg-emerald-500/20 transition cursor-not-allowed select-none">
      {label}
    </div>
  );
}


// (Add spin-slow keyframes in globals.css if not already present)
// @keyframes spin-slow { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
// .animate-spin-slow { animation: spin-slow 8s linear infinite; }