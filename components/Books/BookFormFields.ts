import { AddBookRequest, FieldConfig } from "@/Types/BookTypes";


export const bookFormFields: FieldConfig<AddBookRequest>[] = [
        {name: 'title', label: "Title", type: "string", required: true},
        {name: 'series', label: "Series", type: "string"},
        {name: 'pages', label: "Pages", type: "number"},
        {name: 'startedReading', label: "Started reading", type: "date"},
        {name: "releaseYear", label: "Release year", type: "number"}
    ]