export function formatRating(value: number, asPercent: boolean): string {
    return asPercent ? `${Math.round(value * 10)}%` : value.toFixed(1)
}