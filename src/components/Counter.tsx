import { useState } from 'react'

interface CounterProps {
    label: string
    initial?: number
    step?: number
}

export default function Counter({ label, initial = 0, step = 1 }: CounterProps) {
    const [count, setCount] = useState<number>(initial)

    return (
        <div>
            <div className="text-sm text-muted">{label}</div>
            <div className="mt-2 flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => setCount((c) => c - step)}
                    aria-label="Зменшити"
                    className="h-8 w-8 rounded-full border border-border text-ink hover:border-indigo hover:text-indigo transition-colors"
                >
                    −
                </button>
                <span className="w-8 text-center text-xl font-bold tabular-nums">{count}</span>
                <button
                    type="button"
                    onClick={() => setCount((c) => c + step)}
                    aria-label="Збільшити"
                    className="h-8 w-8 rounded-full border border-border text-ink hover:border-indigo hover:text-indigo transition-colors"
                >
                    +
                </button>
                <button
                    type="button"
                    onClick={() => setCount(initial)}
                    className="ml-auto text-xs text-muted underline hover:text-ink"
                >
                    Скинути
                </button>
            </div>
        </div>
    )
}