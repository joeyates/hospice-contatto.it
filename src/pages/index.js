import Head from 'next/head'
import { StructuredText } from 'react-datocms'

import { request } from '../../lib/datocms'
import Footer from '@/components/footer'
import styles from './Home.module.sass'

const HOMEPAGE_QUERY = `
query HomePage {
  home {
    title
    subtitle
    body {
      blocks
      links
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

const HomePage = ({page}) => {
  return (
    <>
      <Head>
        <title>{page.home.title}</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{page.home.title}</h1>
        <h2 className={styles.subtitle}>{page.home.subtitle}</h2>
        <div className={styles.body}>
          <StructuredText data={page.home.body}/>
        </div>
        <Footer layout={page.layout}/>
      </main>
    </>
  )
}

const getStaticProps = async () => {
  const page = await request({
    query: HOMEPAGE_QUERY
  })

  return {
    props: { page }
  }
}

export {getStaticProps}
export default HomePage
