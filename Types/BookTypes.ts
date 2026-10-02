

export type BookDto = {
    id: number,
    title: string,
    author: AuthorDto,
    genre: GenreDto,
    series: string | null,
    pages: number,
    startedReading: string | null,
    endedReading: string | null,
    releaseYear: number
}

export type AuthorDto = {
    firstName: string,
    lastName: string,
    birth: string | null,
    webUrl: string
}

export type GenreDto = {
    name: string
}