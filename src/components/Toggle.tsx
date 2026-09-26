interface ToggleProps {
    label: string
    isOn: boolean
    onToggle: () => void
    labelOff: string
    labelOn: string
}

export default function Toggle({ label, isOn, onToggle, labelOff, labelOn }: ToggleProps) {
    return (
        <div className="widget-card">
            <span className="widget-card__label">{label}</span>
            <button
                type="button"
                className={`toggle ${isOn ? 'toggle--on' : ''}`}
                role="switch"
                aria-checked={isOn}
                onClick={onToggle}
            >
        <span className="toggle__track">
          <span className="toggle__thumb" />
        </span>
                <span className="toggle__text">{isOn ? labelOn : labelOff}</span>
            </button>
        </div>
    )
}