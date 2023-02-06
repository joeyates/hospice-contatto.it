import Head from 'next/head'
import { StructuredText } from 'react-datocms'

import { request } from '../../lib/datocms'
import Footer from '@/components/footer'
import styles from './contatti.module.sass'

const QUERY = `
query {
  contact {
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

const Contact = ({ page }) => {
  return (
    <>
      <Head>
        <title>{page.contact.title}</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{page.contact.title}</h1>
        <div className={styles.body}>
          <StructuredText data={page.contact.body}/>
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
export default Contact
