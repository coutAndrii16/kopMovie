interface SearchInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export default function SearchInput({ value, onChange, placeholder = 'Пошук за назвою' }: SearchInputProps) {
    return (
        <input
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-md border border-border bg-surface2 px-3 py-1.5 text-sm text-ink placeholder:text-muted focus:border-indigo focus:outline-none"
        />
    )
}