import { useMemo, useState } from 'react'
import type { Movie } from '../types/tmdb'

export type SortField = 'title' | 'vote_average' | 'release_date' | 'popularity'
export type SortDirection = 'asc' | 'desc'

export function useSortedMovies(movies: Movie[]) {
    const [field, setField] = useState<SortField | null>(null)
    const [direction, setDirection] = useState<SortDirection>('desc')

    // Похідний стан: оригінал movies не мутується.
    const sorted = useMemo(() => {
        if (!field) return movies
        const sign = direction === 'asc' ? 1 : -1
        return [...movies].sort((a, b) => {
            const av = a[field]
            const bv = b[field]
            return typeof av === 'string' && typeof bv === 'string'
                ? sign * av.localeCompare(bv, 'uk')
                : sign * ((av as number) - (bv as number))
        })
    }, [movies, field, direction])

    const toggleSort = (next: SortField) => {
        if (next === field) {
            setDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
        } else {
            setField(next)
            setDirection(next === 'title' ? 'asc' : 'desc')
        }
    }

    return { sorted, field, direction, toggleSort }
}