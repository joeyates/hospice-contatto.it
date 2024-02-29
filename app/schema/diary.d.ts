import {type RecordsMeta} from '@lib/datocms.d'

export type DiaryEntry = {
  id: string
  date: string
  place: string
  text: string
}

export type DiaryMetadataQuery = {_allDiaryEntriesMeta: RecordsMeta}
