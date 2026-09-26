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
        <div className="widget-card widget-card--wide">
            <div className="filtered-list__header">
                <span className="widget-card__label">Фільми в прокаті</span>
                <select
                    className="filtered-list__select"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="all">Усі жанри</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>

            <ul className="filtered-list__items">
                {filtered.map((movie) => (
                    <li key={movie.id} className="filtered-list__item">
                        <div className="filtered-list__item-main">
                            <span className="filtered-list__title">{movie.title}</span>
                            <span className="filtered-list__genres">
                {movie.genre_ids.map(genreName).join(' · ')}
              </span>
                        </div>
                        <span className="filtered-list__rating">{formatRating(movie.vote_average)}</span>
                    </li>
                ))}
                {filtered.length === 0 && (
                    <li className="filtered-list__empty">У цьому жанрі поки немає фільмів.</li>
                )}
            </ul>
        </div>
    )
}