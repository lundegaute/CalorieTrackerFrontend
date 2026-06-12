import { DetailedMealComponentDTO, DetailedMealDTO,  DetailedFoodDTO} from "@/Types/DetailedTypes";
import DetailedFoodSearch from "@/components/DetailedComponents/DetailedSearch/DetailedFoodSearch";
import { DetailedMealComponentRequest } from "@/Types/DetailedRequests";
import AddFoodRow from "@/components/Tables/DetailedTables/AddFoodRow";
import { DetailedDelete } from "@/Fetch/DetailedFetch/DetailedDelete";
import {Button, TextField, Tooltip} from '@mui/material';
import styles from "./DetailedMealComponent.module.css";
import { useQueryClient } from "@tanstack/react-query";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import { fetchDetailedPost } from "@/Fetch/fetchDetailedPost";


export default function DetailedMealComponents({detailedMealDTO}: {detailedMealDTO: DetailedMealDTO}) {
    const queryClient = useQueryClient(); // Used after adding food to a meal, to refetch the detailedOverviewDTO queryClient.refetchQueries({ queryKey: ["detailedOverview"] });
    const [isLockedIn, setIsLockedIn] = useState<boolean>(false)
    const [foodsToAdd, setFoodsToAdd] = useState<DetailedMealComponentRequest[]>([]);
    const [foodFromSearch, setFoodFromSearch] = useState<DetailedFoodDTO[]>([]);
    if ( !detailedMealDTO) { return ( <h1>No data found</h1> ) }

    function toggleFoodToAdd(newFood: DetailedFoodDTO, quantity: number) {
        if ( foodsToAdd.find( food => food.detailedFoodId == newFood.id)) {
            var idRemoved = foodsToAdd.filter(food => food.detailedFoodId !== newFood.id);
            setFoodsToAdd(idRemoved);
        }
        else {
            const newFoodToAdd: DetailedMealComponentRequest = {
                detailedFoodId: newFood.id,
                quantity: quantity,
                detailedMealId: detailedMealDTO.id,
            };
            setFoodsToAdd([...foodsToAdd, newFoodToAdd]);
        }
        console.log(foodsToAdd)
    }

    const addNewMealComponent = async (foodsToAdd: DetailedMealComponentRequest[]) => {
        // the function underneath should be invoked with foodsToAdd, to add new mealComponents
        // A new method in the backend is needed to add a list of components at once
        // fetchDetailedPost
    }


    return (
        <div className={styles.tableContainer}>
            <div className={detailedMealDTO.components.length > 5 ? styles.scrollContainer : ""}>
                <table className={styles.mainTable}>
                    <thead className={styles.tableHeader}>
                        <tr>
                            <th className="px-6 w-64">Name</th>
                            <th className="px-6 py-4 w-32">Grams</th>
                            <th className="px-6 py-4 w-32">Calories</th>
                            <th className="px-6 py-4 w-32">Protein</th>
                            <th className="px-6 py-4 w-32">Carbs</th>
                            <th className="px-6 py-4 w-32">Fat</th>
                            <th className="px-6 py-4 w-32">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/40 text-sm text-slate-200">
                        {detailedMealDTO.components.map((component: DetailedMealComponentDTO) => (
                            <tr key={component.id} className="hover:bg-slate-700/20 transition-colors ">
                                <td className="px-6 py-4 font-medium text-white">
                                    {component.detailedFood.foodName}
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    <div className="flex items-center justify-center gap-1 mx-auto pl-3 pr-3">
                                        <TextField variant="standard" type="number" defaultValue={component.quantity} size="small"/>
                                        <CreateIcon className="text-emerald-300" fontSize="inherit" />
                                    </div>
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    {component.totalCalories}
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    {component.totalProtein}
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    {component.totalCarbs}
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    {component.totalFats}
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    <Button 
                                        variant="outlined" 
                                        color="error" 
                                        onClick={() => DetailedDelete("/api/DetailedMealComponents", component.id)
                                            .then(() => queryClient.invalidateQueries({queryKey:["detailedOverview"]}))
                                        }>
                                        <DeleteIcon />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 border-t border-b border-slate-700/40 bg-slate-800/20">
                <div className="w-64"> {/* Wraps search box safely outside the column matrix limits */}
                    <DetailedFoodSearch setFoodFromSearch={setFoodFromSearch}/>
                </div>
            </div>
                { foodFromSearch.length > 0 && (
                    <div className={foodFromSearch.length > 5 ? styles.scrollContainer : ""}>
                        <table className={styles.mainTable}>
                            <thead className={styles.tableHeader}>
                                <tr>
                                    <th className="px-6 w-64">Name</th>
                                    <th className="px-6 py-4 w-32">Grams</th>
                                    <th className="px-6 py-4 w-32">Calories</th>
                                    <th className="px-6 py-4 w-32">Protein</th>
                                    <th className="px-6 py-4 w-32">Carbs</th>
                                    <th className="px-6 py-4 w-32">Fat</th>
                                    <th className="px-6 py-4 w-32">Add Food</th>
                                </tr>
                            </ thead>
                            <tbody className="divide-y divide-slate-700/40 text-sm text-slate-200">
                                { foodFromSearch.map((food: DetailedFoodDTO) => (
                                    <AddFoodRow 
                                        key={food.id}
                                        food={food}
                                        toggleFoodToAdd={toggleFoodToAdd}
                                        foodsToAdd={foodsToAdd}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>    
                )}
        </div>
    )
}