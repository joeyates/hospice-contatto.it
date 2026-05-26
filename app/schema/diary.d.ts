import {type Attachment} from '@schema/attachment'
import {type RecordsMeta} from '@lib/datocms.d'

export type DiaryEntry = {
  id: string
  date: string
  place: string
  text: string
  attachments: Attachment[]
}

export type DiaryMetadataQuery = {_allDiaryEntriesMeta: RecordsMeta}
