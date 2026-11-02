"use client";
import { QueriesOptions, QueryKey, queryOptions } from "@tanstack/react-query";
import { fetchDetailedGet } from "../DetailedFetch/DetailedGet";
import { BookDto } from "@/Types/BookTypes";
import { RecommendationsByNutrient } from "@/Types/DetailedTypes";



export function QueryOptions<T>(queryKey: QueryKey, url: string) { 
    return queryOptions({
        queryKey,
        queryFn: () => fetchDetailedGet<T>(url),
        retry: 0,
    })
}

export const booksQueryOptions = () => QueryOptions<BookDto[]>(["books"], "api/Books");
export const rdiQueryOptions = () => QueryOptions<RecommendationsByNutrient>(["nutrientRecommendations"], "api/Foods");