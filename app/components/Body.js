'use client'

import {StructuredText} from 'react-datocms'

import styles from './Body.module.sass'

const renderBlock = ({record}) => {
  switch (record.__typename) {
  case 'ImageRecord':
    return (
      <div className={styles.image_with_caption}>
        <img alt={record.image.responsiveImage.alt} {...record.image.responsiveImage}/>
        <div className={styles.caption}>{record.caption}</div>
      </div>
    )
  case 'LargeImageRecord':
    return (
      <div className={styles.image_with_caption}>
        <img alt={record.image.responsiveImage.alt} {...record.image.responsiveImage}/>
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

export default Body
