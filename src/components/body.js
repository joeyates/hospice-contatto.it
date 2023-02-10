import Image from 'next/image'
import {StructuredText} from 'react-datocms'

import responsiveImage from '@/lib/responsiveImage'
import styles from './body.module.sass'

const renderBlock = ({record}) => {
  switch (record.__typename) {
  case 'ImageRecord':
    return (
      <div className={styles.image_with_caption}>
        <Image alt={record.image.responsiveImage.alt} {...record.image.responsiveImage}/>
        <div className={styles.caption}>{record.caption}</div>
      </div>
    )
  default:
    throw `Unrecognised block type ${record.__typename}`
  }
}

const renderLinkToRecord = ({record, children, transformedMeta}) => {
  switch (record.__typename) {
  case 'DetailRecord':
    return (
      <a {...transformedMeta} href={`/approfondimenti/${record.slug}`}>
        {children}
      </a>
    )
  default:
    throw `Unrecognised block type ${record.__typename}`
  }
}

const Body = ({data}) => (
  <div className={styles.body}>
    <StructuredText
      data={data}
      renderBlock={renderBlock}
      renderLinkToRecord={renderLinkToRecord}
    />
  </div>
)

const queryFragment = `
  body {
    blocks {
      __typename
      id
      ... on ImageRecord {
        image {
          ${responsiveImage({width: 300, height: 300})}
        }
      }
    }
    links {
      id
      __typename
      ... on DetailRecord {
        slug
      }
    }
    value
  }
`

export {queryFragment}
export default Body
