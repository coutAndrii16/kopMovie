import type { Movie, PaginatedResponse, GenreListResponse } from '../types/tmdb'

const BASE_URL = 'https://api.themoviedb.org/3'
const READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN as string

if (!READ_TOKEN) {
    console.warn('VITE_TMDB_READ_TOKEN не задано.')
}

async function request<T>(path: string): Promise<T> {
    const url = `${BASE_URL}${path}${path.includes('?') ? '&' : '?'}language=uk-UA`
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${READ_TOKEN}`,
            accept: 'application/json',
        },
    })
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