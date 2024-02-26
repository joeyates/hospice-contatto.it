import {bodyFragment} from '@lib/body'

const detailFragment = `
  {
    id
    slug
    title
    body ${bodyFragment}
  }
`

export {detailFragment}
