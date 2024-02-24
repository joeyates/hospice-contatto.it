'use client'

import Image from 'next/image'
import {StructuredText, type RenderRecordLinkContext, type RenderBlockContext} from 'react-datocms'

import styles from './Body.module.sass'

type ImageRecord = {
  id: string
  __typename: 'ImageRecord'
  image: {
    alt: string
    src: string
    title: string
    width: number
    height: number
  }
  caption: string
}

type LargeImageRecord = {
  id: string
  __typename: 'LargeImageRecord'
  image: {
    alt: string
    src: string
    title: string
    width: number
    height: number
  }
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

type DetailRecord = {
  id: string
  __typename: 'DetailRecord'
  slug: string
}

const renderLinkToRecord = ({record, children, transformedMeta}: RenderRecordLinkContext<DetailRecord>) => {
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
