import Head from 'next/head'
import Link from 'next/link'

import styles from './eventi.module.sass'
import Footer from '@/components/footer'
import Main from '@/components/main'
import Title from '@/components/title'
import { request } from '@/lib/datocms'

const EVENTS_QUERY = `
query {
  allEvents {
    id
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
          {pages.allEvents.map(p => (
            <li key={`event-${p.id}`}>
              <Link href={`/eventi/${p.slug}`}>{p.title}</Link>
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
