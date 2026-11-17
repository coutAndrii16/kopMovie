import SearchInput from './SearchInput'
import GenreFilter from './GenreFilter'
import YearFilter from './YearFilter'
import RatingFilter from './RatingFilter'
import type { Genre } from '../../types/tmdb'
import type { FilterValues } from '../../types/filters'

interface FiltersFormProps {
    values: FilterValues
    genres: Genre[]
    searching: boolean
    canReset: boolean
    onFieldChange: <K extends keyof FilterValues>(field: K, value: FilterValues[K]) => void
    onReset: () => void
}

// Презентаційна форма: усі поля контрольовані (value + onChange), стану тут немає.
export default function FiltersForm({ values, genres, searching, canReset, onFieldChange, onReset }: FiltersFormProps) {
    return (
        <form onSubmit={(e) => e.preventDefault()} noValidate className="mt-3 space-y-3">
            <div className="flex flex-wrap gap-2">
                <div className="min-w-[10rem] flex-1">
                    <SearchInput value={values.search} onChange={(v) => onFieldChange('search', v)} />
                </div>
                <YearFilter value={values.year} onChange={(v) => onFieldChange('year', v)} />
                <GenreFilter genres={genres} value={values.genreId} onChange={(v) => onFieldChange('genreId', v)} />
            </div>

            <div className="flex items-end justify-between gap-4">
                <RatingFilter value={values.minRating} onChange={(v) => onFieldChange('minRating', v)} />
                <button
                    type="button"
                    onClick={onReset}
                    disabled={!canReset}
                    className="rounded-md border border-border px-3 py-1.5 text-sm transition-colors enabled:hover:border-indigo enabled:hover:text-indigo disabled:opacity-40"
                >
                    Скинути фільтри
                </button>
            </div>

            {searching && (
                <p className="text-xs text-muted">
                    Під час пошуку за назвою жанр і рейтинг застосовуються до поточної сторінки результатів (обмеження TMDB).
                </p>
            )}
        </form>
    )
}