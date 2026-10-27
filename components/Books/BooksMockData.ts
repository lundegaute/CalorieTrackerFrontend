import { BookDto } from "@/Types/BookTypes";


export const Books: BookDto[] = [
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
            color: "#2a452a"
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
            color: "#2a452a"
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
            color: "#2a452a"
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
            series: 'The Lord of the Rings',
            pages: 310,
            startedReading: null,
            endedReading: null,
            releaseYear: 1937,
            color: "#2a452a"
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
            color: "#2a452a"
        },
    ];