import { DetailedMealComponentDTO, DetailedMealDTO,  DetailedFoodDTO} from "@/Types/DetailedTypes";
import {Button, TextField, Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreateIcon from '@mui/icons-material/Create';
import {useState} from "react";
import { useQueryClient } from "@tanstack/react-query";
import DetailedFoodSearch from "@/components/DetailedComponents/DetailedSearch/DetailedFoodSearch";

export default function DetailedMealComponents({detailedMealDTO}: {detailedMealDTO: DetailedMealDTO}) {
    const queryClient = useQueryClient(); // Used after adding food to a meal, to refetch the detailedOverviewDTO queryClient.refetchQueries({ queryKey: ["detailedOverview"] });
    const [isLockedIn, setIsLockedIn] = useState<boolean>(false)
    const [foodsToAdd, setFoodsToAdd] = useState<string[]>([]);
    const [foodFromSearch, setFoodFromSearch] = useState<DetailedFoodDTO[]>([]);
    if ( !detailedMealDTO) { return ( <h1>No data found</h1> ) }

    function toggleFoodToAdd(id: string) {
        if ( foodsToAdd.includes(id)) {
            var idRemoved = foodsToAdd.filter(foodsId => foodsId !== id);
            setFoodsToAdd(idRemoved);
        }
        else {
            setFoodsToAdd([...foodsToAdd, id]);
        }
    }



    return (
        <div className="w-full overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm shadow-xl gap-2">
                <table className="w-full text-center border-collapse">
                    <thead className="border-b border-slate-700/60 bg-slate-800/60 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <tr>
                            <th className="px-6">Name</th>
                            <th className="px-6 py-4 w-32">Grams</th>
                            <th className="px-6 py-4 w-32">Calories</th>
                            <th className="px-6 py-4">Protein</th>
                            <th className="px-6 py-4">Carbs</th>
                            <th className="px-6 py-4">Fat</th>
                            <th className="px-6 py-4">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/40 text-sm text-slate-200">
                        {detailedMealDTO.components.map((component: DetailedMealComponentDTO) => (
                            <tr key={component.id} className="hover:bg-slate-700/20 transition-colors ">
                                <td className="px-6 py-4 font-medium text-white">
                                    {component.detailedFood.foodName}
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    {`${component.quantity}g`}
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
                                    <Button variant="outlined" color="error" onClick={() => console.log(component.id)}>
                                        <DeleteIcon />
                                    </Button>
                                </td>
                            </tr>
                        ))}

                        {/* Add new food section */}
                        {/* Search should fill in a table with the results */}
                        {/* Should be able to alter the quantity of the food item in the table before adding */}
                        {/* Should be able to lock in a foodItem in the new table, so i can continue to search for others, before adding them all */}
                        {/* Should see calories, macro nutrients and maybe certain micronutrients in the row? */}
                        <tr key={"SearchFoodRow"} className="hover:bg-slate-700/20 transition-colors split-between">
                            <td className="px-6 py-4 font-medium text-white">
                                <Tooltip title="seperate each word with a space to narrow down search">
                                    <DetailedFoodSearch setFoodFromSearch={setFoodFromSearch}/>
                                </Tooltip>
                            </td>
                        </tr>
                        <tr>
                            <th className="px-6">Name</th>
                            <th className="px-6 py-4 w-32">Grams</th>
                            <th className="px-6 py-4 w-32">Calories</th>
                            <th className="px-6 py-4">Protein</th>
                            <th className="px-6 py-4">Carbs</th>
                            <th className="px-6 py-4">Fat</th>
                            <th className="px-6 py-4">Accept?</th>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 font-medium text-white">
                                Havregryn
                            </td>
                            <td className="">
                                <div className="flex items-center justify-center gap-1 mx-auto pl-3 pr-3">
                                    <TextField variant="standard" type="number" defaultValue={1000} size="small"/>
                                    <CreateIcon className="text-emerald-300" fontSize="inherit" />
                                </div>
                            </td>
                            <td className="font-semibold text-emerald-300 tabular-nums">
                                360
                            </td>
                            <td className="font-semibold text-emerald-300 tabular-nums">
                                11
                            </td>
                            <td className="font-semibold text-emerald-300 tabular-nums">
                                60
                            </td>
                            <td className="font-semibold text-emerald-300 tabular-nums">
                                6
                            </td>
                            <td className="font-semibold text-emerald-300 tabular-nums">
                                <Tooltip title="Accepted items will be added in bulk">
                                    <Button variant="text" color={isLockedIn ? "success" : "primary"} onClick={() => setIsLockedIn(!isLockedIn)}>
                                        <CheckCircleIcon />
                                    </Button>
                                </Tooltip>
                            </td>
                        </tr>
                        {foodFromSearch.map((food: DetailedFoodDTO) => (
                            <tr key={food.id} className="hover:bg-slate-700/20 transition-colors ">
                                <td className="px-6 py-4 font-medium text-white">
                                    {food.foodName}
                                </td>
                                <td>
                                    <div className="flex items-center justify-center gap-1 mx-auto pl-3 pr-3">
                                        <TextField variant="standard" type="number" defaultValue={food.calories} size="small"/>
                                        <CreateIcon className="text-emerald-300" fontSize="inherit" />
                                    </div>
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    {food.calories}
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    {food.constituents.find(nut => nut.nutrientId === "Protein")?.quantity ?? 0}
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    {food.constituents.find(nut => nut.nutrientId === "Karbo")?.quantity ?? 0}
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    {food.constituents.find(nut => nut.nutrientId === "Fett")?.quantity ?? 0}
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    <Button variant="text" color={foodsToAdd.includes(food.id.toString()) ? "success" : "primary"} onClick={() => toggleFoodToAdd(food.id.toString())}>
                                        <CheckCircleIcon />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    )
}