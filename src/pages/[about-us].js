import Head from 'next/head'
import { StructuredText } from 'react-datocms'

import { request } from '../../lib/datocms'
import styles from './about-us.module.sass'

const ABOUT_US_QUERY = `
query {
  about {
    id
    title
    body {
      value
    }
  }
}
`

const AboutUs = ({ page }) => {
  return (
    <>
      <Head>
        <title>{page.about.title}</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{page.about.title}</h1>
        <div className={styles.body}>
          <StructuredText data={page.about.body}/>
        </div>
      </main>
    </>
  )
}

const getStaticPaths = async () => {
  return {
    paths: [{ params: { 'about-us': 'chi-siamo' } }],
    fallback: false
  }
}

const getStaticProps = async () => {
  const page = await request({
    query: ABOUT_US_QUERY
  })

  return {
    props: { page }
  }
}

export { getStaticPaths, getStaticProps }
export default AboutUs
