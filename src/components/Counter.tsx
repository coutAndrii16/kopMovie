import { useState } from 'react'

interface CounterProps {
    label: string
    initial?: number
    step?: number
}

export default function Counter({ label, initial = 0, step = 1 }: CounterProps) {
    const [count, setCount] = useState<number>(initial)

    return (
        <div className="widget-card">
            <span className="widget-card__label">{label}</span>
            <div className="counter">
                <button
                    type="button"
                    className="counter__btn"
                    onClick={() => setCount((c) => c - step)}
                    aria-label="Зменшити"
                >
                    −
                </button>
                <span className="counter__value">{count}</span>
                <button
                    type="button"
                    className="counter__btn"
                    onClick={() => setCount((c) => c + step)}
                    aria-label="Збільшити"
                >
                    +
                </button>
            </div>
            <button type="button" className="counter__reset" onClick={() => setCount(initial)}>
                Скинути
            </button>
        </div>
    )
}