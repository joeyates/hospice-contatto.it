import {bodyFragment} from '@lib/body'

const homeFragment = `
  {
    title
    subtitle
    body ${bodyFragment}
  }
`

export {homeFragment}
