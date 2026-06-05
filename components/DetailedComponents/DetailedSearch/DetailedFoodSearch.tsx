import {TextField} from "@mui/material";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import { ApiResponse, DetailedFoodDTO} from "@/Types/DetailedTypes";
import {fetchDetailedPost} from "@/Fetch/fetchDetailedPost";

interface IDetailedFoodSearch {
    setFoodFromSearch: (apiResponse: DetailedFoodDTO[]) => void;
}

export default function DetailedFoodSearch({setFoodFromSearch}: IDetailedFoodSearch) {
    const [search, setSearch] = useState<string>("");
    const { data: apiResponse, isLoading, error } = useQuery<ApiResponse<DetailedFoodDTO[]>>({
        queryKey: ["detailedFoodSearch", search],
        queryFn: async () => {
            const data = await fetchDetailedPost<ApiResponse<DetailedFoodDTO[]>, string>("/api/DetailedMealPlans/Search", search);
            if ( !data.isSuccess ) {
                throw data.errors[0]
            }
            return data;
        },
        enabled: search.length >= 3,
        retry: 0,
    })

    if ( apiResponse && apiResponse.data ) {
        setFoodFromSearch(apiResponse.data);
    }


    return (
            <TextField variant="standard" label="Search Foods" value={search} onChange={(e) => setSearch(e.target.value)}/>
    )
}