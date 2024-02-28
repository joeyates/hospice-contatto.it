import Link from 'next/link'

import EventList from '@components/EventList'
import Main from '@components/Main'
import Title from '@components/Title'
import {isoDate, request} from '@lib/datocms'
import {eventListFragment} from '@schema/event'
import {createMetadata} from '@schema/info'
import {toOpenGraphImage} from '@lib/responsiveImage'
import {type EventListItem} from '@schema/event.d'
import styles from './page.module.sass'

type FutureEventsQuery = {futureEvents: EventListItem[]}

const QUERY = `
query Events($now: Date!) {
  futureEvents: allEvents(filter: {date: {gte: $now}}, orderBy: date_DESC) ${eventListFragment}
}
`

const getData = async () => {
  const date = new Date()
  const now = isoDate(date)
  return await request<FutureEventsQuery>({
    query: QUERY,
    variables: {now}
  })
}

const Page = async () => {
  const page = await getData()

  return (
    <Main>
      <Title title='Eventi' />
      <EventList events={page.futureEvents} />
      <div className={styles['past-events']}>
        <Link href='/eventi/passati'>Eventi passati -&gt;</Link>
      </div>
    </Main>
  )
}

const generateMetadata = createMetadata(async () => {
  const page = await getData()
  const images = page.futureEvents.map(e =>
    toOpenGraphImage(e.image.responsiveImage)
  )

  return {
    images,
    title: 'Eventi',
    foo: 'bar'
  }
})

export {generateMetadata}
export default Page
