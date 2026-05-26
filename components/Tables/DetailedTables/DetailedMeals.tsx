import { ApiResponse, DetailedCompleteOverviewDTO } from "@/Types/DetailedTypes";



export default function DetailedMeals({apiResponse}: {apiResponse: ApiResponse<DetailedCompleteOverviewDTO[]>}) {

    if ( !apiResponse || !apiResponse.data) {
        return (
            <h1>No data found</h1>
        )
    }

    return (
        <div className="w-full overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm shadow-xl">
                <table className="w-full text-center border-collapse">
                    <thead className="border-b border-slate-700/60 bg-slate-800/60 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <tr>
                            <th className="px-6">Id</th> {/* Added an explicit narrow width helper for status */}
                            <th className="px-6 py-4 w-32">Status</th> {/* Added an explicit narrow width helper for status */}
                            <th className="px-6 py-4">MealPlan</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/40 text-sm text-slate-200">
                        {apiResponse.data.map((plan) => (
                            <tr key={plan.id} className="hover:bg-slate-700/20 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">
                                    {plan.id}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${apiResponse?.isSuccess ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                                        {apiResponse?.isSuccess ? "Success" : "Failed"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-white">
                                    {plan.name}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    )
}