export type isoDate = (date: Date) => string
export type parseDate = (date: string) => Date

export type request = <T>({
  query,
  variables,
  includeDrafts,
  excludeInvalid
}: {
  query: string
  variables?: Variables
  includeDrafts?: boolean
  excludeInvalid?: boolean
}) => Promise<T>

export type Image = {
  alt: string
  src: string
  title: string
  width: number
  height: number
}

export type RecordsMeta = {
  count: number
}
