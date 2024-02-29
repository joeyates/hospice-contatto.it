import {bodyFragment} from '@lib/body'
import {responsiveImageFragment} from '@lib/responsiveImage'

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
  eventRecordLinkFragment,
  eventFragment,
  eventListFragment
}
