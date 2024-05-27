import styles from "../page.module.css"

export const Loader: React.FC = () => (
  <div className={styles.loaderWrapper}>
    <span aria-label='loader' className={styles.loader}></span>
    <span>Loading...</span>
  </div>
)
