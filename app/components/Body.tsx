'use client'

import Image from 'next/image'
import {StructuredText, type RenderRecordLinkContext, type RenderBlockContext} from 'react-datocms'

import {type Image as ImageType} from '@lib/datocms.d'
import {type DetailRecord} from '@lib/detail.d'
import styles from './Body.module.sass'

type ImageRecord = {
  id: string
  __typename: 'ImageRecord'
  image: ImageType
  caption: string
}

type LargeImageRecord = {
  id: string
  __typename: 'LargeImageRecord'
  image: ImageType
  caption: string
}

type AnyImageRecord = ImageRecord | LargeImageRecord

const renderBlock = ({record}: RenderBlockContext<AnyImageRecord>) => {
  switch (record.__typename) {
    case 'ImageRecord': {
      const {alt} = record.image
      return (
        <div className={styles.image_with_caption}>
          <Image alt={alt} {...record.image} />
          <div className={styles.caption}>{record.caption}</div>
        </div>
      )
    }
    case 'LargeImageRecord': {
      const {alt} = record.image
      return (
        <div className={styles.image_with_caption}>
          <Image alt={alt} {...record.image} />
          <div className={styles.caption}>{record.caption}</div>
        </div>
      )
    }
  }
}

const renderLinkToRecord = ({record, children, transformedMeta}: RenderRecordLinkContext<DetailRecord>) => {
  switch (record.__typename) {
    case 'DetailRecord':
      return (
        <a {...transformedMeta} href={`/approfondimenti/${record.slug}`}>
          {children}
        </a>
      )
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
