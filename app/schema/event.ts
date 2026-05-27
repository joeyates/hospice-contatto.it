import {metadataFragment} from '@lib/datocms'
import {bodyFragment} from '@lib/body'
import {type EventsMetadataQuery} from '@schema/event.d'
import {responsiveImageFragment} from '@lib/responsiveImage'

const PAGE_SIZE = 10

const METADATA_QUERY = `query EventMetadata { _allEventsMeta ${metadataFragment} }`

const entryCountToPageCount = (entries: number): number =>
  Math.floor((entries - 1) / PAGE_SIZE) + 1

const extractPageCount = (query: EventsMetadataQuery) => {
  const entries = query._allEventsMeta.count
  return entryCountToPageCount(entries)
}

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
  extractPageCount,
  eventRecordLinkFragment,
  eventFragment,
  eventListFragment,
  PAGE_SIZE
}
