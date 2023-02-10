import Image from 'next/image'

import Body, {queryFragment as bodyQueryFragment} from '@/components/body'
import Footer, {queryFragment as footerQueryFragment} from '@/components/footer'
import Head from '@/components/head'
import Main from '@/components/main'
import Title from '@/components/title'
import {parseDate, request} from '@/lib/datocms'
import {datedSlug, datedSlugToSlug} from '@/lib/event'
import {date as formatDate} from '@/lib/format'
import responsiveImage from '@/lib/responsiveImage'
import styles from './event.module.sass'

const EVENTS_QUERY = `
query {
  allEvents {
    id
    date
    slug
  }
}
`

const EVENT_QUERY = `
query Event($slug: String!) {
  event(filter: {slug: {eq: $slug}}) {
    id
    date
    title
    image {
      ${responsiveImage({width: 600, height: 600})}
    }
    ${bodyQueryFragment}
  }
  ${footerQueryFragment}
}
`

const Event = ({page}) => {
  const date = parseDate(page.event.date)
  return (
    <>
      <Head title={page.event.title}/>
      <Main>
        <Title title={page.event.title}/>
        <p className={styles.date}>{formatDate(date)}</p>
        <Body data={page.event.body}/>
        <Footer layout={page.layout}/>
      </Main>
    </>
  )
}

const getStaticPaths = async () => {
  const events = await request({
    query: EVENTS_QUERY
  })

  const paths = events.allEvents.map(e => {
    const path = datedSlug(e)
    return {params: {event: path}}
  })

  return {
    paths, fallback: false
  }
}

const getStaticProps = async (context) => {
  const slug = datedSlugToSlug(context.params.event)
  const page = await request({
    query: EVENT_QUERY,
    variables: {slug}
  })

  return {
    props: {page}
  }
}

export {getStaticPaths, getStaticProps}
export default Event
