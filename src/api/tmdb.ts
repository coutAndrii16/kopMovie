import type { Movie, PaginatedResponse, GenreListResponse, CatalogParams } from '../types/tmdb'

const BASE_URL = 'https://api.themoviedb.org/3'
const READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN as string

if (!READ_TOKEN) {
    console.warn('VITE_TMDB_READ_TOKEN не задано. Додайте .env за зразком .env.example')
}

type Params = Record<string, string | number | undefined>

// Єдине місце автентифікації: v4 Read Access Token передається заголовком, не в URL.
async function request<T>(path: string, params: Params = {}): Promise<T> {
    const query = new URLSearchParams({ language: 'uk-UA' })
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) query.set(key, String(value))
    }
    const res = await fetch(`${BASE_URL}${path}?${query}`, {
        headers: { Authorization: `Bearer ${READ_TOKEN}`, accept: 'application/json' },
    })
    if (!res.ok) {
        throw new Error(`TMDB API ${res.status}: ${res.statusText} (${path})`)
    }
    return res.json() as Promise<T>
}

export function fetchGenres(): Promise<GenreListResponse> {
    return request('/genre/movie/list')
}

// Каталог з фільтрами: жанр, мінімальний рейтинг, рік.
export function discoverMovies(opts: Omit<CatalogParams, 'query'>): Promise<PaginatedResponse<Movie>> {
    const hasRating = opts.minRating > 0
    return request('/discover/movie', {
        page: opts.page,
        with_genres: opts.genreId ?? undefined,
        'vote_average.gte': hasRating ? opts.minRating : undefined,
        // Без порога голосів у вибірку потрапляють фільми з однією оцінкою «10.0».
        'vote_count.gte': hasRating ? 50 : undefined,
        primary_release_year: opts.year ?? undefined,
        sort_by: 'popularity.desc',
        include_adult: 'false',
    })
}

// Пошук за назвою. /search/movie не приймає жанр і рейтинг (обмеження TMDB), рік — приймає.
export function searchMovies(opts: { query: string; year: number | null; page: number }): Promise<PaginatedResponse<Movie>> {
    return request('/search/movie', {
        query: opts.query,
        page: opts.page,
        primary_release_year: opts.year ?? undefined,
        include_adult: 'false',
    })
}

// Одна точка входу для useFetch: сама обирає ендпоінт за параметрами.
export function fetchCatalog(params: CatalogParams): Promise<PaginatedResponse<Movie>> {
    return params.query ? searchMovies(params) : discoverMovies(params)
}