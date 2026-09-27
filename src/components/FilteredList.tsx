import { useState } from 'react'
import type { Movie, Genre } from '../types/tmdb'

interface FilteredListProps {
    movies: Movie[]
    genres: Genre[]
    ratingAsPercent: boolean
}

export default function FilteredList({ movies, genres, ratingAsPercent }: FilteredListProps) {
    const [selectedGenre, setSelectedGenre] = useState<string>('all')

    const filtered =
        selectedGenre === 'all'
            ? movies
            : movies.filter((movie) => movie.genre_ids.includes(Number(selectedGenre)))

    const genreName = (id: number) => genres.find((g) => g.id === id)?.name ?? '—'

    const formatRating = (value: number) =>
        ratingAsPercent ? `${Math.round(value * 10)}%` : value.toFixed(1)

    return (
        <div>
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Фільми в прокаті</span>
                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="rounded-md border border-border bg-surface2 px-2.5 py-1.5 text-sm text-ink"
                >
                    <option value="all">Усі жанри</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>

            <ul className="mt-3">
                {filtered.map((movie) => (
                    <li
                        key={movie.id}
                        className="flex items-center justify-between gap-4 border-t border-border py-3 first:border-t-0 hover:bg-surface2/60 -mx-2 px-2 rounded-md transition-colors"
                    >
                        <div className="min-w-0">
                            <div className="truncate font-medium">{movie.title}</div>
                            <div className="mt-1 flex flex-wrap gap-1.5">
                                {movie.genre_ids.map((id) => (
                                    <span
                                        key={id}
                                        className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
                                    >
                    {genreName(id)}
                  </span>
                                ))}
                            </div>
                        </div>
                        <span className="shrink-0 rounded-full bg-gold/10 px-2.5 py-1 text-sm font-semibold text-gold">
              ★ {formatRating(movie.vote_average)}
            </span>
                    </li>
                ))}
                {filtered.length === 0 && (
                    <li className="py-6 text-sm text-muted">У цьому жанрі поки немає фільмів.</li>
                )}
            </ul>
        </div>
    )
}