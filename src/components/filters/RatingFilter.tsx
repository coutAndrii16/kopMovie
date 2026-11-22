interface RatingFilterProps {
    value: number
    onChange: (value: number) => void
}

export default function RatingFilter({ value, onChange }: RatingFilterProps) {
    return (
        <label className="flex flex-col gap-1 text-sm text-muted">
      <span>
        Мінімальний рейтинг: <span className="tabular-nums text-ink">{value.toFixed(1)}</span>
      </span>
            <input
                type="range"
                min={0}
                max={9}
                step={0.5}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-48 accent-indigo"
            />
        </label>
    )
}