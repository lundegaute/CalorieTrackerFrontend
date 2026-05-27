import { DetailedMealDTO } from "@/Types/DetailedTypes";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DetailedMeals({detailedMeals}: {detailedMeals: DetailedMealDTO[]}) {

    if ( !detailedMeals) {
        return (
            <h1>No data found</h1>
        )
    }

    return (
        <div className="w-full overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm shadow-xl">
                <table className="w-full text-center border-collapse">
                    <thead className="border-b border-slate-700/60 bg-slate-800/60 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <tr>
                            <th className="px-6">MealName</th> {/* Added an explicit narrow width helper for status */}
                            <th className="px-6 py-4 w-32">Calories</th> {/* Added an explicit narrow width helper for status */}
                            <th className="px-6 py-4">Protein</th>
                            <th className="px-6 py-4">Carbs</th>
                            <th className="px-6 py-4">Fat</th>
                            <th className="px-6 py-4">Details</th>
                            <th className="px-6 py-4">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/40 text-sm text-slate-200">
                        {detailedMeals.map((meal: DetailedMealDTO) => (
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
                                    <Button variant="contained" >Details</Button>
                                </td>
                                <td className="font-semibold text-emerald-300 tabular-nums">
                                    <Button variant="outlined" color="error">
                                        <DeleteIcon />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    )
}