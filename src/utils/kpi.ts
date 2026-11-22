import type { Movie } from '../types/tmdb'

const average = (nums: number[]) => (nums.length ? nums.reduce((s, n) => s + n, 0) / nums.length : null)

// KPI рахуються з тієї самої вибірки, що показана у списку.
export function computeKpi(movies: Movie[]) {
    const topRated = movies.reduce<Movie | null>(
        (best, m) => (best === null || m.vote_average > best.vote_average ? m : best),
        null,
    )
    return {
        topRated,
        avgRating: average(movies.map((m) => m.vote_average)),
        avgPopularity: average(movies.map((m) => m.popularity)),
    }
}