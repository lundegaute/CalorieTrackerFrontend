'use client';
import { BaseGrid } from '@/components/DataGrids/BaseGrid';
import { GridColDef, GridRow, GridRowProps } from '@mui/x-data-grid';
import { BookDto } from '@/Types/BookTypes';
import styles from './BookGrid.module.css';
import { useState } from 'react';
import { ColorCell } from './ColorCell';
import {Books} from "./BooksMockData";

export default function BookGrid() {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Mai',
        'Juni',
        'JulI',
        'Aug',
        'Sep',
        'Okt',
        'Nov',
        'Des',
    ];
    const [rows, setRows] = useState<BookDto[]>(Books) 

    // UseQuery to get Books data here

    const saveColorChange = (hex: string, rowId: number) => {
        const book = rows.find(x => x.id === rowId);
        setRows((prev) => {
            const newRows = prev.map((row) => {
                return row.series === book?.series ? {...row, color: hex} : row;
            });
            return newRows;
        });
    }

    const GetTextColor = (hex: string): string => {
        hex = hex.replace("#", "");
        const r = parseInt(hex.slice(0,2), 16);
        const g = parseInt(hex.slice(2,4), 16);
        const b = parseInt(hex.slice(4,6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 150 ? '#111111' : '#ffffff';
    }

    const CustomizeRow = (props: GridRowProps) => {
        const row = props.row as BookDto;
        return (
            <GridRow 
                {...props}
                style={{
                    ...styles,
                    backgroundColor: row.color,
                    color: GetTextColor(row.color),
                }}
            />
        )
    }


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
            type: 'string',
            headerName: 'Release Year',
            width: 150,
        },
        {
            field: "color",
            headerName: "Color",
            renderCell: (params) => (
                <ColorCell value={params.value ? params.value : "#ffffff"} rowId={params.row.id} onSave={saveColorChange}/>
            ),
            width: 120,
        }
    ];
    return (
        <div className={styles.gridContainer}>
            <BaseGrid
                columns={columns}
                rows={rows}
                slots={{ row: CustomizeRow}}
                sx={{
                    '& .MuiDataGrid-row:hover': { filter: 'brightness(1.2)' }
                }}
            />
        </div>
    );
}
