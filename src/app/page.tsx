'use client'
import styles from "./page.module.css"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { BithdatesFetchStatus, fetchBirths, getBirthsList, getBirthsListError, getBirthsListState } from "@/lib/features/birthsSlice"
import { CallToActionButton } from "./components/callToActionButton"
import { BirthdateData } from "./components/birthdateDataLoader"
import { useCallback } from "react"

export default function Home() {
  const birthsList = useAppSelector(getBirthsList)
  const birthsListState = useAppSelector(getBirthsListState)
  const birthsListError = useAppSelector(getBirthsListError)

  const dispatch = useAppDispatch()
  const callTodaysBirths = useCallback(
    () => { dispatch(fetchBirths()) },
    [dispatch],
  )

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.introWrapper}>
          <h1>Whose birthday?</h1>
          <div className={styles.marginBottom}>
            <p>Do you know whose famous and historical birthdays are today?</p>
            <p>Click a button to find out!</p>
          </div>
          <CallToActionButton
            label="Find out!"
            onClick={callTodaysBirths}
            disabled={birthsListState === BithdatesFetchStatus.Loading}
          />
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.birthdateListWrapper}>
          <BirthdateData
            birthsListState={birthsListState}
            birthsList={birthsList}
            birthsListError={birthsListError}
          />
        </div>
      </div>
    </div>
  )
}
