import {type Attachment} from '@schema/attachment'
import {type BodyStructuredText} from '@lib/body.d'

export type About = {
  id: string
  title: string
  body: BodyStructuredText
  attachments: Attachment[]
}
