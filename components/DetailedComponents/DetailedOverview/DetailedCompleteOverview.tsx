"use client";
import DetailedMealComponents from "@/components/Tables/DetailedTables/DetailedMealComponents";
import {DetailedPlanSummary} from "@/components/DetailedComponents/DetailedMealPlan/PlanSummary";
import SimpleDropdownMenu from "@/components/StandardHtml/DropDownMenues/SimpleDropdownMenu";
import { ApiResponse, DetailedCompleteOverviewDTO, DetailedMealDTO, NutrientCategories } from "@/Types/DetailedTypes";
import { DetailedMealPlanRequest } from "@/Types/DetailedRequests";
import DetailedMeals from "@/components/Tables/DetailedTables/DetailedMeals";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DeleteIcon from '@mui/icons-material/Delete';
import MicroAnalyticsCharts from "@/components/Charts/BarCharts/MicroAnalyticsChart";
import MacroPieChart from "@/components/Charts/PieCharts/MacroPieChart";
import styles from "./DetailedCompleteOverview.module.css";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {useState, useEffect } from "react";
import {Button, Tooltip} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { SweetAlertSingleInput } from "@/components/SweetAlert/DetailedSweetAlert/OneInputForm";
import { DetailedDelete } from "@/Fetch/DetailedFetch/DetailedDelete";


