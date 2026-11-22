interface YearFilterProps {
    value: number | null
    onChange: (year: number | null) => void
}

const currentYear = new Date().getFullYear()
const years = Array.from({ length: currentYear - 1979 }, (_, i) => currentYear - i)

export default function YearFilter({ value, onChange }: YearFilterProps) {
    return (
        <select
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))}
            className="rounded-md border border-border bg-surface2 px-2.5 py-1.5 text-sm text-ink focus:border-indigo focus:outline-none"
        >
            <option value="">Будь-який рік</option>
            {years.map((y) => (
                <option key={y} value={y}>
                    {y}
                </option>
            ))}
        </select>
    )
}