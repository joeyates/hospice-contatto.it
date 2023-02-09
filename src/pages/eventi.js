import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from './eventi.module.sass'
import Footer from '@/components/footer'
import Main from '@/components/main'
import Title from '@/components/title'
import { parseDate, request } from '@/lib/datocms'
import { path as eventPath } from '@/lib/event'
import { date as formatDate } from '@/lib/format'
import responsiveImage from '@/lib/responsiveImage'

const EVENTS_QUERY = `
query {
  allEvents {
    id
    date
    slug
    title
    image {
      ${responsiveImage({width: 200, height: 200})}
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
            <li className={styles.event} key={`event-${e.id}`}>
              <Link href={eventPath(e)}>
                <p className={styles.text}>
                  <div className={styles.date}>{formatDate(parseDate(e.date))}</div>
                  <div className={styles.title}>{e.title}</div>
                </p>
                <Image {...e.image.responsiveImage}/>
              </Link>
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
