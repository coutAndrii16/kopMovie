import {useEffect, useState} from 'react'
import {fetchNowPlaying, fetchGenres} from '../api/tmdb.ts'
import type {Movie, Genre, PaginatedResponse} from '../types/tmdb.ts'

export function useDashboardData() {
    const [nowPlaying, setNowPlaying] = useState<PaginatedResponse<Movie> | null>(null)
    const [genres, setGenres] = useState<Genre[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        Promise.all([fetchNowPlaying(), fetchGenres()])
            .then(([np, genreList]) => {
                if (cancelled) return
                setNowPlaying(np)
                setGenres(genreList.genres)
            })
            .catch((err: Error) => {
                if (!cancelled) setError(err.message)
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })

        return () => {
            cancelled = true
        }
    }, [])
    return {nowPlaying, genres, loading, error}
}