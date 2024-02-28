import {attachmentFragment} from '@schema/attachment'
import {bodyFragment} from '@lib/body'

const giveSupportFragment = `
  {
    id
    title
    body ${bodyFragment}
    attachments ${attachmentFragment}
  }
`

export {giveSupportFragment}
