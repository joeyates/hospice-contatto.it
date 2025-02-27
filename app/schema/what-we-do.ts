import {bodyFragment} from '@lib/body'

const whatWeDoFragment = `
  {
    id
    title
    body ${bodyFragment}
  }
`

export {whatWeDoFragment}
