import Head from 'next/head'
import Link from 'next/link'

import styles from './eventi.module.sass'
import Footer from '@/components/footer'
import Main from '@/components/main'
import Title from '@/components/title'
import { request } from '@/lib/datocms'
import { path as eventPath } from '@/lib/event'

const EVENTS_QUERY = `
query {
  allEvents {
    id
    date
    slug
    title
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

const Events = ({ pages }) => {
  return (
    <>
      <Head>
        <title>Eventi</title>
      </Head>
      <Main>
        <Title title="Eventi"/>
        <ul className={styles.events}>
          {pages.allEvents.map(e => (
            <li key={`event-${e.id}`}>
              <Link href={eventPath(e)}>{e.title}</Link>
            </li>
          ))}
        </ul>
        <Footer layout={pages.layout}/>
      </Main>
    </>
  )
}

const getStaticProps = async (context) => {
  const pages = await request({
    query: EVENTS_QUERY,
  })

  return {
    props: { pages }
  }
}

export { getStaticProps }
export default Events
