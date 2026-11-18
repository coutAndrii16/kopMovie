import { useMemo, useState } from 'react'
import { fetchCatalog } from '../api/tmdb'
import { useDebounce } from './useDebounce'
import { useFetch } from './useFetch'
import { useFiltersForm } from './useFiltersForm'
import type { CatalogParams } from '../types/tmdb'

const MAX_PAGES = 500 // TMDB не віддає сторінки далі 500

// Композиція хуків: форма → debounce → параметри запиту → useFetch → вибірка для списку й KPI.
export function useMovieCatalog() {
    const form = useFiltersForm()
    const debounced = useDebounce(form.values, 400)

    const query = debounced.search.trim()
    const searching = query !== ''
    // У режимі пошуку TMDB не приймає жанр і рейтинг, тому в запит вони не потрапляють
    // (зміна цих полів не викликає зайвого запиту) і застосовуються до результатів локально.
    const genreId = searching ? null : debounced.genreId
    const minRating = searching ? 0 : debounced.minRating
    const year = debounced.year

    // Сторінка «прив'язана» до набору фільтрів: змінились фільтри — key не збігається,
    // і сторінка автоматично вважається першою.
    const filterKey = `${query}|${genreId ?? ''}|${minRating}|${year ?? ''}`
    const [pageState, setPageState] = useState({ page: 1, key: '' })
    const page = pageState.key === filterKey ? pageState.page : 1
    const setPage = (p: number) => setPageState({ page: p, key: filterKey })

    const params = useMemo<CatalogParams>(
        () => ({ query, genreId, minRating, year, page }),
        [query, genreId, minRating, year, page],
    )
    const { data, loading, error } = useFetch(fetchCatalog, params)

    const uiGenreId = form.values.genreId
    const uiMinRating = form.values.minRating
    const movies = useMemo(() => {
        const results = data?.results ?? []
        if (!searching) return results
        return results.filter(
            (m) => (uiGenreId === null || m.genre_ids.includes(uiGenreId)) && m.vote_average >= uiMinRating,
        )
    }, [data, searching, uiGenreId, uiMinRating])

    const clientFiltered = searching && (uiGenreId !== null || uiMinRating > 0)

    return {
        form,
        movies,
        searching,
        loading,
        error,
        ready: data !== null,
        page,
        setPage,
        totalPages: Math.min(data?.total_pages ?? 1, MAX_PAGES),
        found: clientFiltered ? movies.length : (data?.total_results ?? 0),
        foundOnPageOnly: clientFiltered,
    }
}

export type MovieCatalogState = ReturnType<typeof useMovieCatalog>
