'use client';
import styles from './BookGrid.module.css';
import { useCallback, useEffect, useState } from 'react';
import {
    GridActionsCell,
    GridColDef,
    GridRow,
    GridRowProps,
} from '@mui/x-data-grid';
import { BaseGrid } from '@/components/DataGrids/BaseGrid';
import { BookDto, UpdateBookColorRequest, UpdateBookRequest } from '@/Types/BookTypes';
import { ColorPicker } from './ColorCell';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { fetchDetailedGet } from '@/Fetch/DetailedFetch/DetailedGet';
import { CircularProgress } from '@mui/material';
import { useAuthStore } from '../Zustand/AuthStore';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '../UI/PageLoadingProvider';
import { fetchDetailedPost } from '@/Fetch/fetchDetailedPost';
import { Authors, Genres } from "./BooksMockData";

export default function BookGrid() {
    const isInitialized = useAuthStore((s) => s.isInitialized);
    const user = useAuthStore((s) => s.user);
    const router = useRouter();
    const queryClient = useQueryClient();
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Mai',
        'Juni',
        'Juli',
        'Aug',
        'Sep',
        'Okt',
        'Nov',
        'Des',
    ];
    const [rows, setRows] = useState<BookDto[]>();

    useEffect(() => {
        if (isInitialized && !user) router.replace('/Auth/Login');
    }, [isInitialized, user]);

    // UseQuery to get Books data here
    const {
        data: books,
        isLoading,
        error,
    } = useQuery<BookDto[]>({
        queryKey: ['books'],
        queryFn: async () => fetchDetailedGet('/api/Books'),
        retry: 0,
    });

    useEffect(() => {   
        if (!error && books)
            setRows(books);
    }, [books]);

    const bookMutation = useMutation({
        mutationFn: (book: BookDto) =>{
            const updatedBook: UpdateBookRequest = {
                bookId: book.id,
                title: book.title,
                authorId: book.author.authorId,
                genreId: book.genre.genreId,
                startedReading: book.startedReading,
                endedReading: book.endedReading,
                series: book.series,
                pages: book.pages,
                releaseYear: book.releaseYear,
            }
            return fetchDetailedPost<string, UpdateBookRequest>(
                'api/Book/Update',
                updatedBook
            )
        },
        onMutate: (book: BookDto) => {
            queryClient.cancelQueries({ queryKey: ['books'] });
            const previousBooks = queryClient.getQueryData<BookDto[]>([
                'books',
            ]);
            queryClient.setQueryData<BookDto[]>(['books'], (old) => {
                return old?.map((b) => (b.series === book.series ? book : b));
            });
            return { previousBooks }; // if this fails, onError makes use of it i think
        },
        onError: (error, variables, context) => {
            console.log(error);
            return queryClient.setQueryData<BookDto[]>(
                ['books'],
                context?.previousBooks
            );
        },
        onSettled: () => {
            return queryClient.invalidateQueries({ queryKey: ['books'] });
        },
    });

    const handleRowUpdate = useCallback(
        async (newRow: BookDto, oldRow: BookDto) => {
            await bookMutation.mutateAsync(newRow);
            return newRow;
        },[]
    );


    /* const colorMutation = useMutation({
        mutationFn: (body: UpdateBookColorRequest) => 
    }) */

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
                    ...props.style,
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
            editable: true,
            //flex: 1, // Auto-fill available space
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
            type: 'singleSelect',
            headerName: 'Author',
            width: 150,
            valueOptions: {valueOptions}
            valueSetter: {valueSetter} 
            valueGetter: (value, row) =>
                `${row.author.firstName} ${row.author.lastName}`,
        },
        {
            field: 'genre',
            headerName: 'Genre',
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Fantasy', 'Crime', 'Horror', 'Science-Fiction'],
            width: 150,
        },
        {
            field: 'series',
            type: 'string',
            headerName: 'Series',
            width: 250,
            editable: true,
        },
        {
            field: 'pages',
            type: 'number',
            headerName: 'Pages',
            width: 100,
            editable: true,
        },
        {
            field: 'startedReading',
            type: 'date',
            headerName: 'Started reading',
            width: 150,
            editable: true,
        },
        {
            field: 'endedReading',
            type: 'date',
            headerName: 'Finished Reading',
            width: 150,
            editable: true,
        },
        {
            field: 'releaseYear',
            type: 'string',
            headerName: 'Release Year',
            width: 150,
            editable: true,
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

    if (isLoading) {
        return <LoadingOverlay isLoading={isLoading} message={'Loading...'} />;
    }
    if (!isLoading && error && (
        <h1>{error.message}</h1>
    ))
    return (
        <div className={styles.gridContainer}>
            <BaseGrid
                getRowId={(row) => row.id}
                columns={columns}
                editMode="row"
                rows={books ?? []}
                processRowUpdate={handleRowUpdate}
                slots={{ row: CustomizeRow }}
                sx={{
                    '& .MuiDataGrid-row:hover': { filter: 'brightness(1.2)' },
                }}
            />
        </div>
    );
}
