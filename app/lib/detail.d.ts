import {type Body} from '@lib/body.d'

export interface DetailUrlData {
  slug: string
}

export interface DetailRecord extends DetailUrlData {
  id: string
  __typename: 'DetailRecord'
  [prop: string]: unknown
}

export interface Detail extends DetailUrlData {
  id: string
  body: Body
  title: string
}
