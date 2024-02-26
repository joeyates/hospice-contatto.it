import {type BodyStructuredText} from '@/lib/body.d'
import {type ResponsiveImage} from '@/lib/responsiveImage'

export interface EventUrlData {
  date: string
  slug: string
}

export interface EventListItem extends EventUrlData {
  id?: string
  date: string
  description: string
  image: {
    responsiveImage: ResponsiveImage
  }
  title: string
}

export interface Event extends EventListItem {
  body: BodyStructuredText
}