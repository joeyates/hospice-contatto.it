import {type Body} from './body.d'
import {type ResponsiveImage} from './responsiveImage'

export interface EventUrlData {
  date: string
  slug: string
}

export interface Event extends EventUrlData {
  id?: string
  body: Body
  date: string
  description: string
  image: {
    responsiveImage: ResponsiveImage
  }
  title: string
}
