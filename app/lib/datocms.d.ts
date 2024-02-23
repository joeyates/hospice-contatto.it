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
