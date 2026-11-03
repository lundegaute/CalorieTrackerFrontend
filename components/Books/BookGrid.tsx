'use client';
import styles from './BookGrid.module.css';
import { useCallback, useEffect, useState } from 'react';
import {GridActionsCell, GridColDef, GridRow, GridRowProps, GridSingleSelectColDef } from '@mui/x-data-grid';
import { BaseGrid } from '@/components/DataGrids/BaseGrid';
import { AuthorDto, BookDto, GenreDto, UpdateBookColorRequest, UpdateBookRequest } from '@/Types/BookTypes';
import { ColorPicker } from './ColorCell';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../Zustand/AuthStore';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '../UI/PageLoadingProvider';
import { fetchDetailedPost } from '@/Fetch/fetchDetailedPost';
import { authorsQueryOptions, booksQueryOptions, genresQueryOptions } from '@/Fetch/TanstackQueryOptions/QueryOptions';
import { fetchDetailedPut } from '@/Fetch/DetailedFetch/DetailedPut';

export default function BookGrid() {
    const isInitialized = useAuthStore((s) => s.isInitialized);
    const user = useAuthStore((s) => s.user);
    const router = useRouter();
    const queryClient = useQueryClient();


    useEffect(() => {
        if (isInitialized && !user) router.replace('/Auth/Login');
    }, [isInitialized, user]);

    // UseQuery to get Books data here
    const {
        data: books,
        isLoading,
        error,
    } = useQuery({
        ...booksQueryOptions(),
        select: (data) => {
            return data.map((book) => {
                return {
                    ...book,
                    startedReading: book.startedReading ? new Date(book.startedReading) : null,
                    endedReading: book.endedReading ? new Date(book.endedReading) : null,
                };
            });
        }
    })
    const {
        data: authors,
        isLoading: isLoadingAuthors,
        error: errorAuthors,
    } = useQuery({
        ...authorsQueryOptions(),
        staleTime: Infinity,
    });
    const {
        data: genres,
        isLoading: isLoadingGenders,
        error: errorGenders,
    } = useQuery({
        ...genresQueryOptions(),
        staleTime: Infinity,
    });

    const formatToLocalDateOnly = (date: Date | string | null | undefined): string | null => {
    if (!date) return null;
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return null;

    // Use local getFullYear, getMonth, and getDate (NOT getUTCHours/toISOString)
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

    const bookMutation = useMutation({
        mutationFn: (book: BookDto) => {
            console.log("----------------------------")
            console.log(book.releaseYear) 
            const updatedBook: UpdateBookRequest = {
                bookId: book.id,
                title: book.title,
                authorId: book.author.authorId,
                genreId: book.genre.genreId,
                startedReading: formatToLocalDateOnly(book.startedReading),
                endedReading: formatToLocalDateOnly(book.endedReading),
                series: book.series,
                pages: book.pages,
                releaseYear: book.releaseYear,
                hex: book.hex,
            };
            return fetchDetailedPut<string, UpdateBookRequest>(
                '/api/Books/Update',
                updatedBook
            );
        },
        onMutate: (book: BookDto) => {
            queryClient.cancelQueries({ queryKey: ['books'] });
            const previousBooks = queryClient.getQueryData<BookDto[]>([
                'books',
            ]);
            queryClient.setQueryData<BookDto[]>(['books'], (old) => {
                return old?.map((b) => (b.id === book.id ? book : b));
            });
            return { previousBooks }; // if this fails, onError makes use of it i think
        },
        onError: (error, variables, context) => {
            // onError must have these 3 args in this order. context carries the object onMutate returns
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
        },
        [bookMutation]
    );

    /* const colorMutation = useMutation({
        mutationFn: (body: UpdateBookColorRequest) => 
    }) */

    const saveColorChange = async (hex: string, rowId: number) => {
        if (!books)
            return;
        const book = books.find(x => x.id === rowId);
        if (!book)
            return;
        book.hex = hex;
        await bookMutation.mutateAsync(book);
    };

    const GetTextColor = (hex: string): string => {
        if (!hex)
            hex = "#ffffff";
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
                    backgroundColor: row.hex,
                    color: GetTextColor(row.hex),
                }}
            />
        );
    };

    const handleAuthorSetter = (value: number, row: BookDto) => {
        const author = authors?.find(x => x.authorId === value);
        return {...row, author: author};
    }
    const handleAuthorGetter = (value: AuthorDto, row: BookDto) => {
        return value.authorId;
    }

    const handleGenreGetter = (value:GenreDto, row: BookDto) => {
        return value.genreId;
    }
    const handleGenreSetter = (value:number, row: BookDto) => {
        var genre = genres?.find(x => x.genreId === value);
        return {...row, genre: genre};
    }

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
            //valueFormatter: (value: type of this field, row: type of this grids datasource) => returns string
            field: 'author',
            type: 'singleSelect',
            editable: true,
            headerName: 'Author',
            width: 150,
            valueOptions: authors?.map((b) => ({
                value: b.authorId,
                label: `${b.firstName} ${b.lastName}`,
            })),
            valueGetter: (value: AuthorDto, row: BookDto) => handleAuthorGetter(value, row),
            valueSetter: (value: number, row: BookDto) => handleAuthorSetter(value, row),
        },
        {
            field: 'genre',
            headerName: 'Genre',
            editable: true,
            type: 'singleSelect',
            valueOptions: genres?.map((g) => ({
                value: g.genreId,
                label: g.name,
            })),
            valueGetter: (value: GenreDto, row: BookDto) => handleGenreGetter(value, row),
            valueSetter: (value: number, row: BookDto) => handleGenreSetter(value, row),
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
            field: 'hex',
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

    if (error) return <h1>{error.message}</h1>;

    return (
        <div className={styles.gridContainer}>
            <BaseGrid
                getRowId={(row) => row.id}
                columns={columns}
                editMode="row"
                rows={books ?? []}
                processRowUpdate={handleRowUpdate}
                onProcessRowUpdateError={(error) => { console.log(error)}}
                slots={{ row: CustomizeRow }}
                sx={{
                    '& .MuiDataGrid-row:hover': {
                        filter: 'brightness(1.2)',
                    },
                }}
            />
        </div>
    );
}
