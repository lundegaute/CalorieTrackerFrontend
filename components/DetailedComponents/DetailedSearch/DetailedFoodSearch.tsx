import {TextField} from "@mui/material";
import {useState, useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import { ApiResponse, DetailedFoodDTO} from "@/Types/DetailedTypes";
import {fetchDetailedPost} from "@/Fetch/fetchDetailedPost";

interface IDetailedFoodSearch {
    setFoodFromSearch: (data: DetailedFoodDTO[]) => void;
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

    useEffect(() => {
        if ( search.length < 3 ) {
            setFoodFromSearch([]);
        }
    }, [search, setFoodFromSearch ]);

    useEffect(() => {
        if ( !isLoading && apiResponse && apiResponse.data ){
            setFoodFromSearch(apiResponse.data)
        }
    }, [apiResponse, isLoading, setFoodFromSearch])

    return (
            <TextField  variant="standard" label="Search Foods" value={search} onChange={(e) => setSearch(e.target.value)}/>
    )
}