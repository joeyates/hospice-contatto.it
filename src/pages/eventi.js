import Image from 'next/image'
import Link from 'next/link'

import Footer, {queryFragment as footerQueryFragment} from '@/components/footer'
import Head from '@/components/head'
import Main from '@/components/main'
import Title from '@/components/title'
import {parseDate, request} from '@/lib/datocms'
import {path as eventPath} from '@/lib/event'
import {date as formatDate} from '@/lib/format'
import responsiveImage from '@/lib/responsiveImage'
import styles from './eventi.module.sass'

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
  ${footerQueryFragment}
}
`

const Events = ({pages}) => (
  <>
    <Head title="Eventi"/>
    <Main>
      <Title title="Eventi"/>
      <ul className={styles.events}>
        {pages.allEvents.map(e => (
          <li className={styles.event} key={`event-${e.id}`}>
            <Link className={styles['event-inner']} href={eventPath(e)}>
              <div className={styles.text}>
                <div className={styles.date}>{formatDate(parseDate(e.date))}</div>
                <div className={styles.title}>{e.title}</div>
              </div>
              <Image alt={e.image.responsiveImage.alt} {...e.image.responsiveImage}/>
            </Link>
          </li>
        ))}
      </ul>
      <Footer layout={pages.layout}/>
    </Main>
  </>
)

const getStaticProps = async (context) => {
  const pages = await request({
    query: EVENTS_QUERY,
  })

  return {
    props: {pages}
  }
}

export {getStaticProps}
export default Events
