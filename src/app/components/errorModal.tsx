import { useState } from "react"
import styles from "../page.module.css"
import { CallToActionButton } from "./callToActionButton"

interface ErrorModalProps {
  errorMessage: string | undefined
  reloadData: () => void
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ errorMessage, reloadData }) => {
  const [open, setOpen] = useState(true)

  if (open) {
    return (
      <div className={styles.modalWrapper}>
        <div className={styles.errorModal} aria-label="errorModal">
          <div className={styles.marginBottom}>
            <h3>Something went wrong :( </h3>
            <p>Error: {errorMessage}</p>
          </div>
          <div className={styles.callToActionWrapper}>
            <CallToActionButton
              label="Try again"
              onClick={reloadData}
            />
            <CallToActionButton
              label="Close"
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      </div>
    )
  }
}