import Image from 'next/image'
import { StructuredText } from 'react-datocms'

import responsiveImage from '@/lib/responsiveImage'
import styles from './body.module.sass'

const renderBlock = ({record}) => {
  switch (record.__typename) {
  case 'ImageRecord':
    return (
      <div className={styles.image_with_caption}>
        <Image {...record.image.responsiveImage}/>
        <div className={styles.caption}>{record.caption}</div>
      </div>
    )
  default:
    throw `Unrecognised block type ${record.__typename}`
  }
}

const Body = ({data}) => (
  <div className={styles.body}>
    <StructuredText data={data} renderBlock={renderBlock}/>
  </div>
)

const queryFragment = `
  body {
    blocks {
      ... on ImageRecord {
        __typename
        id
        image {
          ${responsiveImage({width: 300, height: 300})}
        }
      }
    }
    links
    value
  }
`

export {queryFragment}
export default Body
