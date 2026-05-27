import {type BodyStructuredText} from '@lib/body.d'
import {type RecordLink, RecordsMeta} from '@lib/datocms.d'
import {type ResponsiveImage} from '@lib/responsiveImage'

export type EventRecordLink = RecordLink & {
  date: string
}

export type EventListItem = {
  id: string
  __typename: string
  date: string
  description: string
  image: {
    responsiveImage: ResponsiveImage
  }
  slug: string
  title: string
}

export type Event = EventListItem & {
  body: BodyStructuredText
}

export type EventsMetadataQuery = {_allEventsMeta: RecordsMeta}
