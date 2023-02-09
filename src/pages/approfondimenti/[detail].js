import Head from 'next/head'
import Image from 'next/image'

import Body, {queryFragment as bodyQueryFragment} from '@/components/body'
import Footer, {queryFragment as footerQueryFragment} from '@/components/footer'
import Main from '@/components/main'
import Title from '@/components/title'
import {request} from '@/lib/datocms'
import responsiveImage from '@/lib/responsiveImage'
import styles from './detail.module.sass'

const DETAILS_QUERY = `
query {
  allDetails {
    id
    slug
  }
}
`

const DETAIL_QUERY = `
query Detail($slug: String!) {
  detail(filter: {slug: {eq: $slug}}) {
    id
    slug
    title
    ${bodyQueryFragment}
  }
  ${footerQueryFragment}
}
`

const Detail = ({page}) => (
  <>
    <Head>
      <title>{page.detail.title}</title>
    </Head>
    <Main>
      <Title title={page.detail.title}/>
      <Body data={page.detail.body}/>
      <Footer layout={page.layout}/>
    </Main>
  </>
)

const getStaticPaths = async () => {
  const details = await request({
    query: DETAILS_QUERY
  })

  const paths = details.allDetails.map(e => (
    {params: {detail: e.slug}}
  ))

  return {
    paths, fallback: false
  }
}

const getStaticProps = async (context) => {
  const slug = context.params.detail
  const page = await request({
    query: DETAIL_QUERY,
    variables: {slug}
  })

  return {
    props: {page}
  }
}

export {getStaticPaths, getStaticProps}
export default Detail
