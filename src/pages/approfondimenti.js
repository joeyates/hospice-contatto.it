import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Body, {queryFragment as bodyQueryFragment} from '@/components/body'
import Footer, {queryFragment as footerQueryFragment} from '@/components/footer'
import Main from '@/components/main'
import Title from '@/components/title'
import {request} from '@/lib/datocms'
import responsiveImage from '@/lib/responsiveImage'
import styles from './approfondimenti.module.sass'

const DETAILS_QUERY = `
query {
  allDetails {
    id
    slug
    title
    ${bodyQueryFragment}
  }
  ${footerQueryFragment}
}
`

const Details = ({pages}) => (
  <>
    <Head>
      <title>Approfondimenti</title>
    </Head>
    <Main>
      <Title title="Approfondimenti"/>
      <ul className={styles.details}>
        {pages.allDetails.map(d => (
          <li className={styles.detail} key={`detail-${d.id}`}>
            <Link className={styles['detail-inner']} href={`/approfondimenti/${d.slug}`}>
              <div className={styles.text}>
                <div className={styles.title}>{d.title}</div>
              </div>
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
    query: DETAILS_QUERY,
  })

  return {
    props: {pages}
  }
}

export {getStaticProps}
export default Details
