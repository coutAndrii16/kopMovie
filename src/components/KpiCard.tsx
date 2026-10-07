interface KpiCardProps {
    label: string
    value: string | number
    change?: string
    color?: 'neutral' | 'gold' | 'indigo'
}

const colorClass: Record<NonNullable<KpiCardProps['color']>, string> = {
    neutral: 'text-ink',
    gold: 'text-gold',
    indigo: 'text-indigo',
}

// відокремлюється від сусіда бордером зліва, а не власною рамкою
export default function KpiCard({ label, value, change, color = 'neutral' }: KpiCardProps) {
    return (
        <div className="flex-1 px-5 py-4 first:pl-0 border-l border-border first:border-l-0">
            <div className={`text-2xl font-bold tabular-nums ${colorClass[color]}`}>{value}</div>
            <div className="mt-1 text-sm text-muted">{label}</div>
            {change && <div className="text-xs text-muted/70">{change}</div>}
        </div>
    )
}