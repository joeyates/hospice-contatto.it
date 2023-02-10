import Image from 'next/image'

import Body, {queryFragment as bodyQueryFragment} from '@/components/body'
import Footer, {queryFragment as footerQueryFragment} from '@/components/footer'
import Head from '@/components/head'
import Main from '@/components/main'
import Title from '@/components/title'
import {request} from '@/lib/datocms'
import styles from './index.module.sass'

const HOME_QUERY = `
query {
  home {
    title
    subtitle
    ${bodyQueryFragment}
  }
  ${footerQueryFragment}
}
`

const Home = ({page}) => (
  <>
    <Head/>
    <Main>
      <Title title={page.home.title}/>
      <h2 className={styles.subtitle}>{page.home.subtitle}</h2>
      <Body data={page.home.body}/>
      <Footer layout={page.layout}/>
    </Main>
  </>
)

const getStaticProps = async () => {
  const page = await request({
    query: HOME_QUERY
  })

  return {
    props: {page}
  }
}

export {getStaticProps}
export default Home
