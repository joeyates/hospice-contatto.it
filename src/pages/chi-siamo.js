import Head from 'next/head'

import { request } from '../../lib/datocms'
import Body from '@/components/body'
import Footer from '@/components/footer'
import Main from '@/components/main'
import Title from '@/components/title'
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
      <Main>
        <Title title={page.about.title}/>
        <Body data={page.about.body}/>
        <Footer layout={page.layout}/>
      </Main>
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
