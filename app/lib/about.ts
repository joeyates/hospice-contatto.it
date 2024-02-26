import {attachmentFragment} from '@lib/attachment'
import {bodyFragment} from '@lib/body'

const aboutFragment = `
  {
    id
    title
    body ${bodyFragment}
    attachments ${attachmentFragment}
  }
`

export {aboutFragment}
