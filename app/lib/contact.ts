import {attachmentFragment} from '@lib/attachment'
import {bodyFragment} from '@lib/body'

const contactFragment = `
{
  id
  title
  body ${bodyFragment}
  attachments ${attachmentFragment}
}
`

export {contactFragment}
