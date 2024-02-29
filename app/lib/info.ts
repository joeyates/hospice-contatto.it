import {type Metadata as NextMetadata} from 'next'

import {toOpenGraphImage} from '@lib/responsiveImage'
import {fetchInfo} from '@schema/info'
import {type Props, type Metadata, type MetadataFetcher} from '@schema/info.d'

const buildTitle = ({defaults, title}) => `${title} — ${defaults.title}`

const buildMetadata = ({title, description, images}: Metadata): NextMetadata => {
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: images
    }
  }
}

/*
Build an async function to return metadata build from
the combination of DatoCMS defaults and the supplied overrides
*/
const createMetadata = (build?: MetadataFetcher): ((props: Props, parent) => Promise<NextMetadata>) => {
  return async (props, _parent) => {
    const defaults = await metadataDefaults()
    const overrides = build ? await build({defaults, props}) : {}
    const merged = {...defaults, ...overrides}

    return buildMetadata(merged)
  }
}

const metadataDefaults = async (): Promise<Metadata> => {
  const info = await fetchInfo()
  const image = toOpenGraphImage(info.defaultImage.responsiveImage)
  return {
    title: info.siteTitle,
    description: info.siteDescription,
    images: [image]
  }
}

export {createMetadata, buildTitle}