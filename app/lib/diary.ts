import {request} from '@lib/datocms'
import {createMetadata as globalCreateMetadata} from '@lib/info'

interface PaginationQuery {
  _allDiaryEntriesMeta: {
    count: number
  }
}

const PAGINATION_QUERY = `
query DiaryMetadata {
  _allDiaryEntriesMeta {
    count
  }
}
`

const entryCountToPageCount = (entries: number): number => Math.floor((entries - 1) / 5) + 1

const pageCount = async () => {
  const metadata = await request<PaginationQuery>({
    query: PAGINATION_QUERY
  })

  const entries = metadata._allDiaryEntriesMeta.count
  return entryCountToPageCount(entries)
}

const generateTitle = ({props}) => {
  return `Diario - pagina ${props.params.page}`
}

const createMetadata = () => {
  return globalCreateMetadata({title: generateTitle})
}

export {createMetadata, entryCountToPageCount, generateTitle, pageCount}
