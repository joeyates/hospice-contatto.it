import Head from 'next/head'
import { StructuredText } from 'react-datocms'

import { request } from '../../lib/datocms'
import Footer from '@/components/footer'
import styles from './chi-siamo.module.sass'

const ABOUT_US_QUERY = `
query {
  about {
    id
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
        <Footer layout={page.layout}/>
      </main>
    </>
  )
}

const getStaticProps = async () => {
  const page = await request({
    query: ABOUT_US_QUERY
  })

  return {
    props: { page }
  }
}

export { getStaticProps }
export default AboutUs
