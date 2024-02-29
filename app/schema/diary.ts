import {metadataFragment, request} from '@lib/datocms'
import {type DiaryMetadataQuery} from '@schema/diary.d'

const PAGE_SIZE = 5

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

const diaryEntryFragment = `
{
  id
  date
  place
  text
}
`

export {
  diaryEntryFragment,
  extractPageCount,
  metadataFragment,
  pageCount,
  PAGE_SIZE
}
