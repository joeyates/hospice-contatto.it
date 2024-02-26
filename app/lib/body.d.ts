import {Document as StructuredTextDocument} from 'datocms-structured-text-utils'

import {type Image, type RecordLink} from '@lib/datocms.d'

type ImageRecord = {
  id: string
  __typename: 'ImageRecord'
  image: Image
  priority: Boolean
  caption: string
}

type LargeImageRecord = {
  id: string
  __typename: 'LargeImageRecord'
  image: Image
  priority: Boolean
  caption: string
}

export type BodyBlock = ImageRecord | LargeImageRecord

export type BodyStructuredText = {
  value: StructuredTextDocument
  blocks?: BodyBlock[]
  links?: RecordLink[]
}
