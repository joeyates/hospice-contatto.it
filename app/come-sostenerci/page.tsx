import Attachments from '@components/Attachments'
import Body from '@components/Body'
import Main from '@components/Main'
import Title from '@components/Title'
import {giveSupportFragment} from '@schema/give-support'
import {type GiveSupport} from '@schema/give-support.d'
import {request} from '@lib/datocms'
import {buildTitle, createMetadata} from '@schema/info'

type GiveSupportQuery = {giveSupport: GiveSupport}

const QUERY = `query { giveSupport ${giveSupportFragment} }`

const getData = async () => {
  return await request<GiveSupportQuery>({query: QUERY})
}

const Page = async () => {
  const page = await getData()

  return (
    <Main>
      <Title title={page.giveSupport.title} />
      <Body data={page.giveSupport.body} />
      <Attachments attachments={page.giveSupport.attachments} />
    </Main>
  )
}

const generateMetadata = createMetadata(async ({defaults}) => {
  const page = await getData()

  return {title: buildTitle({defaults, title: page.giveSupport.title})}
})

export {generateMetadata}
export default Page