export default function DetailedCompleteOverview() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const [activeMealPlanId, setActiveMealPlanId] = useState<number | null>(null); // This is important to tell which mealPlan to show
    const [selectedMealId, setSelectedMealId] = useState<number | null>(null); // When clicking on details, selectedMealId is needed to decide which meal to show

    const addNewMealPlan = async () => {
        const result = await SweetAlertSingleInput<number>("Create your first MealPlan", "");
        if ( result?.isSuccess ) {
            await queryClient.refetchQueries({queryKey: ["detailedOverview"]});
            setActiveMealPlanId(result.data);
        }
    }
    // ---------------------------------------------
    // ------------- Api CRUD Section --------------
    
    
    // ---------------------------------------------
    // ---------------------------------------------

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
            setActiveMealPlanId( activeMealPlanId ?? apiResponse.data[0].id);
        }
    },[apiResponse])

    useEffect(() => {
        if (apiResponse && apiResponse.data && apiResponse.data.length > 0) {
            const planExists = apiResponse.data.some(item => item.id == activeMealPlanId);
            if ( !planExists ) {
                setActiveMealPlanId(apiResponse.data[0].id);
            }
        } else {
            setActiveMealPlanId(null);
        }


    }, [apiResponse, activeMealPlanId])
    
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
    const hasPlans = apiResponse.data.length > 0;
    const activePlan = apiResponse.data.find(plan => plan.id === activeMealPlanId);
    const currentMeal = activePlan?.detailedMeals.find(meal => meal.id === selectedMealId)?.name ?? "Måltid";
    
    
    if (apiResponse && apiResponse.data) {
        return (
            <main className={styles.gridMatrix}>
                {/* 2.1 LEFT PANEL */}
                <aside className={styles.leftSidebar}>
                    <div className={styles.leftComponents}>
                    <div className={styles.outlineLabel}>Total Calories:</div>
                        { hasPlans && activePlan ? (
                            selectedMealId ? (
                                <DetailedPlanSummary dataSource={activePlan.detailedMeals.find(meal => meal.id === selectedMealId)!}/>
                            ) : (
                                <DetailedPlanSummary dataSource={activePlan}/> 
                            )
                        ) : (
                            <div className="text-slate-500 text-sm italic p-4 text-center">Ingen kaloridata tilgjengelig</div>
                        )}    
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
                            <div className="flex items-center gap-2">
                                { hasPlans && activePlan ? (
                                    <div>
                                        <SimpleDropdownMenu dataSource={apiResponse.data} setActiveMealPlanId={setActiveMealPlanId} activeMealPlanId={activeMealPlanId}/>
                                        <Tooltip title="Add new mealplan">
                                            <Button onClick={ async () => {
                                                const apiResponse: ApiResponse<number> | void = await SweetAlertSingleInput<number>("Add new MealPlan", "")
                                                if ( apiResponse && apiResponse.data ) {
                                                    await queryClient.invalidateQueries({queryKey:["detailedOverview"]})
                                                    setActiveMealPlanId(apiResponse.data)
                                                }
                                            }
                                            }> <AddIcon /> 
                                            </Button>
                                        </Tooltip>
                                    </div>
                                ) : (
                                    <Tooltip title="Add new mealplan">
                                        <Button variant="contained" onClick={addNewMealPlan}>
                                            <AddIcon /> Click me
                                        </Button>
                                    </Tooltip>
                                )}
                                { hasPlans && activePlan ? (
                                    <Tooltip title="Delete Current MealPlan">
                                        <Button 
                                            variant="outlined" 
                                            color="error"
                                            size="small"
                                            disabled={apiResponse.data.length === 0}
                                            onClick={() => DetailedDelete("/api/DetailedMealPlans", activePlan.id)
                                                .then( async () => {
                                                    await queryClient.refetchQueries({queryKey:["detailedOverview"]})

                                                    if ( apiResponse && apiResponse.data && apiResponse.data.length > 0)
                                                        setActiveMealPlanId(apiResponse.data.find(item => item.id !== activePlan.id)!.id)
                                                })
                                            }>
                                            <DeleteIcon />
                                        </Button>
                                    </Tooltip>
                                ) : (
                                    <div className="text-500 text-sm italic p-4 text-center"></div>
                                )}
                            </div>
                        }
                    </div>
                    { hasPlans && activePlan ? (
                        selectedMealId ? 
                            <DetailedMealComponents detailedMealDTO={activePlan.detailedMeals.find(meal => meal.id === selectedMealId)!}/>
                            :
                            <DetailedMeals detailedMealDTO={activePlan.detailedMeals} setSelectedMealId={setSelectedMealId} activeMealPlanId={activePlan.id}/>    
                    ) : (
                        <div className="text-slate-500 text-sm italic p-4 text-center">Ingen kaloridata tilgjengelig</div>
                    )}
                </section>
                {/* RIGHT PANEL */}
                <aside className={styles.rightSidebar}>
                    <div className={styles.panelTopStack}>
                        <div className={styles.outlineLabel}>Micro Distribution</div>
                        {/* <MacroBarChart dataSource={activePlan}/> */}
                        { hasPlans && activePlan ? (
                            selectedMealId ? (
                                <MacroPieChart overviewDTO={activePlan.detailedMeals.find(meal => meal.id === selectedMealId)!} />
                            ) : (
                                <MacroPieChart overviewDTO={activePlan} />
                            )
                        ) : (
                            <div className="text-slate-500 text-sm italic p-4 text-center">Ingen kaloridata tilgjengelig</div>
                        )}
                    </div>
                </aside>
                {/* Micro Nutrient Chart section */}
                { hasPlans && activePlan ? (
                    activePlan.microSummary && Object.keys(activePlan.microSummary).length > 0 &&(
                        <section className={styles.analyticsGridSection}>
                            <div className={styles.analyticsGridSection}>
                                <MicroAnalyticsCharts activePlan={activePlan} selectedMealId={selectedMealId} category={NutrientCategories.WaterSoluble}/>
                                <MicroAnalyticsCharts activePlan={activePlan} selectedMealId={selectedMealId} category={NutrientCategories.MacroMineral}/>
                                <MicroAnalyticsCharts activePlan={activePlan} selectedMealId={selectedMealId} category={NutrientCategories.TraceMineral}/>
                                <MicroAnalyticsCharts activePlan={activePlan} selectedMealId={selectedMealId} category={NutrientCategories.FatSoluble}/>
                                <MicroAnalyticsCharts activePlan={activePlan} selectedMealId={selectedMealId} category={NutrientCategories.LipidProfile}/>
                                <MicroAnalyticsCharts activePlan={activePlan} selectedMealId={selectedMealId} category={NutrientCategories.CarbProfile}/>
                                
                            </div>
                        </section>
                    )
                ) : (
                    <p>No data</p>
                )}
            </main>
        )
    }
    
}


