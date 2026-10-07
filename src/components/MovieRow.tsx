import type { Movie } from '../types/tmdb'

interface MovieRowProps {
    movie: Movie
    genreNames: string[]
    rating: string
}

export default function MovieRow({ movie, genreNames, rating }: MovieRowProps) {
    return (
        <li className="-mx-2 flex items-center justify-between gap-4 rounded-md border-t border-border px-2 py-3 transition-colors first:border-t-0 hover:bg-surface2/60">
            <div className="min-w-0">
                <div className="truncate font-medium">{movie.title}</div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                    {genreNames.map((name) => (
                        <span key={name} className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">
              {name}
            </span>
                    ))}
                </div>
            </div>
            <span className="shrink-0 rounded-full bg-gold/10 px-2.5 py-1 text-sm font-semibold text-gold">
        ★ {rating}
      </span>
        </li>
    )
}