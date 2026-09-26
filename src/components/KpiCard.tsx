interface KpiCardProps {
    label: string
    value: string | number
    change?: string
    tone?: 'neutral' | 'gold' | 'crimson'
}

export default function KpiCard({ label, value, change, tone = 'neutral' }: KpiCardProps) {
    return (
        <div className={`kpi-card kpi-card--${tone}`}>
            <span className="kpi-card__label">{label}</span>
            <span className="kpi-card__value">{value}</span>
            {change && <span className="kpi-card__change">{change}</span>}
        </div>
    )
}