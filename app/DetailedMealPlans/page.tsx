import styles from "./DetailedMealPlans.module.css";
import DetailedCompleteOverview from "@/components/DetailedComponents/DetailedOverview/DetailedCompleteOverview";

export default function DetailedTrackerPage() {
  return (
    <div className={styles.dashboardContainer}>
      
      {/* 1. TOP SECTION: THE HEADER CAP */}
      <header className={styles.headerCap}>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 800, color: "#fff" }}>
          Detailed Meal Plans
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginTop: "0.25rem" }}>
          Measure macro and micro nutrients for every MealPlan.
        </p>
      </header>

      <DetailedCompleteOverview />
    
    </div>
  );
}