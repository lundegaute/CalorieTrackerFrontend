"use client";
import { BaseGrid } from '@/components/DataGrids/BaseGrid';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import { BookDto } from '@/Types/BookTypes';
import styles from "./BookGrid.module.css";

export default function BookGrid() {

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mai",
        "Juni",
        "JulI",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Des"
    ]

    const columns: GridColDef<BookDto>[] = [
        {
            field: 'title',
            type: 'string', // 'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'singleSelect'
            headerName: 'Title',
            width: 300,                               
            colSpan: 1,
            //flex: 1, // Auto-fill available space
            //editable: true,                             // Enable cell editing
            sortable: true, // Enable column sorting
            filterable: true, // Enable column filtering
            hideable: true, // Allow hiding via column menu
            //align: 'left',                              // 'left' | 'center' | 'right'
            //headerAlign: 'left',                        // Header alignment
            /* valueGetter: (value, row) => row.title,
            renderCell: (params) => (                   // Custom JSX rendering (e.g. badges, links)
              <strong>{params.value}</strong>
            ) */
        },
        {
            field: 'author',
            type: 'string',
            headerName: 'Author',
            width: 150,
            valueGetter: (value, row) =>
                `${row.author.firstName} ${row.author.lastName}`,
        },
        {
            field: 'genre',
            type: 'string',
            headerName: 'Genre',
            valueGetter: (value, row) => {
                return row.genre.name;
            },
            width: 150,
        },
        {
            field: 'series',
            type: 'string',
            headerName: 'Series',
            width: 250,
        },
        {
            field: 'pages',
            type: 'number',
            headerName: 'Pages',
            width: 100,
        },
        {
            field: 'startedReading',
            type: 'string',
            headerName: 'Started reading',
            valueGetter: (value, row) => {
                const date = new Date(value);
                return `${date.getFullYear()}-${months[date.getMonth()]}-${date.getDay() + 1}`;
            },
            width: 150,
        },
        {
            field: 'endedReading',
            type: 'string',
            headerName: 'Finished Reading',
            valueGetter: (value, row) => {
                const date = new Date(value);
                return `${date.getFullYear()}-${months[date.getMonth()]}-${date.getDay() + 1}`;
            },
            width: 150,
        },
        {
            field: 'releaseYear',
            type: 'number',
            headerName: 'Release Year',
            width: 150
        },
    ];

    const rows: BookDto[] = [
        {
            id: 1,
            title: 'Dune',
            author: {
                firstName: 'Frank',
                lastName: 'Herbert',
                birth: '1920-10-08',
                webUrl: 'https://en.wikipedia.org/wiki/Frank_Herbert',
            },
            genre: {
                name: 'Science Fiction',
            },
            series: 'Dune Chronicles',
            pages: 412,
            startedReading: '2026-01-10T00:00:00Z',
            endedReading: '2026-01-28T00:00:00Z',
            releaseYear: 1965,
        },
        {
            id: 2,
            title: 'The Fellowship of the Ring',
            author: {
                firstName: 'J.R.R.',
                lastName: 'Tolkien',
                birth: '1892-01-03',
                webUrl: 'https://en.wikipedia.org/wiki/J._R._R._Tolkien',
            },
            genre: {
                name: 'Fantasy',
            },
            series: 'The Lord of the Rings',
            pages: 423,
            startedReading: '2026-02-01T00:00:00Z',
            endedReading: '2026-02-20T00:00:00Z',
            releaseYear: 1954,
        },
        {
            id: 3,
            title: 'Project Hail Mary',
            author: {
                firstName: 'Andy',
                lastName: 'Weir',
                birth: '1972-06-16',
                webUrl: 'https://en.wikipedia.org/wiki/Andy_Weir',
            },
            genre: {
                name: 'Science Fiction',
            },
            series: null,
            pages: 496,
            startedReading: '2026-03-05T00:00:00Z',
            endedReading: null, // Currently reading
            releaseYear: 2021,
        },
        {
            id: 4,
            title: 'The Hobbit',
            author: {
                firstName: 'J.R.R.',
                lastName: 'Tolkien',
                birth: '1892-01-03',
                webUrl: 'https://en.wikipedia.org/wiki/J._R._R._Tolkien',
            },
            genre: {
                name: 'Fantasy',
            },
            series: 'Middle-earth',
            pages: 310,
            startedReading: null,
            endedReading: null,
            releaseYear: 1937,
        },
        {
            id: 5,
            title: 'Neuromancer',
            author: {
                firstName: 'William',
                lastName: 'Gibson',
                birth: '1948-03-17',
                webUrl: 'https://en.wikipedia.org/wiki/William_Gibson',
            },
            genre: {
                name: 'Cyberpunk',
            },
            series: 'Sprawl Trilogy',
            pages: 271,
            startedReading: '2026-04-01T00:00:00Z',
            endedReading: '2026-04-12T00:00:00Z',
            releaseYear: 1984,
        },
    ];

    const getRowClassName = (param: GridRowParams<BookDto>) => {
        if (param.row.series === "Dune Chronicles")
            return styles.rowDune;
        if (param.row.series === "The Lord of the Rings" )
            return styles.rowLotr
        if (param.row.series === "Malazan Book of the Fallen" )
            return styles.rowMalazan
        if (param.row.series === "Middle-earth")
            return styles.rowMiddleEarth
        if (param.row.series === "Lightbringer")
            return styles.rowLightbringer
        if (param.row.series === "The First Law")
            return styles.rowTheFirstLaw
        if (param.row.series === "Remembrance of Earths Past")
            return styles.rowRemembranceOfEarthsPast
        return styles.rowDefault;
    }

    return (
        <div className={styles.gridContainer}>
            <BaseGrid columns={columns} rows={rows} getRowClassName={getRowClassName} />
        </div>
    )
}
