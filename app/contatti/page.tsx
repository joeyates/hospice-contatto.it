import Attachments from '@components/Attachments'
import Body from '@components/Body'
import Main from '@components/Main'
import Title from '@components/Title'
import {type Attachment} from '@lib/attachment'
import {queryFragment as bodyQueryFragment} from '@lib/body'
import {type BodyStructuredText} from '@lib/body.d'
import {request} from '@lib/datocms'
import {buildTitle, createMetadata} from '@lib/info'

type ContactQuery = {
  contact: {
    id: string
    title: string
    body: BodyStructuredText
    attachments: Attachment[]
  }
}

const QUERY = `
query {
  contact {
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
  return await request<ContactQuery>({query: QUERY})
}

const Page = async () => {
  const page = await getData()

  return (
    <Main>
      <Title title={page.contact.title} />
      <Body data={page.contact.body} />
      <Attachments attachments={page.contact.attachments} />
    </Main>
  )
}

const generateMetadata = createMetadata(async ({defaults}) => {
  const page = await getData()

  return {title: buildTitle({defaults, title: page.contact.title})}
})

export {generateMetadata}
export default Page
