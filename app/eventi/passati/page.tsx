import EventList from '@components/EventList'
import Main from '@components/Main'
import Title from '@components/Title'
import {isoDate, request} from '@lib/datocms'
import {type EventListItem} from '@lib/event.d'
import {eventListFragment} from '@lib/event'
import {createMetadata} from '@lib/info'
import {toOpenGraphImage} from '@lib/responsiveImage'

type PastEventsQuery = {allEvents: EventListItem[]}

const QUERY = `
query PastEvents($now: Date!) {
  allEvents(filter: {date: {lt: $now}}, orderBy: date_DESC) ${eventListFragment}
}
`

const getData = async () => {
  const date = new Date()
  const now = isoDate(date)
  return await request<PastEventsQuery>({
    query: QUERY,
    variables: {now}
  })
}

const Page = async () => {
  const page = await getData()

  return (
    <Main>
      <Title title='Eventi passati' />
      <EventList events={page.allEvents} />
    </Main>
  )
}

const generateMetadata = createMetadata(async () => {
  const page = await getData()
  const images = page.allEvents.map(e =>
    toOpenGraphImage(e.image.responsiveImage)
  )

  return {
    images,
    title: 'Eventi passati'
  }
})

export {generateMetadata}
export default Page
