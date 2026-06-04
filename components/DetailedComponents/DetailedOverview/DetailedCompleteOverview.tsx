"use client";
import DetailedMealComponents from "@/components/Tables/DetailedTables/DetailedMealComponents";
import {DetailedPlanSummary} from "@/components/DetailedComponents/DetailedMealPlan/PlanSummary";
import SimpleDropdownMenu from "@/components/StandardHtml/DropDownMenues/SimpleDropdownMenu";
import { ApiResponse, DetailedCompleteOverviewDTO, DetailedMealDTO, NutrientCategories } from "@/Types/DetailedTypes";
import DetailedMeals from "@/components/Tables/DetailedTables/DetailedMeals";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MacroBarChart from "@/components/Charts/BarCharts/MacroBarChart";
import MicroAnalyticsCharts from "@/components/Charts/BarCharts/MicroAnalyticsChart";
import MacroPieChart from "@/components/Charts/PieCharts/MacroPieChart";
import styles from "./DetailedCompleteOverview.module.css";
import CheckToken from "@/HelperFunctions/checkToken";
import {useQuery} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {useState, useEffect } from "react";
import Button from '@mui/material/Button';

export default function DetailedCompleteOverview() {
    const router = useRouter();
    const [activeMealPlanId, setActiveMealPlanId] = useState<number | null>(null); // This is important to tell which mealPlan to show
    const [selectedMealId, setSelectedMealId] = useState<number | null>(null); // When clicking on details, selectedMealId is needed to decide which meal to show


    const {data: apiResponse, isLoading, error} = useQuery<ApiResponse<DetailedCompleteOverviewDTO[]>>({
        queryKey: ["detailedOverview"],
        queryFn: async () => {
            const res = await fetch("api/DetailedMealPlans", {
                method: "GET",
                credentials: "include"
            });
            if ( res.status === 401) {
                const authStatus: ApiResponse = await res.json();
                alert("Login required");
                router.push("/Auth/Login");
                throw new Error(authStatus.errors[0]);
            }
            if (!res.ok) {
                throw new Error(`Server Error! Status: ${res.status}`)
            }
            const data: ApiResponse<DetailedCompleteOverviewDTO[]> = await res.json();
            return data;
        },
        retry: 0
    });

    useEffect(() => {
        if ( apiResponse?.data?.[0] ){
            setActiveMealPlanId(apiResponse.data[0].id);
        }
    },[apiResponse])
    
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
    const activePlan = apiResponse.data.find(plan => plan.id === activeMealPlanId);
    const currentMeal = activePlan?.detailedMeals.find(meal => meal.id === selectedMealId)?.name ?? "Måltid";
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
                            <div className="flex items-center gap-2">
                                <Button variant="text" onClick={() => setSelectedMealId(null)}>
                                    <KeyboardBackspaceIcon />
                                </Button>
                                <h1 className="text-emerald-300 font-semibold">{currentMeal}</h1>
                            </div>
                            :
                            <SimpleDropdownMenu dataSource={apiResponse.data} setActiveMealPlanId={setActiveMealPlanId} activeMealPlanId={activeMealPlanId}/>
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

                {/* Micro Nutrient Chart section */}
                <section className={styles.analyticsGridSection}>
                    <div className={styles.analyticsGridSection} >
                        <MicroAnalyticsCharts activePlan={activePlan} selectedMealId={selectedMealId} category={NutrientCategories.WaterSoluble} label=""/>
                        <MicroAnalyticsCharts activePlan={activePlan} selectedMealId={selectedMealId} category={NutrientCategories.FatSoluble} label=""/>
                        <MicroAnalyticsCharts activePlan={activePlan} selectedMealId={selectedMealId} category={NutrientCategories.TraceMineral} label=""/>
                        <MicroAnalyticsCharts activePlan={activePlan} selectedMealId={selectedMealId} category={NutrientCategories.LipidProfile} label=""/>
                           
                    </div>
                </section>
            </main>
        )
    }
}