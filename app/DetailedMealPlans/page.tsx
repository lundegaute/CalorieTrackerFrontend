import styles from "./DetailedMealPlans.module.css";
import {DetailedPlanSummary} from "@/components/DetailedComponents/DetailedMealPlan/PlanSummary";

export default function DetailedTrackerPage() {
  return (
    <div className={styles.dashboardContainer}>
      
      {/* 1. TOP SECTION: THE HEADER CAP */}
      <header className={styles.headerCap}>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 800, color: "#fff" }}>
          Detailed Meal Plans
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginTop: "0.25rem" }}>
          Measure macro and micro nutrients for every meal plan.
        </p>
      </header>

      {/* 2. MAIN MIDDLE SECTION: THE CSS GRID BLUEPRINT MATRIX */}
      <div className={styles.gridMatrix}>
        
        {/* 2.1 LEFT PANEL: TOTAL CALORIES & MACRO NUMBERS */}
        {/* col-span-2: Spans 2 out of the 11 units available */}
        <aside className={styles.leftSidebar}>
          <div>
            <div className={styles.outlineLabel}>
              [Left Outline: Totals]
            </div>
            {/* Real macro numeric squares will go here */}
          </div>
          <div className="text-xs text-slate-600 text-center">Macro Nutrients</div>
        </aside>

        {/* 2.2 CENTER PANEL: THE MASTER DATA GRID / TABLE PLACEHOLDER */}
        {/* col-span-6: Spans the vast majority of the width (6 columns) for heavy reading */}
        <section className={styles.centerTableSection}>
          <div>
            <div className={styles.centerLabel}>
              [Center Outline: Table / DevExpress / MUI]
            </div>
            {/* The actual meal tracking row elements go here */}
          </div>
          <div className="text-xs text-slate-500 text-center">Interactive Data Matrix</div>
        </section>

        {/* 2.3 RIGHT PANEL: PIE CHARTS & ANALYTICAL GRAPH OUTLINES */}
        {/* col-span-3: Spans 3 out of the 11 units */}
        <aside className={styles.rightSidebar}>
          <div>
            <div className={styles.outlineLabel}>
              [Right Outline: Charts]
            </div>
            {/* Your chart canvas references will inject here */}
          </div>
          <div className={"text-xs text-slate-600 text-center"}>Visual Distributions</div>
        </aside>

      </div>
    </div>
  );
}