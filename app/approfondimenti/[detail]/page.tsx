import Body from '@components/Body'
import Main from '@components/Main'
import Title from '@components/Title'
import {request, recordLinkFragment} from '@lib/datocms'
import {type RecordLink} from '@lib/datocms.d'
import {detailFragment} from '@lib/detail'
import {type Detail} from '@lib/detail.d'
import {buildTitle, createMetadata} from '@lib/info'

type AllDetailsQuery = {allDetails: RecordLink[]}

const DETAILS_QUERY = `query { allDetails ${recordLinkFragment} }`

type DetailQuery = {detail: Detail}

const QUERY = `
query Detail($slug: String!) {
  detail(filter: {slug: {eq: $slug}}) ${detailFragment}
}
`

const getData = async (slug: string) => {
  return await request<DetailQuery>({
    query: QUERY,
    variables: {slug}
  })
}

const Page = async ({params: {detail}}) => {
  const page = await getData(detail)

  return (
    <Main>
      <Title title={page.detail.title} />
      <Body data={page.detail.body} />
    </Main>
  )
}

const generateMetadata = createMetadata(async ({defaults, props}) => {
  const page = await getData(props.params.detail)

  return {title: buildTitle({defaults, title: page.detail.title})}
})

const generateStaticParams = async () => {
  const details = await request<AllDetailsQuery>({
    query: DETAILS_QUERY
  })

  return details.allDetails.map(e => ({detail: e.slug}))
}

export {generateMetadata, generateStaticParams}
export default Page
