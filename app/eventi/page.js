import Link from 'next/link'

import Main from '@components/Main'
import Title from '@components/Title'
import {parseDate, request as datoCMSRequest} from '@lib/datocms'
import {path as eventPath} from '@lib/event'
import {date as formatDate} from '@lib/format'
import responsiveImage from '@lib/responsiveImage'
import {build as buildMetadata} from '@lib/metadata'
import styles from './page.module.sass'

const QUERY = `
query {
  allEvents {
    id
    date
    slug
    title
    image {
      ${responsiveImage({width: 200})}
    }
  }
}
`

const getData = async () => {
  return await datoCMSRequest({query: QUERY})
}

const Page = async () => {
  const page = await getData()

  return (
    <Main>
      <Title title="Eventi"/>
      <ul className={styles.events}>
        {page.allEvents.map(e => (
          <li className={styles.event} key={`event-${e.id}`}>
            <Link className={styles['event-inner']} href={eventPath(e)}>
              <div className={styles.text}>
                <div className={styles.date}>{formatDate(parseDate(e.date))}</div>
                <div className={styles.title}>{e.title}</div>
              </div>
              <img alt={e.image.responsiveImage.alt} {...e.image.responsiveImage}/>
            </Link>
          </li>
        ))}
      </ul>
    </Main>
  )
}

const metadata = buildMetadata({title: 'Eventi'})

export {metadata}
export default Page
