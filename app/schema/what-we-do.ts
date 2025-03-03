import {attachmentFragment} from '@schema/attachment'
import {bodyFragment} from '@lib/body'

const whatWeDoFragment = `
  {
    id
    title
    body ${bodyFragment}
    attachments ${attachmentFragment}
  }
`

export {whatWeDoFragment}
