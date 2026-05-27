"use client";
import styles from "./DetailedMealPlans.module.css";
import {useQuery} from "@tanstack/react-query";
import {useState } from "react";
import { ApiResponse, DetailedCompleteOverviewDTO } from "@/Types/DetailedTypes";
import DetailedMeals from "@/components/Tables/DetailedTables/DetailedMeals";
import {DetailedPlanSummary} from "@/components/DetailedComponents/DetailedMealPlan/PlanSummary";


export function DetailedCompleteOverview() {
    const [selectedMealId, setSelectedMealId] = useState<number | null>(null)
    const [activeMealPlan, setActiveMealPlan] = useState<number>(0)
    const {data: apiResponse, isLoading, error} = useQuery<ApiResponse<DetailedCompleteOverviewDTO[]>>({
        queryKey: ["detailedOverview"],
        queryFn: async () => {
            const res = await fetch("api/DetailedMealPlans", {
                method: "GET",
                credentials: "include"
            });
            if (!res.ok) {
                throw new Error(`Server Error! Status: ${res.status}`)
            }
            const data: ApiResponse<DetailedCompleteOverviewDTO[]> = await res.json();
            return data;
        },
        retry: 0
    });

    if (isLoading) {
        return (
            <h1>Fetching data...</h1>
        )
    }
    if (error || !apiResponse?.data) {
        return (
            <h1>Error during fetch: {error?.message}</h1>
        )
    }
    const activePlan = apiResponse?.data[0];
    if ( !activePlan ) {
        return <h1>User has no active plan.</h1>
    }

    if (apiResponse && apiResponse.data) {
        return (
            <main className={styles.gridMatrix}>
                {/* 2.1 LEFT PANEL */}
                <aside className={styles.leftSidebar}>
                    <div className={styles.leftComponents}>
                        <div className={styles.outlineLabel}>
                        Total Calories:
                        </div>
                        <DetailedPlanSummary detailedMeals={activePlan.detailedMeals}/> 
                        {/* Real macro numeric squares will go here */}
                    </div>
                </aside>

                {/* CENTER SECTION */}
                <section className={styles.centerTableSection}>
                    <select className={styles.DropDownMenu} name="MealPlans" >
                        {apiResponse.data.map((plan) => (
                            <option key={plan.id} value={plan.name}>{plan.name}</option>
                        ))}
                    </select>
                    <DetailedMeals detailedMeals={apiResponse.data[activeMealPlan].detailedMeals}/>
                </section>

                {/* RIGHT PANEL */}
                <aside className={styles.rightSidebar}>
                    <div className={styles.panelTopStack}>
                        <div className={styles.outlineLabel}>Micro Distribution</div>
                        <p className="text-sm text-slate-500 mt-4 text-center border border-slate-700/30 border-dashed rounded-lg p-8">
                            Select a meal item from the meals table to see detailed micronutrients.
                        </p>
                    </div>
                </aside>
            </main>
        )
    }
}