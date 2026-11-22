// Значення форми фільтрів
export interface FilterValues {
    search: string
    genreId: number | null
    minRating: number
    year: number | null
}

export const initialFilterValues: FilterValues = {
    search: '',
    genreId: null,
    minRating: 0,
    year: null,
}