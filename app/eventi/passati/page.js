import Link from 'next/link'

import EventList from '@components/EventList'
import Main from '@components/Main'
import Title from '@components/Title'
import {isoDate, request as datoCMSRequest} from '@lib/datocms'
import {createMetadata} from '@lib/info'
import responsiveImage from '@lib/responsiveImage'

const QUERY = `
query PastEvents($now: Date!) {
  allEvents(filter: {date: {lt: $now}}, orderBy: date_DESC) {
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
      <Title title="Eventi passati"/>
      <EventList events={page.allEvents}/>
    </Main>
  )
}

const generateMetadata = createMetadata({title: 'Eventi passati'})

export {generateMetadata}
export default Page
