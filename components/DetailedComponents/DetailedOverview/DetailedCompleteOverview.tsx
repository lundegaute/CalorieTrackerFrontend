"use client";
import styles from "./DetailedCompleteOverview.module.css";
import {useQuery} from "@tanstack/react-query";
import {useState } from "react";
import { ApiResponse, DetailedCompleteOverviewDTO } from "@/Types/DetailedTypes";
import DetailedMeals from "@/components/Tables/DetailedTables/DetailedMeals";
import DetailedMealComponents from "@/components/Tables/DetailedTables/DetailedMealComponents";
import {DetailedPlanSummary} from "@/components/DetailedComponents/DetailedMealPlan/PlanSummary";
import SimpleDropdownMenu from "@/components/StandardHtml/DropDownMenues/SimpleDropdownMenu";
import MacroBarChart from "@/components/Charts/BarCharts/MacroBarChart";
import MacroPieChart from "@/components/Charts/PieCharts/MacroPieChart";
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function DetailedCompleteOverview() {
    const [selectedMealId, setSelectedMealId] = useState<number | null>(null)
    const [activeMealPlan, setActiveMealPlan] = useState<number>(1)
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

    // ---------------------- USE ACTIVEPLAN FOR DATA ----------------------
    const activePlan = apiResponse.data.find(plan => plan.id === activeMealPlan);
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
                        { selectedMealId ? 
                            <DetailedPlanSummary dataSource={activePlan.detailedMeals.find(meal => meal.id === selectedMealId)!}/> 
                            :
                            <DetailedPlanSummary dataSource={activePlan}/> 
                        }
                    </div>
                </aside>
                {/* CENTER SECTION */}
                <section className={styles.centerTableSection}>
                    <div className="flex gap-2">
                        { selectedMealId ? 
                            <Button variant="text" onClick={() => setSelectedMealId(null)}>
                                <KeyboardBackspaceIcon />
                            </Button>
                            :
                            <SimpleDropdownMenu dataSource={apiResponse.data} setValue={setActiveMealPlan}/>
                        }
                    </div>
                    { selectedMealId ? 
                        <DetailedMealComponents detailedMealDTO={activePlan.detailedMeals.find(meal => meal.id === selectedMealId)!}/>
                        :
                        <DetailedMeals detailedMealDTO={activePlan.detailedMeals} setSelectedMealId={setSelectedMealId}/>
                    }
                </section>
                {/* RIGHT PANEL */}
                <aside className={styles.rightSidebar}>
                    <div className={styles.panelTopStack}>
                        <div className={styles.outlineLabel}>Micro Distribution</div>
                        {/* <MacroBarChart dataSource={activePlan}/> */}
                        { selectedMealId ? 
                            <MacroPieChart overviewDTO={activePlan.detailedMeals.find(meal => meal.id === selectedMealId)!} />
                            :
                            <MacroPieChart overviewDTO={activePlan} />
                        }
                    </div>
                </aside>
            </main>
        )
    }
}