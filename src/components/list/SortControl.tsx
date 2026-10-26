import type { SortField, SortDirection } from '../../hooks/useSortedMovies'

const options: { field: SortField; label: string }[] = [
    { field: 'title', label: 'Назва' },
    { field: 'release_date', label: 'Дата' },
    { field: 'vote_average', label: 'Рейтинг' },
    { field: 'popularity', label: 'Популярність' },
]

interface SortControlProps {
    field: SortField | null
    direction: SortDirection
    onToggle: (field: SortField) => void
}

export default function SortControl({ field, direction, onToggle }: SortControlProps) {
    return (
        <div className="flex flex-wrap items-center gap-1.5 text-sm">
            <span className="text-muted">Сортувати:</span>
            {options.map((o) => {
                const active = field === o.field
                return (
                    <button
                        key={o.field}
                        type="button"
                        onClick={() => onToggle(o.field)}
                        className={`rounded-md border px-2.5 py-1 transition-colors ${
                            active ? 'border-indigo text-indigo' : 'border-border text-muted hover:text-ink'
                        }`}
                    >
                        {o.label} {active && (direction === 'asc' ? '↑' : '↓')}
                    </button>
                )
            })}
        </div>
    )
}