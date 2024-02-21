import Body from '@components/Body'
import Main from '@components/Main'
import Title from '@components/Title'
import {queryFragment as bodyQueryFragment} from '@lib/body'
import {parseDate, request as datoCMSRequest} from '@lib/datocms'
import {datedSlug, datedSlugToSlug} from '@lib/event'
import {date as formatDate} from '@lib/format'
import {buildTitle, createMetadata} from '@lib/info'
import {fragment, toOpenGraphImage} from '@lib/responsiveImage'
import styles from './page.module.sass'

const EVENTS_QUERY = `
query {
  allEvents {
    id
    date
    slug
  }
}
`

const QUERY = `
query Event($slug: String!) {
  event(filter: {slug: {eq: $slug}}) {
    id
    date
    title
    image {
      ${fragment({width: 600})}
    }
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

const Page = async ({params: {slug}}) => {
  const eventSlug = datedSlugToSlug(slug)
  const page = await getData(eventSlug)
  const date = parseDate(page.event.date)

  return (
    <Main>
      <Title title={page.event.title}/>
      <p className={styles.date}>{formatDate(date)}</p>
      <Body data={page.event.body}/>
      <img alt={page.event.image.responsiveImage.alt} {...page.event.image.responsiveImage}/>
    </Main>
  )
}

const generateMetadata = createMetadata(async ({defaults, props}) => {
  const slug = datedSlugToSlug(props.params.slug)
  const page = await getData(slug)
  const image = toOpenGraphImage(page.event.image.responsiveImage)

  return {
    images: [image],
    title: buildTitle({defaults, title: page.event.title})
  }
})

const generateStaticParams = async () => {
  const events = await datoCMSRequest({
    query: EVENTS_QUERY
  })

  return events.allEvents.map(e => {
    const path = datedSlug(e)
    return {slug: path}
  })
}

export {generateMetadata, generateStaticParams}
export default Page
