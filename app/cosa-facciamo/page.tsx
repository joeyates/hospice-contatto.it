import Body from '@components/Body'
import Main from '@components/Main'
import Title from '@components/Title'
import {whatWeDoFragment} from '@schema/what-we-do'
import {type WhatWeDo} from '@schema/what-we-do.d'
import {request} from '@lib/datocms'
import {buildTitle, createMetadata} from '@lib/info'

type WhatWeDoQuery = {whatWeDo: WhatWeDo}

const QUERY = `query { whatWeDo ${whatWeDoFragment} }`

const getData = async () => {
  return await request<WhatWeDoQuery>({query: QUERY})
}

const Page = async () => {
  const page = await getData()

  return (
    <Main>
      <Title title={page.whatWeDo.title} />
      <Body data={page.whatWeDo.body} />
    </Main>
  )
}

const generateMetadata = createMetadata(async ({defaults}) => {
  const page = await getData()

  return {title: buildTitle({defaults, title: page.whatWeDo.title})}
})

export {generateMetadata}
export default Page

