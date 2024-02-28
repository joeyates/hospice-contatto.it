import {type ResponsiveImage} from '@lib/responsiveImage'
export type isoDate = (date: Date) => string
export type parseDate = (date: string) => Date

export type request = <T>({
  query,
  variables
}: {
  query: string
  variables?: {[key: string]: any}
}) => Promise<ApolloQueryResult<T>>

export type Image = {
  alt: string
  src: string
  title: string
  width: number
  height: number
  responsiveImage?: ResponsiveImage
}

/* This the minimal type for a link to a DatoCMS record */
export type RecordLink = {
  id: string
  __typename: string
  slug: string
}

export type RecordsMeta = {
  count: number
}
