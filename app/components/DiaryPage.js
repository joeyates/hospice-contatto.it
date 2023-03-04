import Link from 'next/link'

import Main from '@components/Main'
import Title from '@components/Title'
import {parseDate, request as datoCMSRequest} from '@lib/datocms'
import {dateWithOptionalTime as formatDateWithOptionalTime} from '@lib/format'
import {build as buildMetadata} from '@lib/metadata'
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

const PAGINATION_QUERY = `
query DiaryMetadata {
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

const entryCountToPageCount = (entries) => Math.floor((entries - 1) / 5) + 1

const pageCount = async () => {
  const metadata = await datoCMSRequest({
    query: PAGINATION_QUERY
  })

  const entries = metadata._allDiaryEntriesMeta.count
  return entryCountToPageCount(entries)
}

const Pagination = ({page, count}) => {
  const current = parseInt(page)
  let previous
  if (current > 1) {
    const href = (current === 2) ? '/diario' : `/diario/${current - 1}`
    previous = <Link href={href}>&lt;</Link>
  } else {
    previous = <div className={styles.disabled}>&lt;</div>
  }
  const max = parseInt(count)
  let next
  if (current < max) {
    const href = `/diario/${current + 1}`
    next = <Link href={href}>&gt;</Link>
  } else {
    next = <div className={styles.disabled}>&gt;</div>
  }
  return (
    <div className={styles.pagination}>
      <div>
        {previous}
        &nbsp;
        <p>{current}</p>
        &nbsp;
        {next}
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

const metadata = ({page}) => buildMetadata({title: `Diario - pagina ${page}`})

export {metadata, pageCount}
export default DiaryPage
