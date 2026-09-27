interface ToggleProps {
    label: string
    isOn: boolean
    onToggle: () => void
    labelOff: string
    labelOn: string
}

export default function Toggle({ label, isOn, onToggle, labelOff, labelOn }: ToggleProps) {
    return (
        <div>
            <div className="text-sm text-muted">{label}</div>
            <button
                type="button"
                role="switch"
                aria-checked={isOn}
                onClick={onToggle}
                className="mt-2 flex items-center gap-2.5"
            >
        <span
            className={`relative h-5 w-9 rounded-full border border-border transition-colors ${
                isOn ? 'bg-indigo' : 'bg-surface2'
            }`}
        >
          <span
              className={`absolute top-0.5 h-3.5 w-3.5 rounded-full bg-ink transition-transform ${
                  isOn ? 'translate-x-[18px]' : 'translate-x-0.5'
              }`}
          />
        </span>
                <span className="text-sm">{isOn ? labelOn : labelOff}</span>
            </button>
        </div>
    )
}