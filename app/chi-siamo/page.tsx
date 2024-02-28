import Attachments from '@components/Attachments'
import Body from '@components/Body'
import Main from '@components/Main'
import Title from '@components/Title'
import {aboutFragment} from '@schema/about'
import {type About} from '@schema/about.d'
import {request} from '@lib/datocms'
import {buildTitle, createMetadata} from '@schema/info'

type AboutQuery = {about: About}

const QUERY = `query { about ${aboutFragment} }`

const getData = async () => {
  return await request<AboutQuery>({query: QUERY})
}

const Page = async () => {
  const page = await getData()

  return (
    <Main>
      <Title title={page.about.title} />
      <Body data={page.about.body} />
      <Attachments attachments={page.about.attachments} />
    </Main>
  )
}

const generateMetadata = createMetadata(async ({defaults}) => {
  const page = await getData()

  return {title: buildTitle({defaults, title: page.about.title})}
})

export {generateMetadata}
export default Page
