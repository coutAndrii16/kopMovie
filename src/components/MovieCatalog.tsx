import SearchInput from './filters/SearchInput.tsx'
import GenreFilter from './filters/GenreFilter.tsx'
import MovieList from './MovieList'
import Pagination from './Pagination'
import { useMovieCatalog } from '../hooks/useMovieCatalog.ts'
import type { Genre } from '../types/tmdb.ts'

interface MovieCatalogProps {
    genres: Genre[]
    ratingAsPercent: boolean
}

// Тонкий контейнер: збирає фільтри, список і пагінацію; дані й стан — у useMovieCatalog.
export default function MovieCatalog({ genres, ratingAsPercent }: MovieCatalogProps) {
    const c = useMovieCatalog()
    const searching = c.search.trim() !== ''

    return (
        <div>
            <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted">Каталог фільмів</span>
                <span className="text-xs text-muted tabular-nums">Знайдено: {c.totalResults}</span>
            </div>

            <div className="mt-3 flex gap-2">
                <SearchInput value={c.search} onChange={c.setSearch} />
                <GenreFilter genres={genres} value={c.genreId} onChange={c.setGenreId} disabled={searching} />
            </div>
            {searching && (
                <p className="mt-2 text-xs text-muted">Під час пошуку за назвою фільтр жанру вимкнено (обмеження TMDB API).</p>
            )}

            <div className={`mt-3 transition-opacity ${c.loading ? 'opacity-50' : ''}`}>
                {c.error ? (
                    <p className="py-6 text-sm text-ink">Помилка запиту: {c.error}</p>
                ) : c.loading && c.movies.length === 0 ? (
                    <p className="py-6 text-sm text-muted">Завантаження…</p>
                ) : (
                    <MovieList movies={c.movies} genres={genres} ratingAsPercent={ratingAsPercent} />
                )}
            </div>

            <Pagination page={c.page} totalPages={c.totalPages} onChange={c.setPage} disabled={c.loading} />
        </div>
    )
}