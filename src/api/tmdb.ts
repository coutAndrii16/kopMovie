import type { Movie, PaginatedResponse, GenreListResponse } from '../types/tmdb'

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string

if (!API_KEY) {
    //у проді просто впаде запит із 401.
    console.warn('VITE_TMDB_API_KEY не задано.')
}

async function request<T>(path: string): Promise<T> {
    const url = `${BASE_URL}${path}${path.includes('?') ? '&' : '?'}api_key=${API_KEY}&language=uk-UA`
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`TMDB API ${res.status}: ${res.statusText} (${path})`)
    }
    return res.json() as Promise<T>
}

export function fetchNowPlaying(): Promise<PaginatedResponse<Movie>> {
    return request<PaginatedResponse<Movie>>('/movie/now_playing')
}

export function fetchGenres(): Promise<GenreListResponse> {
    return request<GenreListResponse>('/genre/movie/list')
}