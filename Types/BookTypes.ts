

export type BookDto = {
    id: number,
    title: string,
    author: AuthorDto,
    genre: GenreDto,
    series: string | null,
    pages: number,
    startedReading: Date | null,
    endedReading: Date | null,
    releaseYear: number,
    color: string
}

export type AuthorDto = {
    authorId: number,
    firstName: string,
    lastName: string,
    birth: string | null,
    webUrl: string
}

export type GenreDto = {
    genreId: number,
    name: string
}

export type UpdateBookRequest = {
    bookId: number,
    title: string,
    authorId: number,
    genreId: number,
    series: string | null,
    pages: number,
    startedReading: Date | null,
    endedReading: Date | null,
    releaseYear: number
}

export type UpdateBookColorRequest = {
    bookId: number,
    hex: string
}