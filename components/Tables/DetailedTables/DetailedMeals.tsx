import { DetailedMealDTO } from "@/Types/DetailedTypes";
import {Button, Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface params {
    detailedMealDTO: DetailedMealDTO[];
    setSelectedMealId: (value: number) => void
}

export default function DetailedMeals({detailedMealDTO, setSelectedMealId}: params) {

    if ( !detailedMealDTO) {
        return (
            <h1>No data found</h1>
        )
    }

    return (
        <div className="w-full overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm shadow-xl">
                <table className="w-full text-center border-collapse">
                    <thead className="border-b border-slate-700/60 bg-slate-800/60 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <tr>
                            <th className="px-6">MealName</th>
                            <th className="px-6 py-4 w-32">Calories</th>
                            <th className="px-6 py-4">Protein</th>
                            <th className="px-6 py-4">Carbs</th>
                            <th className="px-6 py-4">Fat</th>
                            <th className="px-6 py-4">Details</th>
                            <th className="px-6 py-4">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/40 text-sm text-slate-200">
                        {detailedMealDTO.map((meal: DetailedMealDTO) => (
                            <tr key={meal.id} className="hover:bg-slate-700/20 transition-colors ">
                                <td className="px-6 py-4 font-medium text-white">
                                    {meal.name}
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    {meal.totalCalories}
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    {meal.totalProtein}
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    {meal.totalCarbs}
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    {meal.totalFats}
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    <Button variant="contained" onClick={() => setSelectedMealId(meal.id)}>Details</Button>
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    <Button variant="outlined" color="error" onClick={() => console.log(meal.id)}>
                                        <DeleteIcon />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                            <tr key="AddNewMeal" className="hover:bg-slate-700/20 transition-colors">
                                <td className="py-2">
                                    {/* Add new meal to mealPlan - Functionality not yet implemented */}
                                    {/* Add new meal to mealPlan - Functionality not yet implemented */}
                                    {/* Add new meal to mealPlan - Functionality not yet implemented */}
                                    {/* Add new meal to mealPlan - Functionality not yet implemented */}
                                    <Tooltip title="Add new Meal">
                                        <Button variant="contained" color="success" className=""><AddIcon fontSize="small"/></Button>
                                    </Tooltip>
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>
    )
}