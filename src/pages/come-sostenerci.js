import Head from 'next/head'

import { request } from '../../lib/datocms'
import Body from '@/components/body'
import Footer from '@/components/footer'
import Main from '@/components/main'
import Title from '@/components/title'
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
      <Main>
        <Title title={page.giveSupport.title}/>
        <Body data={page.giveSupport.body}/>
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
export default GiveSupport
