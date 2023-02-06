import Head from 'next/head'
import { StructuredText } from 'react-datocms'

import { request } from '../../lib/datocms'
import Footer from '@/components/footer'
import styles from './come-sostenerci.module.sass'

const QUERY = `
query {
  giveSupport {
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

const GiveSupport = ({ page }) => {
  return (
    <>
      <Head>
        <title>{page.giveSupport.title}</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{page.giveSupport.title}</h1>
        <div className={styles.body}>
          <StructuredText data={page.giveSupport.body}/>
        </div>
        <Footer layout={page.layout}/>
      </main>
    </>
  )
}

const getStaticProps = async () => {
  const page = await request({
    query: QUERY
  })

  return {
    props: { page }
  }
}

export { getStaticProps }
export default GiveSupport
