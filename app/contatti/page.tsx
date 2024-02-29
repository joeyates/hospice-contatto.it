import Attachments from '@components/Attachments'
import Body from '@components/Body'
import Main from '@components/Main'
import Title from '@components/Title'
import {contactFragment} from '@schema/contact'
import {type Contact} from '@schema/contact.d'
import {request} from '@lib/datocms'
import {buildTitle, createMetadata} from '@lib/info'

type ContactQuery = {contact: Contact}

const QUERY = `query { contact ${contactFragment} }`

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
