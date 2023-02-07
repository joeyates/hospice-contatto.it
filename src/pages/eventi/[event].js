import Head from 'next/head'

import Body from '@/components/body'
import Footer from '@/components/footer'
import Main from '@/components/main'
import Title from '@/components/title'
import { request } from '@/lib/datocms'
import { datedSlug, datedSlugToSlug } from '@/lib/event'
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
    body {
      value
    }
  }
  layout {
    footer {
      blocks
      links
      value
    }
  }
}
`

const Event = ({ page }) => {
  return (
    <>
      <Head>
        <title>{page.event.title}</title>
      </Head>
      <Main>
        <Title title={page.event.title}/>
        <p>{page.event.date}</p>
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
    return { params: { event: path } }
  })

  return {
    paths, fallback: false
  }
}

const getStaticProps = async (context) => {
  const slug = datedSlugToSlug(context.params.event)
  const page = await request({
    query: EVENT_QUERY,
    variables: { slug }
  })

  return {
    props: { page }
  }
}

export { getStaticPaths, getStaticProps }
export default Event
