import Attachments from '@components/Attachments'
import Body from '@components/Body'
import Main from '@components/Main'
import Title from '@components/Title'
import {queryFragment as bodyQueryFragment} from '@lib/body'
import {request as datoCMSRequest} from '@lib/datocms'
import {build as buildMetadata} from '@lib/metadata'
import styles from './page.module.sass'

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
  return await datoCMSRequest({query: QUERY})
}

const Page = async () => {
  const page = await getData()

  return (
    <Main>
      <Title title={page.giveSupport.title}/>
      <Body data={page.giveSupport.body}/>
      <Attachments attachments={page.giveSupport.attachments}/>
    </Main>
  )
}

const generateMetadata = async ({params, searchParams}) => {
  const page = await getData()
  return buildMetadata({title: page.giveSupport.title})
}

export {generateMetadata}
export default Page
