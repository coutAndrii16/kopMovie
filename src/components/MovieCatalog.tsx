import FiltersForm from './filters/FiltersForm'
import MovieList from './list/MovieList'
import Pagination from './list/Pagination'
import SortControl from './list/SortControl'
import { useSortedMovies } from '../hooks/useSortedMovies'
import type { MovieCatalogState } from '../hooks/useMovieCatalog'
import type { Genre } from '../types/tmdb'

interface MovieCatalogProps {
    catalog: MovieCatalogState
    genres: Genre[]
    ratingAsPercent: boolean
}

// Презентаційний контейнер: дані й логіка приходять із useMovieCatalog (піднятий в App),
// тут лише розкладка форми, сортування, списку й пагінації.
export default function MovieCatalog({ catalog: c, genres, ratingAsPercent }: MovieCatalogProps) {
    const { sorted, field, direction, toggleSort } = useSortedMovies(c.movies)

    return (
        <div>
            <span className="text-sm text-muted">Каталог фільмів</span>

            <FiltersForm
                values={c.form.values}
                genres={genres}
                searching={c.searching}
                canReset={c.form.isDirty}
                onFieldChange={c.form.setField}
                onReset={c.form.reset}
            />

            <div className="mt-4">
                <SortControl field={field} direction={direction} onToggle={toggleSort} />
            </div>

            <div className={`mt-3 transition-opacity ${c.loading ? 'opacity-50' : ''}`}>
                {c.error ? (
                    <p className="py-6 text-sm text-ink">Помилка запиту: {c.error}</p>
                ) : !c.ready ? (
                    <p className="py-6 text-sm text-muted">Завантаження…</p>
                ) : (
                    <MovieList movies={sorted} genres={genres} ratingAsPercent={ratingAsPercent} />
                )}
            </div>

            <Pagination page={c.page} totalPages={c.totalPages} onChange={c.setPage} disabled={c.loading} />
        </div>
    )
}