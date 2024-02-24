import Attachments from '@components/Attachments'
import Body from '@components/Body'
import Main from '@components/Main'
import Title from '@components/Title'
import { type Attachment} from '@lib/attachment'
import {queryFragment as bodyQueryFragment} from '@lib/body'
import {request} from '@lib/datocms'
import {buildTitle, createMetadata} from '@lib/info'
import styles from './page.module.sass'

type GiveSupportQuery = {
  giveSupport: {
    id: string
    title: string
    body: any
    attachments: Attachment[]
  }
}

const QUERY = `
query {
  giveSupport {
    id
    title
    ${bodyQueryFragment}
    attachments {
      id
      title
      url
    }
  }
}
`

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
