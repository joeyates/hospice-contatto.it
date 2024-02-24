import {type Body} from '@lib/body.d'

export interface DetailUrlData {
  slug: string
}

export interface Detail extends DetailUrlData {
  id: string
  body: Body
  title: string
}
