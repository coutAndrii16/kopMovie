import { useMemo } from 'react'
import MovieRow from './MovieRow'
import { formatRating } from '../utils/rating'
import type { Movie, Genre } from '../types/tmdb'

interface MovieListProps {
    movies: Movie[]
    genres: Genre[]
    ratingAsPercent: boolean
}

// Суто презентаційний: отримує вже відфільтрований масив, нічого не знає про фільтри.
export default function MovieList({ movies, genres, ratingAsPercent }: MovieListProps) {
    const genreById = useMemo(() => new Map(genres.map((g) => [g.id, g.name])), [genres])

    if (movies.length === 0) {
        return <p className="py-6 text-sm text-muted">Нічого не знайдено.</p>
    }

    return (
        <ul>
            {movies.map((movie) => (
                <MovieRow
                    key={movie.id}
                    movie={movie}
                    genreNames={movie.genre_ids.map((id) => genreById.get(id) ?? '—')}
                    rating={formatRating(movie.vote_average, ratingAsPercent)}
                />
            ))}
        </ul>
    )
}