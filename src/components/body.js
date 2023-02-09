import Image from 'next/image'
import { StructuredText } from 'react-datocms'

import styles from './body.module.sass'

const renderBlock = ({record}) => {
  switch (record.__typename) {
  case 'ImageWithCaptionRecord':
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

export default Body
