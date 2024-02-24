import {request} from '@lib/datocms'
import {type RecordsMeta} from '@lib/datocms.d'
import {createMetadata as globalCreateMetadata} from '@lib/info'

type DiaryPaginationQuery = {
  _allDiaryEntriesMeta: RecordsMeta
}

const PAGE_SIZE = 5

const PAGINATION_QUERY = `
query DiaryMetadata {
  _allDiaryEntriesMeta {
    count
  }
}
`

const entryCountToPageCount = (entries: number): number => Math.floor((entries - 1) / PAGE_SIZE) + 1

const pageCount = async () => {
  const metadata = await request<DiaryPaginationQuery>({
    query: PAGINATION_QUERY
  })

  const entries = metadata._allDiaryEntriesMeta.count
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

export {createMetadata, entryCountToPageCount, generateTitle, pageCount, PAGE_SIZE}
