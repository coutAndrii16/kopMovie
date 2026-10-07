import { useEffect, useState } from 'react'
import KpiCard from './components/KpiCard'
import Counter from './components/Counter'
import Toggle from './components/Toggle'
import MovieCatalog from './components/MovieCatalog'
import { fetchNowPlaying, fetchGenres } from './api/tmdb'
import type { Movie, Genre, PaginatedResponse } from './types/tmdb.ts'

export default function App() {
    const [nowPlaying, setNowPlaying] = useState<PaginatedResponse<Movie> | null>(null)
    const [genres, setGenres] = useState<Genre[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [ratingAsPercent, setRatingAsPercent] = useState(false)

    useEffect(() => {
        let cancelled = false

        Promise.all([fetchNowPlaying(), fetchGenres()])
            .then(([np, genreList]) => {
                if (cancelled) return
                setNowPlaying(np)
                setGenres(genreList.genres)
            })
            .catch((err: Error) => {
                if (!cancelled) setError(err.message)
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })

        return () => {
            cancelled = true
        }
    }, [])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center text-muted">
                Завантаження даних з TMDB…
            </div>
        )
    }

    if (error || !nowPlaying) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-2 text-center">
                <p className="text-ink">Помилка запиту до TMDB: {error}</p>
                <p className="text-sm text-muted">Перевірте VITE_TMDB_READ_TOKEN у .env</p>
            </div>
        )
    }

    // KPI рахуються з першої сторінки прокату; total_results — реальна кількість фільмів у прокаті.
    const sample = nowPlaying.results
    const topRated = [...sample].sort((a, b) => b.vote_average - a.vote_average)[0]
    const avgRating = sample.length
        ? (sample.reduce((sum, m) => sum + m.vote_average, 0) / sample.length).toFixed(1)
        : '—'

    return (
        <div className="mx-auto max-w-4xl px-6 py-10">
            <header className="mb-8">
                <h1 className="text-2xl font-extrabold">CineBoard</h1>
                <p className="mt-1 text-sm text-muted">Дашборд кінопрокату на даних TMDB</p>
            </header>

            <section className="flex rounded-xl border border-border bg-surface px-2">
                <KpiCard label="У прокаті" value={nowPlaying.total_results} change="усього фільмів" />
                {topRated && (
                    <KpiCard label="Топ-рейтинг" value={topRated.title} change={`${topRated.vote_average} / 10`} tone="gold" />
                )}
                <KpiCard label="Середня оцінка" value={avgRating} change="перша сторінка прокату" />
                <KpiCard label="Жанрів" value={genres.length} change="у довіднику TMDB" tone="indigo" />
            </section>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr]">
                <aside className="space-y-6 self-start rounded-xl border border-border bg-surface p-5">
                    <Counter label="У списку «Переглянути пізніше»" initial={0} step={1} />
                    <Toggle
                        label="Одиниця рейтингу"
                        isOn={ratingAsPercent}
                        onToggle={() => setRatingAsPercent((v) => !v)}
                        labelOff="TMDB (0–10)"
                        labelOn="Відсоток глядачів"
                    />
                </aside>

                <div className="rounded-xl border border-border bg-surface p-5">
                    <MovieCatalog genres={genres} ratingAsPercent={ratingAsPercent} />
                </div>
            </div>
        </div>
    )
}