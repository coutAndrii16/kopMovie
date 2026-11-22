import { useEffect, useState } from 'react'

export interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

// Загальний хук завантаження: приймає функцію запиту й параметри, повертає { data, loading, error }.
// Умови: fetcher — стабільна функція (не створюється в рендері), params — мемоїзований об'єкт,
// інакше ефект спрацьовуватиме на кожен рендер. Попередні data лишаються, поки вантажаться нові.
export function useFetch<T, P>(fetcher: (params: P) => Promise<T>, params: P): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetcher(params)
      .then((res) => {
        if (!cancelled) setData(res)
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
  }, [fetcher, params])

  return { data, loading, error }
}
