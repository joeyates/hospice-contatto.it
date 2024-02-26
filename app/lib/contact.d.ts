import {type Attachment} from '@lib/attachment.d'
import {type BodyStructuredText} from '@lib/body.d'

export type Contact = {
  id: string
  title: string
  body: BodyStructuredText
  attachments: Attachment[]
}
