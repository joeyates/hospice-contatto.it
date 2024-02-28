import {bodyFragment} from '@lib/body'
import {type EventRecordLink} from '@schema/event.d'
import {responsiveImageFragment} from '@lib/responsiveImage'

const datedSlug = (event: EventRecordLink): string => `${event.date}-${event.slug}`

const datedSlugToSlug = (dated: string): string => {
  const extractSlug = /\d{4}-\d{2}-\d{2}-(.*)/
  const match = dated.match(extractSlug)
  if (match?.length !== 2) {
    throw `'${dated}' is a malformed dated slug`
  }
  return match[1]
}

const path = (event: EventRecordLink): string =>
  `/eventi/evento/${datedSlug(event)}`

const eventRecordLinkFragment = `
{
  id
  __typename
  slug
  date
}
`

const eventListFragment = `
{
  id
  __typename
  date
  slug
  title
  image {
    ${responsiveImageFragment({width: 200})}
  }
}
`

const eventFragment = `
{
  id
  date
  title
  image {
    ${responsiveImageFragment({width: 600})}
  }
  body ${bodyFragment}
}
`

export {
  datedSlug,
  datedSlugToSlug,
  eventRecordLinkFragment,
  eventFragment,
  eventListFragment,
  path
}
