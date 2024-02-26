import {type BodyStructuredText} from '@lib/body.d'
import {type RecordLink} from '@lib/datocms.d'

export type DetailRecord = {
  id: string
  __typename: 'DetailRecord'
  [prop: string]: unknown
} & RecordLink

export type Detail = {
  id: string
  body: BodyStructuredText
  title: string
} & RecordLink
