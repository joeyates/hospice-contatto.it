import Head from 'next/head'

import Body, {queryFragment as bodyQueryFragment} from '@/components/body'
import Footer from '@/components/footer'
import Main from '@/components/main'
import Title from '@/components/title'
import { request } from '@/lib/datocms'
import styles from './contatti.module.sass'

const QUERY = `
query {
  contact {
    id
    title
    ${bodyQueryFragment}
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
      <Main>
        <Title title={page.contact.title}/>
        <Body data={page.contact.body}/>
        <Footer layout={page.layout}/>
      </Main>
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
