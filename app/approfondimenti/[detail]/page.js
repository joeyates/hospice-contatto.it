import Image from 'next/image'

import Body from '@components/Body'
import Main from '@components/Main'
import Title from '@components/Title'
import {queryFragment as bodyQueryFragment} from '@lib/body'
import {request as datoCMSRequest} from '@lib/datocms'
import {build as buildMetadata} from '@lib/metadata'
import responsiveImage from '@lib/responsiveImage'
import styles from './page.module.sass'

const DETAILS_QUERY = `
query {
  allDetails {
    id
    slug
  }
}
`

const QUERY = `
query Detail($slug: String!) {
  detail(filter: {slug: {eq: $slug}}) {
    id
    slug
    title
    ${bodyQueryFragment}
  }
}
`

const getData = async (slug) => {
  return await datoCMSRequest({
    query: QUERY,
    variables: {slug}
  })
}

const Page = async ({params: {detail}}) => {
  const page = await getData(detail)

  return (
    <Main>
      <Title title={page.detail.title}/>
      <Body data={page.detail.body}/>
    </Main>
  )
}

const generateMetadata = async ({params, searchParams}) => {
  const page = await getData(params.detail)
  return buildMetadata({title: page.detail.title})
}

const generateStaticParams = async () => {
  const details = await request({
    query: DETAILS_QUERY
  })

  return details.allDetails.map(e => (
    {detail: e.slug}
  ))
}

export {generateMetadata}
export default Page
