import Image from 'next/image'

import Body from '@components/Body'
import Main from '@components/Main'
import Title from '@components/Title'
import {queryFragment as bodyQueryFragment} from '@lib/body'
import {parseDate, request as datoCMSRequest} from '@lib/datocms'
import {datedSlug, datedSlugToSlug} from '@lib/event'
import {date as formatDate} from '@lib/format'
import {build as buildMetadata} from '@lib/metadata'
import responsiveImage from '@lib/responsiveImage'
import styles from './page.module.sass'

const EVENTS_QUERY = `
query {
  allEvents {
    id
    date
    slug
  }
}
`

const QUERY = `
query Event($slug: String!) {
  event(filter: {slug: {eq: $slug}}) {
    id
    date
    title
    image {
      ${responsiveImage({width: 600})}
    }
    ${bodyQueryFragment}
  }
}
`

const getData = async (slug) => {
  return await datoCMSRequest({
    query: QUERY,
    variables: {slug}
  })
}

const Page = async ({params: {event}}) => {
  const slug = datedSlugToSlug(event)
  const page = await getData(slug)
  const date = parseDate(page.event.date)

  return (
    <Main>
      <Title title={page.event.title}/>
      <p className={styles.date}>{formatDate(date)}</p>
      <Body data={page.event.body}/>
    </Main>
  )
}

const generateMetadata = async ({params, searchParams}) => {
  const slug = datedSlugToSlug(params.event)
  const page = await getData(slug)
  return buildMetadata({title: page.event.title})
}

const generateStaticParams = async () => {
  const events = await datoCMSRequest({
    query: EVENTS_QUERY
  })

  return events.allEvents.map(e => {
    const path = datedSlug(e)
    return {event: path}
  })
}

export {generateMetadata, generateStaticParams}
export default Page
