import type { Genre } from '../../types/tmdb.ts'

interface GenreFilterProps {
    genres: Genre[]
    value: number | null
    onChange: (genreId: number | null) => void
    disabled?: boolean
}

export default function GenreFilter({ genres, value, onChange, disabled = false }: GenreFilterProps) {
    return (
        <select
            value={value ?? 'all'}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value === 'all' ? null : Number(e.target.value))}
            className="rounded-md border border-border bg-surface2 px-2.5 py-1.5 text-sm text-ink focus:border-indigo focus:outline-none disabled:opacity-40"
        >
            <option value="all">Усі жанри</option>
            {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                    {genre.name}
                </option>
            ))}
        </select>
    )
}