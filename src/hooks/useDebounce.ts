import { useEffect, useState } from 'react'

// Загальний хук: повертає value з затримкою; поки значення змінюється, таймер скидається.
export function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(id)
  }, [value, delayMs])

  return debounced
}
