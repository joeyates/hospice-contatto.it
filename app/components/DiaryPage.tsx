import Main from '@components/Main'
import Pagination from '@components/Pagination'
import type {LinkBuilder} from '@components/Pagination.d'
import Title from '@components/Title'
import {metadataFragment, parseDate, request} from '@lib/datocms'
import {type RecordsMeta} from '@lib/datocms.d'
import {diaryEntryFragment, extractPageCount, PAGE_SIZE} from '@schema/diary'
import {type DiaryEntry} from '@schema/diary.d'
import {dateWithOptionalTime as formatDateWithOptionalTime} from '@lib/format'
import type {DiaryPage} from './DiaryPage.d'
import styles from './DiaryPage.module.sass'

type DiaryEntriesAndPaginationQuery = {
  allDiaryEntries: DiaryEntry[]
  _allDiaryEntriesMeta: RecordsMeta
}

const QUERY = `
query DiaryEntriesPage($skip: IntType!, $first: IntType!) {
  allDiaryEntries(orderBy: date_DESC, skip: $skip, first: $first) ${diaryEntryFragment}
  _allDiaryEntriesMeta ${metadataFragment}
}
`

const getData = async ({page}) => {
  const skip = (page - 1) * PAGE_SIZE
  return await request<DiaryEntriesAndPaginationQuery>({
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
  const query = await getData({page: currentPage})
  const count = extractPageCount(query)
  return (
    <Main>
      <Title title={`Diario - pagina ${page}`} />
      <ul className={styles.entries}>
        {query.allDiaryEntries.map(e => <Entry key={`entry-${e.id}`} {...e} />)}
      </ul>
      <Pagination currentPage={currentPage} pageCount={count} linkBuilder={pageToPath} perPage={PAGE_SIZE} />
    </Main>
  )
}

export default DiaryPage
