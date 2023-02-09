import Head from 'next/head'

import Body from '@/components/body'
import Footer from '@/components/footer'
import Main from '@/components/main'
import Title from '@/components/title'
import { request } from '@/lib/datocms'
import styles from './index.module.sass'

const HOME_QUERY = `
query {
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

const Home = ({page}) => {
  return (
    <>
      <Head>
        <title>{page.home.title}</title>
      </Head>
      <Main>
        <Title title={page.home.title}/>
        <h2 className={styles.subtitle}>{page.home.subtitle}</h2>
        <Body data={page.home.body}/>
        <Footer layout={page.layout}/>
      </Main>
    </>
  )
}

const getStaticProps = async () => {
  const page = await request({
    query: HOME_QUERY
  })

  return {
    props: { page }
  }
}

export {getStaticProps}
export default Home
