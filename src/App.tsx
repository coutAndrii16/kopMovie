import { useState } from 'react'
import KpiCard from './components/KpiCard'
import Counter from './components/Counter'
import Toggle from './components/Toggle'
import MovieCatalog from './components/MovieCatalog'
import { fetchGenres } from './api/tmdb'
import { useFetch } from './hooks/useFetch'
import { useMovieCatalog } from './hooks/useMovieCatalog'
import { computeKpi } from './utils/kpi'

export default function App() {
    const genresState = useFetch(fetchGenres, undefined)
    // Дані каталогу підняті сюди, щоб список і KPI жили від однієї вибірки.
    const catalog = useMovieCatalog()
    const [ratingAsPercent, setRatingAsPercent] = useState(false)

    const genres = genresState.data?.genres ?? []
    const kpi = computeKpi(catalog.movies)
    const pageNote = 'на поточній сторінці'

    return (
        <div className="mx-auto max-w-4xl px-6 py-10">
            <header className="mb-8">
                <h1 className="text-2xl font-extrabold">CineBoard</h1>
                <p className="mt-1 text-sm text-muted">Дашборд кінопрокату на даних TMDB</p>
            </header>

            <section className="flex rounded-xl border border-border bg-surface px-2">
                <KpiCard
                    label="Знайдено"
                    value={catalog.ready ? catalog.found : '…'}
                    change={catalog.foundOnPageOnly ? pageNote : 'усього за вибіркою'}
                />
                <KpiCard
                    label="Топ-рейтинг"
                    value={kpi.topRated?.title ?? '—'}
                    change={kpi.topRated ? `${kpi.topRated.vote_average.toFixed(1)} / 10` : undefined}
                    color="gold"
                />
                <KpiCard label="Середня оцінка" value={kpi.avgRating?.toFixed(1) ?? '—'} change={pageNote} />
                <KpiCard
                    label="Середня популярність"
                    value={kpi.avgPopularity !== null ? Math.round(kpi.avgPopularity) : '—'}
                    change={pageNote}
                    color="indigo"
                />
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
                    <MovieCatalog catalog={catalog} genres={genres} ratingAsPercent={ratingAsPercent} />
                </div>
            </div>
        </div>
    )
}