import {metadataFragment, request} from '@lib/datocms'
import {type RecordsMeta} from '@lib/datocms.d'
import {createMetadata as globalCreateMetadata} from '@lib/info'

const PAGE_SIZE = 5

type DiaryMetadataQuery = {_allDiaryEntriesMeta: RecordsMeta}

const METADATA_QUERY = `query DiaryMetadata { _allDiaryEntriesMeta ${metadataFragment} }`

const entryCountToPageCount = (entries: number): number =>
  Math.floor((entries - 1) / PAGE_SIZE) + 1

const pageCount = async () => {
  const query = await request<DiaryMetadataQuery>({
    query: METADATA_QUERY
  })
  return extractPageCount(query)
}

const extractPageCount = (query: DiaryMetadataQuery) => {
  const entries = query._allDiaryEntriesMeta.count
  return entryCountToPageCount(entries)
}

const generateTitle = ({props}) => {
  return `Diario - pagina ${props.params.page}`
}

const createMetadata = () => {
  return globalCreateMetadata(async ({props}) => {
    return {title: generateTitle({props})}
  })
}

const diaryEntryFragment = `
{
  id
  date
  place
  text
}
`

export {
  createMetadata,
  diaryEntryFragment,
  extractPageCount,
  generateTitle,
  metadataFragment,
  pageCount,
  PAGE_SIZE
}
