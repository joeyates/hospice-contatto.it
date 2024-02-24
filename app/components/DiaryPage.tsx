import Main from '@components/Main'
import Pagination from '@components/Pagination'
import type {LinkBuilder} from '@components/Pagination.d'
import Title from '@components/Title'
import {parseDate, request} from '@lib/datocms'
import {entryCountToPageCount, PAGE_SIZE} from '@lib/diary'
import {type DiaryEntry} from '@lib/diary.d'
import {dateWithOptionalTime as formatDateWithOptionalTime} from '@lib/format'

import type {DiaryPage} from './DiaryPage.d'
import styles from './DiaryPage.module.sass'

type DiaryEntriesPageQuery = {
  allDiaryEntries: DiaryEntry[]
  _allDiaryEntriesMeta: {
    count: number
  }
}

const QUERY = `
query DiaryEntriesPage($skip: IntType!, $first: IntType!) {
  allDiaryEntries(orderBy: date_DESC, skip: $skip, first: $first) {
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
  const skip = (page - 1) * PAGE_SIZE
  return await request<DiaryEntriesPageQuery>({
    query: QUERY,
    variables: {skip, first: PAGE_SIZE}
  })
}

const pageToPath: LinkBuilder = page => (page === 1 ? '/diario' : `/diario/${page}`)

const Entry = ({date, place, text}) => {
  const formattedDate = formatDateWithOptionalTime(parseDate(date))
  return (
    <li className={styles.entry}>
      <div className={styles.title}>
        {`${formattedDate}${(place !== '' && ` — ${place}`) || ''}`}
      </div>
      <div>{text}</div>
    </li>
  )
}

const DiaryPage: DiaryPage = async ({page}) => {
  const currentPage: number = parseInt(page)
  const pages = await getData({page: currentPage})
  const entries = pages._allDiaryEntriesMeta.count
  const count = entryCountToPageCount(entries)
  return (
    <Main>
      <Title title={`Diario - pagina ${page}`} />
      <ul className={styles.entries}>
        {pages.allDiaryEntries.map(e => <Entry key={`entry-${e.id}`} {...e} />)}
      </ul>
      <Pagination currentPage={currentPage} pageCount={count} linkBuilder={pageToPath} />
    </Main>
  )
}

export default DiaryPage
