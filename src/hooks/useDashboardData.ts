import { useEffect, useState } from 'react'
import { fetchNowPlaying, fetchGenres } from '../api/tmdb'
import type { Movie, Genre, PaginatedResponse } from '../types/tmdb'

const reasonMessage = (reason: unknown): string =>
    reason instanceof Error ? reason.message : String(reason)

export function useDashboardData() {
    const [nowPlaying, setNowPlaying] = useState<PaginatedResponse<Movie> | null>(null)
    const [genres, setGenres] = useState<Genre[]>([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState<string[]>([])

    useEffect(() => {
        let cancelled = false

        async function loadList() {
            try {
                const [npResult, genresResult] = await Promise.allSettled([
                    fetchNowPlaying(),
                    fetchGenres(),
                ])
                if (cancelled) return

                const failed: string[] = []

                if (npResult.status === 'fulfilled') setNowPlaying(npResult.value)
                else failed.push(`Прокат: ${reasonMessage(npResult.reason)}`)

                if (genresResult.status === 'fulfilled') setGenres(genresResult.value.genres)
                else failed.push(`Жанри: ${reasonMessage(genresResult.reason)}`)

                setErrors(failed)
            } catch (err) {
                // allSettled сам ніколи не reject-иться; catch ловить лише непередбачене,
                // наприклад синхронну помилку під час виклику fetch-функцій.
                if (!cancelled) setErrors([reasonMessage(err)])
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        void loadList()

        return () => {
            cancelled = true
        }
    }, [])

    return {
        nowPlaying,
        genres,
        loading,
        errors,
        error: errors.length > 0 ? errors.join('; ') : null,
    }
}