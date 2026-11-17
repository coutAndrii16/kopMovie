// Форма відповідає реальному TMDB API — перевірено в Postman
// (GET /movie/now_playing, GET /genre/movie/list).

export interface Movie {
    id: number
    title: string
    overview: string
    release_date: string
    vote_average: number
    vote_count: number
    popularity: number
    genre_ids: number[]
    poster_path: string | null
}

export interface Genre {
    id: number
    name: string
}

export interface PaginatedResponse<T> {
    page: number
    results: T[]
    total_pages: number
    total_results: number
}

export interface GenreListResponse {
    genres: Genre[]
}

// Параметри запиту до каталогу — єдиний вхід для useFetch(fetchCatalog, params).
export interface CatalogParams {
    query: string
    genreId: number | null
    minRating: number
    year: number | null
    page: number
}