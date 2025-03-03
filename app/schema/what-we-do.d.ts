import {type Attachment} from '@schema/attachment'
import {type BodyStructuredText} from '@lib/body.d'

export type WhatWeDo = {
  id: string
  title: string
  body: BodyStructuredText
  attachments: Attachment[]
}
