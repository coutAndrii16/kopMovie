import { useEffect, useState } from 'react'
import { discoverMovies, searchMovies } from '../api/tmdb'
import { useDebouncedValue } from './useDebouncedValue.ts'
import type { Movie } from '../types/tmdb.ts'

const MAX_PAGES = 500 // TMDB не віддає сторінки далі 500

// Стан фільтрів + сторінки + серверне завантаження. UI-компоненти про fetch нічого не знають.
export function useMovieCatalog() {
    const [search, setSearch] = useState('')
    const [genreId, setGenreId] = useState<number | null>(null)
    const [pageState, setPageState] = useState({ page: 1, key: '' })

    const [movies, setMovies] = useState<Movie[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const debouncedSearch = useDebouncedValue(search.trim(), 400)

    const filterKey = `${debouncedSearch}|${genreId ?? ''}`
    const page = pageState.key === filterKey ? pageState.page : 1
    const setPage = (p: number) => setPageState({ page: p, key: filterKey })

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)

        const request = debouncedSearch
            ? searchMovies({ query: debouncedSearch, page })
            : discoverMovies({ page, genreId })

        request
            .then((res) => {
                if (cancelled) return
                setMovies(res.results)
                setTotalPages(Math.min(res.total_pages, MAX_PAGES))
                setTotalResults(res.total_results)
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
    }, [debouncedSearch, genreId, page])

    return { search, setSearch, genreId, setGenreId, page, setPage, movies, totalPages, totalResults, loading, error }
}