'use client';
import styles from './BookGrid.module.css';
import { useEffect, useState } from 'react';
import { GridColDef, GridRow, GridRowProps } from '@mui/x-data-grid';
import { BaseGrid } from '@/components/DataGrids/BaseGrid';
import { BookDto, UpdateBookRequest } from '@/Types/BookTypes';
import { ColorPicker } from './ColorCell';
import { Books } from './BooksMockData';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { fetchDetailedGet } from '@/Fetch/DetailedFetch/DetailedGet';
import { CircularProgress } from '@mui/material';
import { useAuthStore } from '../Zustand/AuthStore';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '../UI/PageLoadingProvider';
import { fetchDetailedPost } from '@/Fetch/fetchDetailedPost';

export default function BookGrid() {
    const isInitialized = useAuthStore(s => s.isInitialized);
    const user = useAuthStore(s => s.user);
    const router = useRouter();
    const queryClient = useQueryClient();
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
    const [rows, setRows] = useState<BookDto[]>(Books);

    useEffect(() => {
        console.log(isInitialized);
        console.log(user);
        if (isInitialized && !user)
            router.replace("/Auth/Login");
    }, [isInitialized, user])

    // UseQuery to get Books data here
    const { data: books, isLoading, error} = useQuery<BookDto[]>({
        queryKey: ["books"],
        queryFn: async () => fetchDetailedGet("/api/Books"),
        retry: 0,
    })

    const colorMutation = useMutation({
        mutationFn: (book) => fetchDetailedPost<string, UpdateBookRequest>("api/Book/Update", book),

        onMutate: (book: BookDto) => {
            queryClient.cancelQueries({queryKey: ["books"]});
        
            const previousBooks = queryClient.getQueryData<BookDto[]>(["books"]);
            
            queryClient.setQueryData<BookDto[]>(["books"], (old) => {
                return old?.map((b) => b.series === book.series ? book : b)
            })

            return {previousBooks} // passed on to onError
        },

        onError: (error, variables, context) => {
            console.log(error);
            return queryClient.setQueryData<BookDto[]>(["books"], context?.previousBooks)
        },
    
        onSettled: () => {
            return queryClient.invalidateQueries({queryKey: ["books"]});
        }
    })



    const saveColorChange = (hex: string, rowId: number) => {
        const book = rows.find((x) => x.id === rowId);
        setRows((prev) => {
            const newRows = prev.map((row) => {
                return row.series === book?.series
                    ? { ...row, color: hex }
                    : row;
            });
            return newRows;
        });
    };

    const GetTextColor = (hex: string): string => {
        hex = hex.replace('#', '');
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 150 ? '#3f3d3d' : '#e4e0e0';
    };

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
        );
    };

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
            field: 'color',
            headerName: 'Color',
            renderCell: (params) => (
                <ColorPicker
                    value={params.value ? params.value : '#ffffff'}
                    rowId={params.row.id}
                    onSave={saveColorChange}
                />
            ),
            width: 120,
        },
    ];

    if (isLoading){
        return (
            <LoadingOverlay isLoading={isLoading} message={"Loading..."} />
        )
    }
    return (
        <div className={styles.gridContainer}>
            <BaseGrid
                columns={columns}
                rows={rows ?? []}
                slots={{ row: CustomizeRow }}
                sx={{
                    '& .MuiDataGrid-row:hover': { filter: 'brightness(1.2)' },
                }}
            />
        </div>
    );
}
