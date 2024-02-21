import Main from '@components/Main'
import Pagination from '@components/Pagination'
import Title from '@components/Title'
import {parseDate, request as datoCMSRequest} from '@lib/datocms'
import {entryCountToPageCount} from '@lib/diary'
import {dateWithOptionalTime as formatDateWithOptionalTime} from '@lib/format'
import styles from './DiaryPage.module.sass'

const QUERY = `
query DiaryEntries($skip: IntType!) {
  allDiaryEntries(orderBy: date_DESC, skip: $skip, first: "5") {
    id
    date
    place
    text
  }
  _allDiaryEntriesMeta {
    count
  }
}
`

const getData = async ({page}) => {
  const skip = (page - 1) * 5
  return await datoCMSRequest({
    query: QUERY,
    variables: {skip}
  })
}

const pageToPath = page => page === 1 ? '/diario' : `/diario/${page}`

const DiaryPage = async ({page}) => {
  const pages = await getData({page})
  const entries = pages._allDiaryEntriesMeta.count
  const count = entryCountToPageCount(entries)
  return (
    <Main>
      <Title title={`Diario - pagina ${page}`}/>
      <ul className={styles.entries}>
        {pages.allDiaryEntries.map(e => {
          const date = formatDateWithOptionalTime(parseDate(e.date))
          return (
            <li key={`entry-${e.id}`} className={styles.entry}>
              <div className={styles.title}>
                {`${date}${e.place !== "" && ` — ${e.place}` || ''}`}
              </div>
              <div>{e.text}</div>
            </li>
          )
        })}
      </ul>
      <Pagination page={page} count={count} path={pageToPath}/>
    </Main>
  )
}

export default DiaryPage
