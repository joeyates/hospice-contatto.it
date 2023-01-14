import Head from 'next/head'
import { StructuredText } from 'react-datocms'

import { request } from '../../lib/datocms'
import styles from '@/styles/Home.module.css'

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
    footer
  }
}
`

const HomePage = ({page}) => {
  return (
    <>
      <Head>
        <title>Progetto Con≈tatto</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{page.home.title}</h1>
        <h2 className={styles.title}>{page.home.subtitle}</h2>
        <StructuredText className={styles.body} data={ page.home.body } />
        <h2 className={styles.footer}>{page.home.footer}</h2>
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
