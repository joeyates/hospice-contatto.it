'use client'

import Image from 'next/image'
import {
  StructuredText,
  type RenderRecordLinkContext,
  type RenderBlockContext
} from 'react-datocms'

import {type BodyBlock, type BodyStructuredText} from '@lib/body.d'
import {type DetailRecord} from '@lib/detail.d'
import styles from './Body.module.sass'

const renderBlock = ({record}: RenderBlockContext<BodyBlock>) => {
  const priority = !!record.priority
  const image = {priority, ...record.image.responsiveImage}
  return (
    <div className={styles.image_with_caption}>
      <Image alt={image.alt} {...image} />
      <div className={styles.caption}>{record.caption}</div>
    </div>
  )
}

const renderLinkToRecord = ({record, children, transformedMeta}: RenderRecordLinkContext<DetailRecord>) => {
  return (
    <a {...transformedMeta} href={`/approfondimenti/${record.slug}`}>
      {children}
    </a>
  )
}

const Body = ({data}: {data: BodyStructuredText}) => (
  <div className={styles.body}>
    <StructuredText
      data={data}
      renderBlock={renderBlock}
      renderLinkToRecord={renderLinkToRecord}
    />
  </div>
)

export default Body
