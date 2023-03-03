import Main from '@components/Main'
import Title from '@components/Title'
import {parseDate, request as datoCMSRequest} from '@lib/datocms'
import {dateWithOptionalTime as formatDateWithOptionalTime} from '@lib/format'
import {build as buildMetadata} from '@lib/metadata'
import styles from './page.module.sass'

const QUERY = `
query DiaryEntries {
  allDiaryEntries(orderBy: date_ASC) {
    id
    date
    place
    text
  }
}
`

const getData = async () => {
  return await datoCMSRequest({query: QUERY})
}

const Page = async () => {
  const pages = await getData()

  return (
    <Main>
      <Title title="Diario"/>
      <ul className={styles.entries}>
        {pages.allDiaryEntries.map(e => {
          const date = formatDateWithOptionalTime(parseDate(e.date))
          return <>
            <li key={`entry-${e.id}`} className={styles.entry}>
              <div className={styles.title}>
                {`${date}${e.place !== "" && ` — ${e.place}` || ''}`}
              </div>
              <div>{e.text}</div>
            </li>
          </>
        })}
      </ul>
    </Main>
  )
}

const metadata = buildMetadata({title: 'Diario'})

export {metadata}
export default Page
