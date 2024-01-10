import Link from 'next/link'

import Main from '@components/Main'
import Title from '@components/Title'
import {parseDate, request as datoCMSRequest} from '@lib/datocms'
import {entryCountToPageCount} from '@lib/diary'
import {dateWithOptionalTime as formatDateWithOptionalTime} from '@lib/format'
import styles from './DiaryPage.module.sass'

const QUERY = `
query DiaryEntries($skip: IntType!) {
  allDiaryEntries(orderBy: date_ASC, skip: $skip, first: "5") {
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

const Pagination = ({page, count}) => {
  const current = parseInt(page)
  let first
  let previous
  if (current > 1) {
    first = <Link href="/diario">|&lt;</Link>
    const href = (current === 2) ? '/diario' : `/diario/${current - 1}`
    previous = <Link href={href}>&lt;</Link>
  } else {
    first = <div className={styles.disabled}>|&lt;</div>
    previous = <div className={styles.disabled}>&lt;</div>
  }
  const max = parseInt(count)
  let last
  let next
  if (current < max) {
    last = <Link href={`/diario/${count}`}>&gt;|</Link>
    const href = `/diario/${current + 1}`
    next = <Link href={href}>&gt;</Link>
  } else {
    last = <div className={styles.disabled}>&gt;|</div>
    next = <div className={styles.disabled}>&gt;</div>
  }
  return (
    <div className={styles.pagination}>
      <div>
        {first}
        &nbsp;
        &nbsp;
        {previous}
        &nbsp;
        &nbsp;
        <p>{current}</p>
        &nbsp;
        &nbsp;
        {next}
        &nbsp;
        &nbsp;
        {last}
      </div>
    </div>
  )
}

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
      <Pagination page={page} count={count}/>
    </Main>
  )
}

export default DiaryPage
