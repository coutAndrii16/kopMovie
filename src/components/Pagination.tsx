interface PaginationProps {
    page: number
    totalPages: number
    onChange: (page: number) => void
    disabled?: boolean
}

export default function Pagination({ page, totalPages, onChange, disabled = false }: PaginationProps) {
    const btn =
        'rounded-md border border-border px-3 py-1.5 text-sm transition-colors enabled:hover:border-indigo enabled:hover:text-indigo disabled:opacity-40'

    return (
        <div className="mt-4 flex items-center justify-between">
            <button type="button" className={btn} disabled={disabled || page <= 1} onClick={() => onChange(page - 1)}>
                Назад
            </button>
            <span className="text-sm text-muted tabular-nums">
        Сторінка {page} з {totalPages}
      </span>
            <button type="button" className={btn} disabled={disabled || page >= totalPages} onClick={() => onChange(page + 1)}>
                Далі
            </button>
        </div>
    )
}