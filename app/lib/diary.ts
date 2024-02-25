import {request} from '@lib/datocms'
import {type DiaryMetadataQuery} from '@lib/diary.d'
import {createMetadata as globalCreateMetadata} from '@lib/info'

const PAGE_SIZE = 5

const metadataFragment = `
  _allDiaryEntriesMeta {
    count
  }
`

const METADATA_QUERY = `
query DiaryMetadata {
  ${metadataFragment}
}
`

const entryCountToPageCount = (entries: number): number => Math.floor((entries - 1) / PAGE_SIZE) + 1

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

export {createMetadata, extractPageCount, generateTitle, metadataFragment, pageCount, PAGE_SIZE}
