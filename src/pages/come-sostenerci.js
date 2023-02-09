import Head from 'next/head'

import Body, {queryFragment as bodyQueryFragment} from '@/components/body'
import Footer, {queryFragment as footerQueryFragment} from '@/components/footer'
import Main from '@/components/main'
import Title from '@/components/title'
import {request} from '@/lib/datocms'
import styles from './come-sostenerci.module.sass'

const QUERY = `
query {
  giveSupport {
    id
    title
    ${bodyQueryFragment}
  }
  ${footerQueryFragment}
}
`

const GiveSupport = ({page}) => (
  <>
    <Head>
      <title>{page.giveSupport.title}</title>
    </Head>
    <Main>
      <Title title={page.giveSupport.title}/>
      <Body data={page.giveSupport.body}/>
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
export default GiveSupport
