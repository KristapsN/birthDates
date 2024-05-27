import { Births, BithdatesFetchStatus, fetchBirths } from "@/lib/features/birthsSlice"
import styles from "../page.module.css"
import { Loader } from "./loader"
import { ErrorModal } from "./errorModal"
import { useAppDispatch } from "@/lib/hooks"

interface BirthdateDataProps {
  birthsListState: string | undefined
  birthsList: Births[]
  birthsListError: string | undefined
}

export const BirthdateData: React.FC<BirthdateDataProps> = ({birthsListState, birthsList, birthsListError}) => {
  const dispatch = useAppDispatch()
  const callTodaysBirths = () => { dispatch(fetchBirths()) }
  
  switch (birthsListState) {
    case BithdatesFetchStatus.Loading:
      return <Loader/>
    case BithdatesFetchStatus.Success:
      return (
        <div className={styles.birthdateList} area-label='birthdateList'>
          {birthsList.slice().sort((a, b) => parseInt(b.year) - parseInt(a.year)).map((item, index) => (
            <div className={styles.birthdateItem} key={index}>
              <p className={styles.birthdateYear}>{item.year}</p>
              <p>{item.text}</p>
            </div>
          ))
          }
        </div>
      )
    case BithdatesFetchStatus.Failed:
      return <ErrorModal errorMessage={birthsListError} reloadData={callTodaysBirths} />
    default:
      return <img className={styles.mainImage} src='/cake.png' alt={'cake'}></img>
  }
}
