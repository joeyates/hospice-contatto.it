import Link from 'next/link'

import EventList from '@components/EventList'
import Main from '@components/Main'
import Title from '@components/Title'
import {isoDate, request as datoCMSRequest} from '@lib/datocms'
import responsiveImage from '@lib/responsiveImage'
import {build as buildMetadata} from '@lib/metadata'
import styles from './page.module.sass'

const QUERY = `
query FutureEvents($now: Date!) {
  allEvents(filter: {date: {gte: $now}}, orderBy: date_ASC) {
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
  const date = new Date
  const now = isoDate(date)
  return await datoCMSRequest({
    query: QUERY,
    variables: {now}
  })
}

const Page = async () => {
  const page = await getData()

  return (
    <Main>
      <Title title="Eventi"/>
      <EventList events={page.allEvents}/>
      <div className={styles['past-events']}>
        <Link href="/eventi/passati">Eventi passati -&gt;</Link>
      </div>
    </Main>
  )
}

const metadata = buildMetadata({title: 'Eventi'})

export {metadata}
export default Page
