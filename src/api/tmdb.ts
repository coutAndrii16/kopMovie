import type { Movie, PaginatedResponse, GenreListResponse } from '../types/tmdb.ts'

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

export function fetchNowPlaying(page = 1): Promise<PaginatedResponse<Movie>> {
    return request('/movie/now_playing', { page })
}

export function fetchGenres(): Promise<GenreListResponse> {
    return request('/genre/movie/list')
}

// Каталог з фільтром за жанром. Пошук за назвою — окремий ендпоінт нижче:
// TMDB не дозволяє комбінувати query і with_genres в одному запиті.
export function discoverMovies(opts: { page: number; genreId: number | null }): Promise<PaginatedResponse<Movie>> {
    return request('/discover/movie', {
        page: opts.page,
        with_genres: opts.genreId ?? undefined,
        sort_by: 'popularity.desc',
        include_adult: 'false',
    })
}

export function searchMovies(opts: { query: string; page: number }): Promise<PaginatedResponse<Movie>> {
    return request('/search/movie', { query: opts.query, page: opts.page, include_adult: 'false' })
}