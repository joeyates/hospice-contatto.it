import Head from 'next/head'

import Body, {queryFragment as bodyQueryFragment} from '@/components/body'
import Footer, {queryFragment as footerQueryFragment} from '@/components/footer'
import Main from '@/components/main'
import Title from '@/components/title'
import {request} from '@/lib/datocms'
import styles from './contatti.module.sass'

const QUERY = `
query {
  contact {
    id
    title
    ${bodyQueryFragment}
  }
  ${footerQueryFragment}
}
`

const Contact = ({page}) => (
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

const getStaticProps = async () => {
  const page = await request({
    query: QUERY
  })

  return {
    props: {page}
  }
}

export {getStaticProps}
export default Contact
