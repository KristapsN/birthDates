import styles from "../page.module.css"

interface CallToActionButton {
  label: string
  onClick: () => void
  disabled?: boolean
}

export const CallToActionButton: React.FC<CallToActionButton> = ({
  label,
  onClick,
  disabled = false
}) => (
  <button
    className={styles.callToAction}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
)
