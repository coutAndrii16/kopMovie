import { useEffect, useState } from 'react'
import KpiCard from './components/KpiCard'
import Counter from './components/Counter'
import Toggle from './components/Toggle'
import FilteredList from './components/FilteredList'
import { fetchNowPlaying, fetchGenres } from './api/tmdb'
import type { Movie, Genre } from './types/tmdb'

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ratingAsPercent, setRatingAsPercent] = useState(false)

  useEffect(() => {
    let cancelled = false

    Promise.all([fetchNowPlaying(), fetchGenres()])
        .then(([nowPlaying, genreList]) => {
          if (cancelled) return
          setMovies(nowPlaying.results)
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
        <div className="app app--status">
          <p>Завантаження даних з TMDB…</p>
        </div>
    )
  }

  if (error) {
    return (
        <div className="app app--status">
          <p>Помилка запиту до TMDB: {error}</p>
          <p className="app__hint">Перевірте VITE_TMDB_API_KEY у .env</p>
        </div>
    )
  }

  const topRated = [...movies].sort((a, b) => b.vote_average - a.vote_average)[0]
  const avgRating = movies.length
      ? (movies.reduce((sum, m) => sum + m.vote_average, 0) / movies.length).toFixed(1)
      : '—'

  return (
      <div className="app">
        <header className="app__header">
          <span className="app__eyebrow">CineBoard</span>
          <h1 className="app__title">Дашборд кінопрокату</h1>
        </header>

        <section className="kpi-row">
          <KpiCard label="У прокаті" value={movies.length} change="зараз у кінотеатрах" />
          {topRated && (
              <KpiCard label="Топ-рейтинг" value={topRated.title} change={`${topRated.vote_average} / 10`} tone="gold" />
          )}
          <KpiCard label="Середня оцінка" value={avgRating} change="за всіма фільмами" />
          <KpiCard label="Жанрів" value={genres.length} change="у довіднику TMDB" tone="crimson" />
        </section>

        <section className="widgets-row">
          <Counter label="У списку «Переглянути пізніше»" initial={0} step={1} />
          <Toggle
              label="Одиниця рейтингу"
              isOn={ratingAsPercent}
              onToggle={() => setRatingAsPercent((v) => !v)}
              labelOff="TMDB (0–10)"
              labelOn="Відсоток глядачів"
          />
        </section>

        <section className="widgets-row widgets-row--single">
          <FilteredList movies={movies} genres={genres} ratingAsPercent={ratingAsPercent} />
        </section>
      </div>
  )
}